/*CMD
  command: betStep
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

let curBet = auction.getCurBet();
let gifs = Bot.getProperty('gifs');
let group = Bot.getProperty('chat');

if (auction.isOver()) {
   Api.sendMessage({
      chat_id: group,
      text: lang['aucOver'] + utils.getLinkFor(curBet['user']),
      parse_mode: 'Markdown',
   });
   Api.sendDocument({
      chat_id: group,
      document: gifs.file_ids[0]
   });
   return Bot.clearRunAfter({
      label: 'bet'
   });
}

// if (params && betStep !=1) {
//    Api.deleteMessage({
//       chat_id: group,
//       message_id: params,
//    });
// }
let betStep = auction.getCurAuction()['betStep'];
auction.setCurrentAuction('betStep', parseInt(betStep)+1);

let betKeyboard = Bot.getProperty('betKeyboard');

Api.sendMessage({
   chat_id: group,
   text: betStep==1 ? "Раз" : betStep==2 ? "Два" : "Ошибочная" + ' cтавка от ' + utils.getLinkFor(curBet['user']) + ' ' + curBet['price'],
   parse_mode: 'Markdown',
   reply_markup: betKeyboard,
});

if (betStep==2) {
   let gif_id = utils.getRandomInt(7, 9);
   Api.sendDocument({
      chat_id: group,
      document: gifs.file_ids[gif_id]
   });
}

Bot.run({
   command: 'betStep',
   run_after: 60,
   label: 'bet'
});
