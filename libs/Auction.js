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
                  { text: 'Сделать ставку', callback_data: 'bet' },
                  { text: 'Повысить на 5', callback_data: 'bet 5' },
               ]
         ],
      }
   })
}

function sendBetTo(betAmount, chatId) {

}

publish({
   kickOffTo: kickOffTo,
   getCurrectAuction: getCurrectAuction,
   setCurrentAuction: setCurrentAuction,
   setAuction: setAuction
})
