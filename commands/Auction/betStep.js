let curBet = auction.getCurBet();
let group = Bot.getProperty('chat');
let betStep = parseInt(auction.getCurAuction()['betStep']);

if (betStep == undefined) {
   auction.setCurrentAuction('betStep', 1);
   betStep = 1;
}

if (auction.isOver()) {
   auction.setCurrentAuction('betStep', 1);
   Bot.sendMessage(lang['aucOver'] + utils.getLinkFor(curBet['user']));
   return Bot.clearRunAfter({
      label: 'bet'
   });
}

if (params && betStep !=1) {
   Api.deleteMessage({
      chat_id: group,
      message_id: params,
   });
}
auction.setCurrentAuction('betStep', betStep+1);

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
