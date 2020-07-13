let libPrefix = 'auction_';

function setAuction(name, data) {
   Bot.setProperty(libPrefix + name, data, 'JSON');
}

function setCurrentAuction(propName, propValue) {
   let curAuc = getCurrectAuction();
   curAuc[propName] = propValue;
   setAuction('current', curAuc);
}

function getCurrectAuction() {
   let curAuc = Bot.getProperty(libPrefix + 'current');

   if (curAuc != undefined) { return curAuc;}

   let data = {};
   Bot.setProperty(libPrefix + 'current', data, 'JSON');
   return data;
}

function kickOffTo(chatId) {
   let curAuc = getCurrectAuction();
   let aucPost = '📌' + curAuc['name'] + '\n\n' +
                 'Начальная цена: ' + curAuc['startingPrice'] + '\n\n' +
                 'Описание: ' + '\n\n' +
                 curAuc['description'];

   Api.sendPhoto({
      chat_id: chatId,
      photo: curAuc['picture'],
      caption: aucPost,
      parse_mode: 'Markdown',
      reply_markup: {
         inline_keyboard: [
               [
                  { text: 'Сделать ставку', url: 't.me/abduvakhidovsbot?start=bet' },
                  { text: 'Повысить на 5', callback_data: 'bet 5' },
               ]
         ],
      }
   })
}

function getCurBetPrice() {
   let curAuc = getCurrectAuction();
   let curBetPrice = curAuc['betPrice'];

   if (curBetPrice != undefined) { return curBetPrice }

   setCurrentAuction('betPrice', 0);
   return 0;
}

function setCurrentBetDetails(betUser, betPrice) {
   setCurrentAuction('betUser', betUser);
   setCurrentAuction('betPrice', betPrice);
}

function getCurrentBetDetails() {
   return {
      user: getCurrectAuction()['betUser'],
      price: getCurBetPrice()
   };
}

function isOver() {
   let betStep = getCurrectAuction('betStep');
   return betStep != 3;
}

publish({
   kickOffTo: kickOffTo,
   getCurAuction: getCurrectAuction,
   setCurrentAuction: setCurrentAuction,
   setAuction: setAuction,
   setCurBet: setCurrentBetDetails,
   getCurBet: getCurrentBetDetails,
})
