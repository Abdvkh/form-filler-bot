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

let betStep = auction.getCurAuction()['betStep'];
if (betStep==3) {
   auction.setCurrentAuction('isOver', true);
}
let curBetPrice = parseInt(auction.getCurBetPrice());
let group = Bot.getProperty('chat');

if (message && !isNaN(message)) {

   if (message>curBetPrice) {
      Bot.sendMessage('Вы ввели неправильную цену, попробуйте ещё');
      return Bot.runCommand('getBet');
   }
   let bet = curBetPrice + parseInt(message);

   Api.sendMessage({
      chat_id: group,
      text: 'Ставка от ' + utils.getLinkFor(user) + ' ' + bet,
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
