let group = Bot.getProperty('chat');

if (params && !isNaN(params)) {
   if(!(request.caption)){
      Api.deleteMessage({
         chat_id: request.message.chat.id,
         message_id: request.message.message_id,
      });
   }

   Api.sendMessage({
      chat_id: group,
      text: 'Ставка от ' + utils.getLinkFor(user) + ' ' + message,
      parse_mode: 'Markdown'
   });
   auction.setCurBet(user, params);
   auction.setCurrentAuction('betStep', 1);

   Bot.clearRunAfter({
      label: 'bet'
   });

   Bot.run({
      label: 'bet',
      command: 'betStep',
      run_after: 60
   });
} else {
   let command = {
      cmd: 'getBet ' + request.message.message_id,
      txt: lang['enterBetAmount'],
      keys: wordsLikeButton.mainmenu
   };
   utils.runCommandWithKeyboard(command);
}
