let curBet = auction.getCurBet();
let group = Bot.getProperty('chat');
let betStep = auction.getCurAuction()['betStep'];

if (betStep == undefined) {
   auction.setCurrentAuction('betStep', 1);
   betStep = 1;
}

if (betStep==3) {
   auction.setCurrentAuction('isOver', true);
}

// if (params && betStep !=1) {
//    Api.deleteMessage({
//       chat_id: group,
//       message_id: params,
//    });
// }
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

Bot.run({
   command: 'betStep',
   run_after: 60,
   label: 'bet'
});

if (auction.isOver()) {
   Api.sendMessage({
      chat_id: group,
      text: lang['aucOver'] + utils.getLinkFor(curBet['user']),
      parse_mode: 'Markdown',
   });
   return Bot.clearRunAfter({
      label: 'bet'
   });
}
