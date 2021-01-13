let libPrefix = 'auction_';

/* <AUCTION> */

/** Set all auctions structure
 * @param {Array} auctions Auctions data
 * */
function setAuctions(auctions=[]){
   const structure = {
      data: auctions
   };

   Bot.setProperty(`${libPrefix}all`, structure, 'JSON');
}

/** Get all auctions data
 * @return {Array} Auctions data
 * */
function getAuctions(){
   const auctions = Bot.getProperty(`${libPrefix}all`);

   if (auctions !== undefined){
      setAuctions();
      return [];
   }
   return auctions['data'];
}

/** Set auction data of the given ID
 * @param {object} data - Auctions data
 * @param {string} auctionID - Auctions id
 * */
function setAuctionByID(data, auctionID){
   let auction;
   const auctions = getAuctions();

   for (let i = 0; i < auctions.length; i++) {
      auction = auctions[i];
      let { id } = auction;

      if (id === auctionID){
         auctions[i] = data;
         break;
      }
   }

   setAuctions(auctions);
}

/** Get auction data from all by its ID
 * @param {string} id - Auctions id
 * @return {object|undefined}
 * */
function getAuctionByID(id){
   const auctions = getAuctions();

   return auctions.filter(auction => auction.id === id)[0];
}

/** Set specified type of auction data
 * @param {object} data - Auction data
 * @param {string} type - Auction type
 * */
function setAuction(data={}, type='current'){
   Bot.setProperty(`${libPrefix}${type}`, data, 'JSON');
}

// /** Set lots of specified Auction
//  * @param {array} lots - Lots data
//  * @param {string} auctionID - Auction ID
//  * */
// function setAuctionLots(lots, auctionID){
//    let auction;
//    const auctions = getAuctions();
//
//    for (let i = 0; i < auctions.length; i++) {
//       auction = auctions[i]
//       if (auction['id'] === auctionID){
//
//       }
//    }
// }

/** Get specified auction data
 * @param {string} type - Auction type
 * @return {object} auction - Auction data
 * */
function getAuction(type='current'){
   const auction = Bot.getProperty(`${libPrefix}${type}`);
   if (auction !== undefined){
      setAuction();
      return {};
   }
   return auction;
}

/** Set auction property
 * @param {string} name Name of property
 * @param {any} value Property value
 * @param {string} type Type of auction(currently going one by default)
 * */
function setAuctionProperty(name, value, type='current'){
   const auction = getAuction(type);
   auction[name] = value;

   return Bot.setProperty(`${libPrefix}${type}`, auction, 'JSON');
}

/** Get auction property
 * @param {string} name Name of property
 * @param {string} type Type of auction(currently going one by default)
 * */
function getAuctionProperty(name, type='current'){
   return getAuction(type)[name];
}

/** Set currently creating auction property
 * @param {string} name Name of property
 * @param {any} value Property value
 * */
function setCreatingAuctionProperty(name, value){
   setAuctionProperty(name, value, 'creating');
}

/** Get currently creating auction property
 * @param {string} name Name of property
 * */
function getCreatingAuctionProperty(name){
   getAuctionProperty(name, 'creating');
}

/** Add auction to auction list
 * @param {object} auction Auction detail
* */
function addAuctionToList(auction) {
   const auctions = getAuctions();
   auctions.push(auction);
   setAuctions(auctions);
}

/** Remove auction from auctions list by given ID
 * @param {string} auctionID Auction ID
 * */
function removeAuction(auctionID) {
   const auctions = getAuctions();
   let auction = null;

   if (!auctions) { throw new Exception("No auctions were provided"); }

   for (let i = 0; i < auctions.length; i++) {
      const { id, status } = auctions[i];

      if (id === auctionID && status !== 'active'){
         auction = auction[i];
         auction['status'] = 'started';
         break;
      }
   }

   return auction;
}

/** Sets current auction
 * @param {string} auctionID Auction ID
 * @returns {boolean} false if auction is started or inactive or not exists
 * */
function setupCurrentAuction(auctionID) {
   const auction = getAuctionByID(auctionID);

   if (auction !== undefined) {
      const { status } = auction;

      if (status === 'active'){
         auction['status'] = 'started';
         setAuction(auction);
         return true;
      }
   }
   Api.sendMessage({text: "There is no such active auction to start"});

   return false;
}

/** Set given auction lot by IDs
 * @param {string} name Lot property name
 * @param {any} value Lot property value
 * @param {string} auctionID Auction ID
 * @param {string} lotID Lot ID
 * */
function setAuctionLotProperty(name, value, auctionID, lotID){
   const auction = getAuctionByID(auctionID);
   const lots = auction['lots'];

   for (let i = 0; i < lots.length; i++) {
      const lot = lots[i];

      if (lot['id'] === lotID){
         lot[name] = value;
         break;
      }
   }
   setAuctionByID(auction, auctionID);
}

/** Setup currently running auction's coming lot
 * @param {string|null} lotID Lot ID
 * @param {string|null} auctionID Auction ID
 * */
function setupAuctionLot(lotID=null, auctionID=null){
   const properties = [
      ['betStep', 1],
      ['isOver', false],
      ['status', 'started'],
      ['betUser', {}]
   ];

   properties.forEach(([name, value]) => {
      setAuctionLotProperty(name, value, auctionID, lotID);
   });
}

/**Launches auction at the specified char
 * @param {string|number} chatId - Telegram chat id where auctions is runing
 * */
