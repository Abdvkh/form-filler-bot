let LIB_PREFIX = 'auction_';

/* <AUCTION> */


/** Set all auctions structure
 * @param {Array} auctions Auctions data
 * */
function setAuctions(auctions=[]){
   const structure = {
      data: auctions
   };

   Bot.setProperty(`${LIB_PREFIX}all`, structure, 'Object');
}

/** Get all auctions data
 * @return {Array} Auctions data
 * */
function getAuctions(){
   const auctions = Bot.getProperty(`${LIB_PREFIX}all`);

   if (!auctions){
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
   const auctions = getAuctions();

   for (let i = 0; i < auctions.length; i++) {
      const { id } = auctions[i];

      if (id === auctionID){
         auctions[i] = data;
         break;
      }
   }

   setAuctions(auctions);
}

/** Get auction data from all by its ID
 * @param {string} auctionID - Auctions id
 * @return {object|undefined}
 * */
function getAuctionByID(auctionID){
   const auctions = getAuctions();

   return auctions.find(({ id }) => id === auctionID);
}

/** Set specified type of auction data
 * @param {object} data - Auction data
 * @param {string} type - Auction type
 * */
function setAuction(data={}, type='current'){
   Bot.setProperty(`${LIB_PREFIX}${type}`, data, 'Object');
}

/** Get specified auction data
 * @param {string} type - Auction type
 * @return {object} auction - Auction data
 * */
function getAuction(type='current'){
   const auction = Bot.getProperty(`${LIB_PREFIX}${type}`);
   if (!auction){
      setAuction(type);
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
 * @param {string|null} auctionID - Type of auction
 *
 * @return {any} Auction property
 * */
function getAuctionProperty(name, type='current', auctionID=null){
   let auction;

   if (auctionID){
      auction = getAuctionByID(auctionID);
      return auction[name];
   }
   auction = getAuction(type);
   return auction[name];
}

/** Get auction property
 * @param {string} name - Property name of auction
 * @param {any} value - Property value of auction
 * @param {string|null} type - Type of auction
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
   let auctions = getAuctions();

   const { id } = auction;
   const existingAuction = getAuctionByID(id);

   if (existingAuction) {
      const existingAucKeys = Object.keys(existingAuction);

      if (existingAucKeys.length > 0) {
         auction['lots'] = existingAuction['lots'];

         setAuctionByID(auction, id);
         auctions = getAuctions();
      }
   } else {
      auctions.push(auction);
   }

   auctions.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
   setAuctions(auctions);
}

/** Remove auction from auctions list by given ID
 * @param {string} auctionID Auction ID
 * */
function removeAuctionByID(auctionID) {
   const auctions = getAuctions();

   if (!auctions) { return false; }

   for (let i = 0; i < auctions.length; i++) {
      const { id } = auctions[i];

      if (id === auctionID){
         auctions.pop(i);
         setAuctions(auctions);
         return true;
      }
   }

   return false;
}

/** Sets current auction
 * @param {string} auctionID Auction ID
 * @returns {boolean} false if auction is started or inactive or not exists
 * */
function setupCurrentAuction(auctionID) {
   const auction = getAuctionByID(auctionID);

   if (auction) {
      const { status } = auction;

      if (status === 'active'){
         auction['status'] = 'started';
         setAuction(auction);
         return true;
      }
   }

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
 * @param {string} lotID Lot ID
 * @param {string} auctionID Auction ID
 * */
function setupAuctionLot(lotID, auctionID){
   const properties = [
      ['isOver', false],
      ['status', 'started'],
   ];
   properties.forEach(([name, value]) => {
      setAuctionLotProperty(name, value, auctionID, lotID);
   });
}

/** Setup currently running auction's lot
 * */
function setupLot(){
   const properties = [
      ['betStep', 1],
      ['isOver', false],
      ['status', 'started'],
      ['betUser', {}]
   ];

   properties.forEach(([name, value]) => {
      setLotProperty(name, value);
   });
}

/**Launches auction at the specified char
 * @param {array} chatsID - Telegram chats id where auctions is shown
 * */
function launchAuctionAt(chatsID) {
   const betKeyboard = Bot.getProperty('betKeyboard');

   let { id: auctionID, lots: currentLots } = getAuction();

   currentLots = currentLots.filter(({ status }) => status === 'active'); // get only  active auctions

   if (currentLots){

   }

   const latestLot = [...currentLots].shift();// takes 1st lot(from list of lots sorted by datetime)
   const { id, title, startingPrice, description, picture } = latestLot;

   setTakeSectionSentState(false);
   setLot(latestLot); // sets as current lot
   setupLot();// setup given lot(with necessary variables)
   setupAuctionLot(id, auctionID); // setup current auction's state

   chatsID.forEach((chatId) => {
      if (latestLot.video){
         Api.sendVideo({
            chat_id: chatId,
            video: latestLot.video,
            caption: `📌${title}\n\nНачальная цена: ${startingPrice}\n\nОписание: ${description}`,
            parse_mode: 'HTML',
            reply_markup: betKeyboard,
         });
      } else if (picture){
         Api.sendPhoto({
            chat_id: chatId,
            photo: picture,
            caption: `📌${title}\n\nНачальная цена: ${startingPrice}\n\nОписание: ${description}`,
            parse_mode: 'HTML',
            reply_markup: betKeyboard,
         });
      }
   });
}

/** Get whether auction is over or not
 * @return {boolean}
 * */
function isOver() {
   let betStep = parseInt(getLotProperty('betStep'));
   const isOver = betStep > 3;

   if (!betStep) {
      betStep = 1;
      setLotProperty('betStep', betStep);
   }

   setLotProperty('isOver', isOver);
   setLotProperty('status', isOver ? 'ended' : 'started');
   return isOver;
}

/** Get auction related lots count
 * @param {string} lotStatus - Lot's status to be filtered
 * @param {string} auctionType - Auction type
 * @param {string|null} auctionID - Auction ID
 * @return {number} length
 * */
function getAuctionLotsCount(lotStatus='active', auctionType='current', auctionID=null) {
   const auction = auctionID ? getAuctionByID(auctionID) : getAuction(auctionType);
   return (auction['lots'].filter(({ status }) => status === lotStatus)).length;
}

/** Add given lot to given auction
 * @param {string} auctionID - Auction ID
 * @param {object} lot - Lot data
 * */
function addAuctionLot(auctionID, lot) {
   const auction = getAuctionByID(auctionID);

   auction['lots'].push(lot);

   setAuctionByID(auction, auctionID);
}

/** Starts next lot of current auction
 * @param {number} after - Amount of seconds after which start command of next lot is fired
 * */
function startNexLot(after) {
   const { id: currentID } = getAuction();

   Bot.clearRunAfter({label: 'startAuction' + currentID});
   Bot.run({
      command: 'startAuction',
      label: 'startAuction' + currentID,
      run_after: after,
      options: {
         auctionID: currentID
      }
   });
}

/** Get auction index by its ID
 * @param {string} auctionID - Auction ID
 * @return {number} Auction index
 * */
function getAuctionIndex(auctionID){
   const auctions = getAuctions();
   return auctions.findIndex(({ id }) => id === auctionID );
}

/** Sets given auction's lots status as given
 * @param {string} auctionID - Auction's ID
 * @param {string} propertyName - Lots property name
 * @param {string} propertyValue - Lots property value
 * */
function setLotsProperty(auctionID, propertyName, propertyValue){
   const givenAuction = getAuctionByID(auctionID);

   givenAuction.lots.forEach((lot) => {
      lot[propertyName] = propertyValue;
   });

   setAuctionByID(givenAuction, auctionID);
}

/* </AUCTION> */

/** **************************************************** */

/* <LOT> */


/** Set lot by ID
 * */
function setLotPropertyByID(){
   //TODO: implement
}

/** End lot
 * @param {string} type - Lot type
 * @param {string|null} lotID - Lot ID
 * */
function endLot(type='current', lotID=null){
//TODO: implement ending lot
}

/** Set lot data
 * @param {object} data - Lot data
 * @param {string} type - Lot type
 * */
function setLot(data={}, type='current'){
   Bot.setProperty(`${LIB_PREFIX}${type}Lot`, data, 'Object');
}

/** Get lot data
 * @param {string} type - Lot type name
 * @return {object} data - Lot data
 * */
function getLot(type='current') {
   const currentLot = Bot.getProperty(`${LIB_PREFIX}${type}Lot`);
   if (currentLot) { return currentLot; }

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

   if (curBetPrice) { return parseInt(curBetPrice) }

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

/** Get lot index by given auction ID
 * @param {string} auctionID - Auction ID
 * @return {number} Auction index
 * */
function getLotIndex(auctionID){
   const { lots } = getAuctionByID(auctionID);
   return lots.findIndex(({ status }) => status === 'active');
}


/* </LOT> */

/* <Take Section> */

function setTakeSectionSentState(state) {
   Bot.setProperty('isTakeSection', state, 'Boolean');
}

function isTakeSectionSent() {
   return Bot.getProperty('isTakeSection');
}

/** Sends take section of auction to the given chat with inline reply keyboard
 * */
function sendTakeSection(){
   const group = Bot.getProperty('chat');
   const replyKeyboard = Bot.getProperty('fillFormInlineKeyboard');
   const { takeCaption, takePicture, takeVideo } = getAuction();

   const options = {
      chat_id: group,
      caption: takeCaption || defaultTakeSectionCaption,
      parse_mode: 'HTML',
      reply_markup: replyKeyboard,
   };

   if (takeVideo){
      options.video = takeVideo;
      Api.sendVideo(options);
   } else if (takePicture){
      options.photo = takePicture;
      Api.sendPhoto(options);
   }

   Api.sendMessage({
      chat_id: group, 
      text: '👋Дорогие клиенты, у кого не получилось заполнить форму или она не работает у Вас, пожалуйста напишите в личку для оформления заказа.\n'
            + '✔️Если не работает форма для БЕРУ ставьте плюс для заказа.\n'
            + '✔️Все заказы будут обработаны в течении 24х часов и завтра вечером отправлены.'
   })
}

/* </Take Section> */

publish({
   launchAuctionAt: launchAuctionAt,
   setupCurAuc: setupCurrentAuction,
   removeAuctionByID: removeAuctionByID,
   getAucLotsCount: getAuctionLotsCount,
   getAuction: getAuction,
   setAuction: setAuction,
   getAucByID: getAuctionByID,
   getAuctions: getAuctions,
   addAuction: addAuctionToList,
   setCurBet: setCurrentBetDetails,
   getCurBet: getCurrentBetDetails,
   getCurBetPrice: getCurrentBetPrice,
   isOver: isOver,
   setLotsProp: setLotsProperty,
   setAucProp: setAuctionProperty,
   getAucProp: getAuctionProperty,
   setAucLotProp: setAuctionLotProperty,
   setCreatingAucProp: setCreatingAuctionProperty,
   startNexLot: startNexLot,
   getAucIndex: getAuctionIndex,
   lot: {
      set: setLot,
      endLot: endLot,
      saveCreatedLot: saveCreatedLot,
      setProperty: setLotProperty,
      setLotProp: setLotProperty,
      getLotProp: getLotProperty,
      getIndex: getLotIndex,
   },
   takeSection: {
      isSent: isTakeSectionSent,
      send: sendTakeSection,
      setSentState: setTakeSectionSentState,
   }
})
