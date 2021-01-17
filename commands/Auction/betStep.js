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

const { user, price } = auction.getCurBet();
const betStep = parseInt(auction.getLotProp('betStep'));

const group = Bot.getProperty('chat');

const betKeyboard = Bot.getProperty('betKeyboard');
const reply_keyboard = Bot.getProperty('fillFormInlineKeyboard');

if (auction.isOver()) {
   sendWinnerMessages();

   sendGIF(group, 0);

   if (auction.getAucLotsCount('active') === 0){
      sendTakeSection(group, reply_keyboard);
   } else {
      startNexLot();
   }

   return Bot.clearRunAfter({label: 'bet'});
}

auction.lot.setLotProp('betStep', betStep + 1);

sendCurrentBetStepMessage();

sendGIFOnBetStep(betStep)

Bot.run({
   command: 'betStep',
   run_after: 60,
   label: 'bet'
});


/** Sends take section of auction to the given chat with inline reply keyboard
 * @param {string|number} chatID - Chat ID where it's being sent
 * @param {object} replyKeyboard - Keyboard attached to message
 * */
function sendTakeSection(chatID, replyKeyboard){
   // sending "Беру"
   const { takeCaption, takePicture } = auction.getAuction();

   Api.sendPhoto({
      chat_id: chatID,
      photo: takePicture,
      caption: takeCaption || "Секция Беру",
      parse_mode: 'Markdown',
      reply_markup: replyKeyboard,
   });
}

/** Send GIF regarding current bet step
 * @param {string|number} betStep - Current bet step
 * */
function sendGIFOnBetStep(betStep){
   if (betStep === 2) {
      const gifID = utils.getRandomInt(7, 9);

      sendGIF(group, gifID)
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
   const betStepText = betStep === 1 ? "Раз" : betStep === 2 ? "Два" : "Три";
   const betMsg = betStepText + ' cтавка от ' + utils.getLinkFor(user) + ' ' + price;

   Api.sendMessage({
      chat_id: group,
      text: betMsg,
      parse_mode: 'Markdown',
      reply_markup: betKeyboard,
   });
}

function sendWinnerMessages() {
   const { msgToWinner, auctionOver } = lang;
   const { telegramid } = user;
   const messages = [
      [telegramid, msgToWinner],
      [group, auctionOver + utils.getLinkFor(user)],
   ];

   messages.forEach(([chatID, message]) => {
      Api.sendMessage({
         chat_id: chatID,
         text: message,
         reply_markup: reply_keyboard,
         parse_mode: 'Markdown',
      });
   });
}

/** Starts next lot of current auction
 * */
function startNexLot() {
   const { id: auctionID } = auction.getAuction();

   Bot.run({
      command: 'startAuction',
      label: 'startAuction' + auctionID,
      options: {
         auctionID: auctionID
      }
   });
}