function launchAuctionAt(chatId) {
   const currentAuction = getAuction();

   const { lots: currentLots } = currentAuction;
   setLot([...currentLots].shift());

   const currentLot = getLot();
   const { id: currentLotID } = currentLot;

   setupAuctionLot(currentLotID, auctionID);

   const { title, startingPrice, description, picture } = currentLot;
   const auctionPostText = `📌${title}\n\nНачальная цена: ${startingPrice}\n\nОписание: ${description}`
   const betKeyboard = Bot.getProperty('betKeyboard');

   Api.sendPhoto({
      chat_id: chatId,
      photo: picture,
      caption: auctionPostText,
      parse_mode: 'Markdown',
      reply_markup: betKeyboard
   });
}

/* </AUCTION> */



/* <LOT> */


function removeLotFromLotsById(id) {
   let lots = getLots();

   if (!lots) { throw new Exception("No lots were provided"); }

   for (let i = 0; i < lots.length; i++) {
      let lot = lots[i];

      if (lot['id'] === id) {
         let newAuc = lots.pop(i);
         setAuction(newAuc);
         setLots(lots);
         return '200';
      }
   }
   return '400';
}

function getIDs() {
   let lots = getLots();
   let ids = [];
   lots.forEach((lot, i) => {
      ids.push(lot['id']);
   });
   return ids;

}

function setLots(lots) {
   Bot.setProperty(libPrefix + 'lots', {data: lots}, 'JSON');
   return '200';
}

function addCurrentLotToLots() {
   let curLot = getCurrentLot();
   let lots = getLots();
   if (!curLot) { return '400'; }
   lots.push(curLot);
   setLots(lots);
   return '200';
}

function getLots() {
   let lots = Bot.getProperty(libPrefix + 'lots');

   if (lots !== undefined) { return lots['data']; }

   lots = {
      data:[]
   };
   Bot.setProperty(libPrefix + 'lots', lots, 'JSON');
   return lots['data'];
}

function getLotsCount(){
   let lots = getLots();
   return lots.length;
}

function getCurrentLotProperty(propName) {
   let lot = getCurrentLot();
   return propName === undefined ? lot : lot[propName];
}

function setCurrentLotProperty(propName, propValue) {
   let curLot = getCurrentLot();
   if (!curLot) { return '404'; }
   curLot[propName] = propValue;
   Bot.setProperty(libPrefix + 'currentLot', curLot, "JSON");
   return '200'
}

function setLotID(id) {
   return setCurrentLotProperty('id', id);
}

/** Set lot by ID
 * @param {object} data Lot data
 * @param {string} id Lot type name
 * */
function setLotPropertyByID(data, id){
   const autctions = getAuctions()
   Bot.setProperty(`${libPrefix}${type}Lot`, data, 'JSON');
}

/** Set lot data
 * @param {object} data - Lot data
 * @param {string} type - Lot type
 * */
function setLot(data={}, type='current'){
   Bot.setProperty(`${libPrefix}${type}Lot`, data, 'JSON');
}

/** Get lot data
 * @param {string} type - Lot type name
 * @return {object} data - Lot data
 * */
function getLot(type='current') {
   const currentLot = Bot.getProperty(`${libPrefix}${type}Lot`);
   if (currentLot !== undefined) { return currentLot; }

   const data = {};
   setLot(data, type);
   return data;
}

/** Set lot property by id or type
 * @param {string} name Lot property name
 * @param {any} value Lot property value
 * @param {string} type Lot type name
 * @param {string|null} lotID Lot id
 * @param {string|null} auctionID Auction id
 * */
function setLotProperty(name, value, type='current', lotID=null, auctionID=null){
   const lot = lotID !== null ? getLotByID(lotID, auctionID) : getLot();
   lot[name] = value;

   setLot(lot);
}

/* </LOT> */


function getCurrentAuction() {
   let curAuc = Bot.getProperty(libPrefix + 'current');

   if (curAuc !== undefined) { return curAuc;}

   let data = {};
   Bot.setProperty(libPrefix + 'current', data, 'JSON');
   return data;
}

function getCurBetPrice() {
   let curAuc = getCurrentAuction();
   let curBetPrice = curAuc['betPrice'];

   if (curBetPrice !== undefined) { return curBetPrice }

   setAuctionProperty('betPrice', 0);
   return 0;
}

function setCurrentBetDetails(betUser, betPrice) {
   setAuctionProperty('betUser', betUser);
   setAuctionProperty('betPrice', betPrice);
}

function getCurrentBetDetails() {
   return {
      user: getCurrentAuction()['betUser'],
      price: getCurBetPrice()
   };
}

function isOver() {
   let betStep = parseInt(getCurrentAuction()['betStep']);
   if (betStep==undefined) {
      betStep = 1;
      setAuctionProperty('betStep', betStep);
   }
   let is_over = betStep > 3;

   setAuctionProperty('isOver', is_over);
   return is_over;
}

publish({
   launchAuctionAt: launchAuctionAt,
   setCurAucProp: setCurrentAuctionPropertyProperty,
   setupCurAuc: setupCurrentAuction,
   setAuction: setAuction,
   getAuction: getAuction,
   getAuctions: getAuctions,
   addAuction: addAuctionToList,
   setCurBet: setCurrentBetDetails,
   getCurAuction: getCurrentAuction,
   getCurBet: getCurrentBetDetails,
   getCurBetPrice: getCurBetPrice,
   isOver: isOver,
   getLots: getLots,
   setAucProp: setAuctionProperty,
   setCreatingAucProp: setCreatingAuctionProperty,
   lot: {
      setLotID: setLotID,
      getLotsCount: getLotsCount,
      saveCurLot: addCurrentLotToLots,
      removeLot: removeLotFromLotsById,
      setCurLot: setCurrentLotProperty,
      getCurLot: getCurrentLotProperty,
      getIDs: getIDs,
   }
})
