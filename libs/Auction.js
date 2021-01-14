let LIB_PREFIX = 'auction_';

/* <AUCTION> */


/** Set all auctions structure
 * @param {Array} auctions Auctions data
 * */
function setAuctions(auctions=[]){
   const structure = {
      data: auctions
   };

   Bot.setProperty(`${LIB_PREFIX}all`, structure, 'JSON');
}

/** Get all auctions data
 * @return {Array} Auctions data
 * */
function getAuctions(){
   const auctions = Bot.getProperty(`${LIB_PREFIX}all`);

   if (auctions === undefined){
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
   Bot.setProperty(`${LIB_PREFIX}${type}`, data, 'JSON');
}

/** Get specified auction data
 * @param {string} type - Auction type
 * @return {object} auction - Auction data
 * */
function getAuction(type='current'){
   const auction = Bot.getProperty(`${LIB_PREFIX}${type}`);
   if (auction !== undefined){
      setAuction();
      return {};
   }
   return auction;
}

/** Get specified auction's lot
 * @param {string} lotID - Lot id
 * @param {string} auctionID - Auction ID
 *
 * @return {object|undefined} lot - Lot data
 * */
function getAuctionLot(lotID, auctionID){
   const auction = getAuctionByID(auctionID);

   return auction.lots.filter(lot => lot['id'] === lotID)[0];
}

/** Get auction property
 * @param {string} name Name of property
 * @param {string} type Type of auction(currently going one by default)
 * */
function getAuctionProperty(name, type='current'){
   return getAuction(type)[name];
}

/** Get auction property
 * @param {string} name - Property name of auction
 * @param {any} value - Property value of auction
 * @param {string} type - Type of auction
 * @param {string|null} auctionID - Type of auction
 * */
function setAuctionProperty(name, value, type='current', auctionID=null){
   let auction;

   if (auctionID){
      auction = getAuctionByID(auctionID);
      auction[name] = value;
      setAuctionByID(auction, auctionID);
   } else {
       auction = getAuction(type);
       auction[name] = value;
       setAuction(auction, type);
   }
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

/** Get whether auction is over or not
 * @return {boolean}
 * */
function isOver() {
   const is_over = betStep > 3;
   let betStep = parseInt(getLotProperty('betStep'));

   if (betStep === undefined) {
      betStep = 1;
      setLotProperty('betStep', betStep);
   }

   setLotProperty('isOver', is_over);
   setLotProperty('status', is_over ? 'ended' : 'started');
   return is_over;
}

/** Add given lot to given auction
 * @param {string} auctionID - Auction ID
 * @param {object} lot - Lot data
 * */
function addAuctionLot(auctionID, lot) {
   const auction = getAuctionByID(auctionID);

   auction.push(lot);

   setAuctionByID(auction, auctionID);
}


/* </AUCTION> */

/** **************************************************** */

/* <LOT> */


/** Set lot by ID
 * @param {object} data Lot data
 * @param {string} id Lot type name
 * */
function setLotPropertyByID(data, id){
   const autctions = getAuctions()
   Bot.setProperty(`${LIB_PREFIX}${type}Lot`, data, 'JSON');
}

/** Set lot data
 * @param {object} data - Lot data
 * @param {string} type - Lot type
 * */
function setLot(data={}, type='current'){
   Bot.setProperty(`${LIB_PREFIX}${type}Lot`, data, 'JSON');
}

/** Get lot data
 * @param {string} type - Lot type name
 * @return {object} data - Lot data
 * */
function getLot(type='current') {
   const currentLot = Bot.getProperty(`${LIB_PREFIX}${type}Lot`);
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
   const noIDs = (lotID !== null) && (auctionID !== null);
   const lot = noIDs ? getAuctionLot(lotID, auctionID) : getLot(type);
   lot[name] = value;

   setLot(lot, type);
}

/** Get lot property by id or type
 * @param {string} name Lot property name
 * @param {string} type Lot type name
 * @param {string|null} lotID Lot id
 * @param {string|null} auctionID Auction id
 *
 * @return {any} Property value by name
 * */
function getLotProperty(name, type='current', lotID=null, auctionID=null){
   const noIDs = (lotID !== null) && (auctionID !== null);
   const lot = noIDs ? getAuctionLot(lotID, auctionID) : getLot();

   return lot[name];
}

/** Get current lot bet price
 * @return {string|number}
 * */
function getCurrentBetPrice() {
   const { betPrice: curBetPrice } = getLot();

   if (curBetPrice !== undefined) { return parseInt(curBetPrice) }

   setLotProperty('betPrice', 0);
   return 0;
}

/** Set current lot bet details
 * @param {object} betUser - User details who made bet
 * @param {string|number} betPrice - Price which offered user
 * */
function setCurrentBetDetails(betUser, betPrice) {
   setLotProperty('betUser', betUser);
   setLotProperty('betPrice', betPrice);
}

/** Get currently running auction bet details
 * @return {object}*/
function getCurrentBetDetails() {
   const { betUser, betPrice } = getLot();
   return {
      user: betUser,
      price: betPrice
   };
}

/** Save created lot */
function saveCreatedLot() {
   const { auctionID, ...lot } = getLot('creating');

   addAuctionLot(auctionID, lot);
}
/* </LOT> */


publish({
   launchAuctionAt: launchAuctionAt,
   setupCurAuc: setupCurrentAuction,
   getAuction: getAuction,
   getAucByID: getAuctionByID,
   getAuctions: getAuctions,
   addAuction: addAuctionToList,
   setCurBet: setCurrentBetDetails,
   getCurBet: getCurrentBetDetails,
   getCurBetPrice: getCurrentBetPrice,
   isOver: isOver,
   setAucProp: setAuctionProperty,
   setCreatingAucProp: setCreatingAuctionProperty,
   lot: {
      saveCreatedLot: saveCreatedLot,
      setLotProp: setLotProperty,
      getLotProp: getLotProperty,
   }
})
