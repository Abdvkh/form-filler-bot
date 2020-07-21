/*CMD
  command: bet
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases:
CMD*/

let betUser = request.from;

if (auction.isOver()) {
   return Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: lang['aucOver'] + utils.getLinkFor(auction.getCurBet()['user']),
   });
}

let group = Bot.getProperty('chat');
let curAucPrice = parseInt(auction.getCurBetPrice());
if (params && !isNaN(params)) {
   if(request.message.caption==undefined){
      Api.deleteMessage({
         chat_id: request.message.chat.id,
         message_id: request.message.message_id,
      });
   }

   let bet = curAucPrice + parseInt(params);

   Api.sendMessage({
      chat_id: group,
      text: 'Ставка от ' + utils.getLinkFor(betUser) + ' ' + bet,
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
   auction.setCurBet(betUser, bet);
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
