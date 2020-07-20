let curBet = auction.getCurBet();
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

let gif_id = utils.getRandomInt(5, 6);
Api.sendDocument({
   chat_id: group,
   document: gifs.file_ids[gif_id]
});

if (betStep == 2) {
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
