let curBet = auction.getCurBet();
let group = Bot.getProperty('chat');
let betStep = auction.getCurAuction('betStep');

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

if (params) {
   Api.deleteMessage({
      chat_id: group,
      message_id: params,
   });
}
auction.setCurrentAuction('betStep', betStep+1);

Api.sendMessage({
   chat_id: chat,
   text: 'Ставка от ' + utils.getLinkFor(curBet['user']) + ' ' + curBet['price'],
   parse_mode: 'Markdown'
});
Bot.run({
   command: 'betStep',
   run_after: 60,
   label: bet
});
