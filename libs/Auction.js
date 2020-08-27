let libPrefix = 'auction_';


/* LOTS */
function removeLotFromLotsById(id) {
   let lots = getLots();
   if (!lots) { throw new Exception("No lots were provided"); }
   for (var i = 0; i < lots.length; i++) {
      let lot = lots[i];

      if (lot['id'] == id) {
         let newAuc = lots.pop(i);
         setAuction(newAuc);
         setLots(lots);
         return '200';
      }
   };
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

   if (lots != undefined) { return lots['data']; }

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

   if (curLot != undefined) { return curLot; }

   let data = {};
   Bot.setProperty(libPrefix + 'currentLot', data, 'JSON');
   return data;
}

function getCurrentLotProperty(propName) {
   let lot = getCurrentLot();
   return propName == undefined ? lot : lot[propName];
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

/* LOTS */


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
   if (is_over) {
      Bot.clearRunAfter({
         label: 'bet'
      });
   }
   setCurrentAuction('isOver', is_over);
   return is_over;
}

publish({
   kickOffTo: kickOffTo,
   setCurrentAuction: setCurrentAuction,
   setAuction: setAuction,
   setCurBet: setCurrentBetDetails,
   getCurAuction: getCurrentAuction,
   getCurBet: getCurrentBetDetails,
   getCurBetPrice: getCurBetPrice,
   isOver: isOver,
   lot: {
      setLotID: setLotID,
      getLotsCount: getLotsCount,
      saveCurLot: addCurrentLotToLots,
      removeLot: removeLotFromLotsById,
      setCurLot: setCurrentLotProperty,
      getCurLot: getCurrentLotProperty,
   }
})
