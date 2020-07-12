let curBet = auction.getCurBetPrice();

let group = Bot.getProperty('chat');

if (message && !isNaN(message)) {

   if (message>curBet) {
      Bot.sendMessage('Вы ввели неправильную цену, попробуйте ещё');
      return Bot.runComman('getBet');
   }

   Api.sendMessage({
      chat_id: group,
      text: 'Ставка от ' + utils.getLinkFor(user) + ' ' + message,
      parse_mode: 'Markdown'
   });

   auction.setCurBet(user, message);
   auction.setCurrentAuction('betStep', 1);

   Bot.clearRunAfter({
      label: 'bet'
   });
   Bot.run({
      command: 'betStep',
      run_after: 60,
      label: 'bet'
   });
}
