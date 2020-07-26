/*CMD
  command: getBet
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases:
CMD*/

let curBetPrice = parseInt(auction.getCurBetPrice());
let group = Bot.getProperty('chat');

if (message && !isNaN(message)) {

   if (message<0) {
      Bot.sendMessage('Вы ввели неправильную цену, попробуйте ещё');
      return Bot.runCommand('getBet');
   }
   let bet = curBetPrice + parseInt(message);
   let gif_id = utils.getRandomInt(5, 6);
   let gifs = Bot.getProperty('gifs');
   Api.sendDocument({
      chat_id: group,
      document: gifs.file_ids[gif_id]
   });
   
   let betKeyboard = Bot.getProperty('betKeyboard');

   Api.sendMessage({
      chat_id: group,
      text: 'Ставка от ' + utils.getLinkFor(user) + ' ' + bet,
      parse_mode: 'Markdown',
      reply_markup: betKeyboard
   });
   Bot.sendMessage('Ваша ставка сделана, спасибо!');
   auction.setCurBet(user, bet);
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
