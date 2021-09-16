/*CMD
  command: betStep
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Auction
  answer: 
  keyboard: 
  aliases: 
CMD*/

const group = Bot.getProperty('chat');

const { user, price } = auction.getCurBet();
const betStep = parseInt(auction.lot.getLotProp('betStep'));


auction.lot.setLotProp('betStep', betStep + 1);

sendCurrentBetStepMessage();

// sendGIFOnBetStep(betStep);

if (auction.isOver()) {
   const auctionID = auction.getAucProp('id');
   const lotID = auction.lot.getLotProp('id');

   auction.setAucLotProp('status', 'ended', auctionID, lotID);

   sendWinnerMessages();

   sendGIF(group, 0);

   if (auction.getAucLotsCount() > 0){
      auction.startNexLot(0);
   }

   return Bot.clearRunAfter({label: 'bet'});
}

Bot.run({
   command: 'betStep',
   run_after: 60,
   label: 'bet'
});


/** Send GIF regarding current bet step
 * @param {string|number} betStep - Current bet step
 * */
function sendGIFOnBetStep(betStep){
   if (betStep === 2) {
      const gifID = utils.getRandomInt(7, 9);

      sendGIF(group, gifID);
   }
}

/** Send GIF from stored GIFs by its index
 * @param {string|number} chatID - ChatID where GIF is being sent
 * @param {string|number} index - Stored GIF ID which is being sent
 * */
function sendGIF(chatID, index) {
   const gifs = Bot.getProperty('gifs');

   Api.sendDocument({
      chat_id: chatID,
      document: gifs.file_ids[index]
   });
}

function sendCurrentBetStepMessage() {
   const betKeyboard = Bot.getProperty('betKeyboard');
   const betStepText = betStep === 1 ? "Раз" : betStep === 2 ? "Два" : "Три";
   const betMsg = `*${betStepText}* ставка от ${utils.getLinkFor(user)} ${price}`;

   Api.sendMessage({
      chat_id: group,
      text: betMsg,
      parse_mode: 'Markdown',
      reply_markup: betKeyboard,
   });
}

function sendWinnerMessages() {
   const replyKeyboard = Bot.getProperty('fillFormInlineKeyboard');
   const { msgToWinner, auctionOver } = lang;
   const { user: betUser } = auction.getCurBet();

   const messages = [
      [betUser['telegramid'], msgToWinner],
      [group, auctionOver + utils.getLinkFor(betUser)],
   ];

   //change reply keyboard to add variable of winner ID
   replyKeyboard['inline_keyboard'][0][0]['url'] += `-${betUser['telegramid']}`;

   messages.forEach(([chatID, msg]) => {
      Api.sendMessage({
         chat_id: chatID,
         text: msg,
         reply_markup: replyKeyboard,
         parse_mode: 'Markdown',
      });
   });
}
