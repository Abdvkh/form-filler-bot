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

if (auction.setupCurAuc(auctionID)){// if auction successfully setup(if status is active)
   if (auction.getAucLotsCount() > 0){// if there are active lots(not started ones)
      const lotIndex = auction.lot.getIndex(auctionID);
      const gifIndex = lotIndex > 0 ? '3' : '0';

      startAuction(gifIndex);
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
(options && options.hasOwnProperty('manual')) && Bot.run({command: '/showAuctions'});// if has options run command


function startAuction(gifIndex='0') {
   Bot.setProperty('sentGifIndex', gifIndex, 'String');

   Api.sendMessage({
      chat_id: admin,
      text: startingAuction
   });

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
