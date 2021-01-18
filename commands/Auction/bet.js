/*CMD
  command: bet
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

const { auctionOver } = lang;
const { user: betUser, price: betPrice } = auction.getCurBet();
const group = Bot.getProperty('chat');

if (auction.isOver()) {
   //say that auction is over
   return Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: auctionOver + utils.getLinkFor(betUser),
      show_alert: true
   });
}

if (params && !isNaN(params)) {
   const bet = parseInt(betPrice) + parseInt(params);
   const betKeyboard = Bot.getProperty('betKeyboard');
   const gifID = utils.getRandomInt(5, 6);

   sendGIF(group, gifID);

   Api.sendMessage({
      chat_id: group,
      text: 'Ставка от ' + utils.getLinkFor(user ? user : request.from) + ' ' + bet,
      parse_mode: 'Markdown',
      reply_markup: betKeyboard
   });

   auction.setCurBet(user ? user : request.from, bet);
   auction.lot.setLotProp('betStep', 1);

   Bot.clearRunAfter({
      label: 'bet'
   });

   Bot.run({
      label: 'bet',
      command: 'betStep',
      run_after: 60
   });
} else {
   // ask bet
   utils.runCommandWithKeyboard({
      cmd: 'getBet ' + request.message.message_id,
      txt: lang['enterBetAmount'],
      btns: wordsLikeButton.mainmenu
   });
}


/** Send GIF from stored GIFs by its index
 * @param {string|number} chatID - ChatID where GIF is being sent
 * @param {string} index - Stored GIF ID which is being sent
 * */
function sendGIF(chatID, index) {
   const gifs = Bot.getProperty('gifs');

   Api.sendDocument({
      chat_id: chatID,
      document: gifs.file_ids[index]
   });
}
