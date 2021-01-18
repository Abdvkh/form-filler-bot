/*CMD
  command: startAuction
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

const auctionID = params || options['auctionID'];
const { noSuchAuction, startingAuction } = lang['auction'];
const admin = Bot.getProperty('admin');

if (auction.setupCurAuc(auctionID)){// if auction successfully setup(if status is active) and there are active lots(not started)
   if (auction.getAucLotsCount() > 0){
      startAuction();
   } else {
      auction.setAucProp('status', 'ended', null, auctionID);
      sendTakeSection();
   }
} else {
   Api.sendMessage({
      chat_id: admin,
      text: noSuchAuction.replace('{auctionID}', auctionID)
   });
}
auctionID && Bot.run({command: '/showAuctions'});// if has options run command


function startAuction() {
   Bot.setProperty('sentGifIndex', '0', 'String');

   Bot.sendMessage(startingAuction);
   Bot.run({
      command: 'sendBeforeStartGif',
      run_after: 10,
      label: 'start_gif',
   });
}

/** Sends take section of auction to the given chat with inline reply keyboard
 * */
function sendTakeSection(){
   const group = Bot.getProperty('chat');
   const replyKeyboard = Bot.getProperty('fillFormInlineKeyboard');
   const { takeCaption, takePicture } = auction.getAuction();

   // sending "Беру"
   Api.sendPhoto({
      chat_id: group,
      photo: takePicture,
      caption: takeCaption || "Секция Беру",
      parse_mode: 'Markdown',
      reply_markup: replyKeyboard,
   });
}
