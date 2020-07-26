/*CMD
  command: /bet
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

if (request.from.is_bot) {
   let bet = params.split(' ')[1];
   if (!isNaN(bet)) {
      let group = Bot.getProperty('chat');
      let betKeyboard = Bot.getProperty('betKeyboard');

      Api.sendMessage({
         chat_id: group,
         text: 'Ставка от ' + utils.getLinkFor(user ? user : request.from) + ' ' + bet,
         parse_mode: 'Markdown',
         reply_markup: betKeyboard
      });
   }
} else {
   Bot.sendMessage('Smth went wrong =)');
}
