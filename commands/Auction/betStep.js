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

if (betStep==1) {
   let gif_id = utils.getRandomInt(7, 9);
   Api.sendDocument({
      chat_id: group,
      document: gifs.file_ids[gif_id]
   });
}

Api.sendMessage({
   chat_id: group,
   text: betStep + ' cтавка от ' + utils.getLinkFor(curBet['user']) + ' ' + curBet['price'],
   parse_mode: 'Markdown',
   reply_markup: {
      inline_keyboard: [
            [
               { text: 'Сделать ставку', url: 't.me/abduvakhidovsbot?start=bet' },
               { text: 'Повысить на 5', callback_data: 'bet 5' },
            ]
      ],
   }
});

Bot.run({
   command: 'betStep',
   run_after: 60,
   label: 'bet'
});
