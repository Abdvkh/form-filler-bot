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

/** Get auction data from all by its ID
 * @param {string} id - Auctions data
 * */
function getAuctionByID(id){
   const auctions = getAuctions();

   return auctions.filter(auction => auction.id === id)[0];
}

/** Get specified auction data
 * @param {string} type - Auctions data
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
function addAuctionToAuctionsList(auction) {
   const auctions = getAuctions();
   auctions.push(auction);
   setAuctions(auctions);
}
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

function getCurrentLot() {
   let curLot = Bot.getProperty(libPrefix + 'currentLot');

   if (curLot !== undefined) { return curLot; }

   let data = {};
   Bot.setProperty(libPrefix + 'currentLot', data, 'JSON');
   return data;
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

/* </LOT> */


function setAuction(auction) {
   Bot.setProperty(libPrefix + 'current', auction, 'JSON');
}

function setCurrentAuction(propName, propValue) {
   let curAuc = getCurrentAuction();
   curAuc[propName] = propValue;
   setAuction(curAuc);
}

function getCurrentAuction() {
   let curAuc = Bot.getProperty(libPrefix + 'current');

   if (curAuc != undefined) { return curAuc;}

   let data = {};
   Bot.setProperty(libPrefix + 'current', data, 'JSON');
   return data;
}

function kickOffTo(chatId) {
   let curAuc = getCurrentAuction();
   setCurrentAuction('betStep', 1);
   setCurrentAuction('isOver', false);
   setCurrentAuction('betUser', {});
   let aucPost = '📌' + curAuc['title'] + '\n\n' +
                 'Начальная цена: ' + curAuc['startingPrice'] + '\n\n' +
                 'Описание: ' + '\n\n' +
                 curAuc['description'];
  let betKeyboard = Bot.getProperty('betKeyboard');

   Api.sendPhoto({
      chat_id: chatId,
      photo: curAuc['picture'],
      caption: aucPost,
      parse_mode: 'Markdown',
      reply_markup: betKeyboard
   });
}

function getCurBetPrice() {
   let curAuc = getCurrentAuction();
   let curBetPrice = curAuc['betPrice'];

   if (curBetPrice !== undefined) { return curBetPrice }

   setCurrentAuction('betPrice', 0);
   return 0;
}

function setCurrentBetDetails(betUser, betPrice) {
   setCurrentAuction('betUser', betUser);
   setCurrentAuction('betPrice', betPrice);
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
      setCurrentAuction('betStep', betStep);
   }
   let is_over = betStep > 3;

   setCurrentAuction('isOver', is_over);
   return is_over;
}

publish({
   kickOffTo: kickOffTo,
   setCurrentAuction: setCurrentAuction,
   setAuction: setAuction,
   getAuction: getAuction,
   getAuctions: getAuctions,
   addAuction: addAuctionToAuctionsList,
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
