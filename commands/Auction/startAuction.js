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

if (auction.setupCurAuc(auctionID) && auction.getAucLotsCount() > 0){// if auction successfully setup(if status is active) and there are active lots(not started)
   startAuction();
} else {
   Api.sendMessage({
      text: noSuchAuction.replace('{auctionID}', auctionID)
   });
}
options && Bot.run({command: '/showAuctions'});// if has options run command


function startAuction() {
   Bot.setProperty('sentGifIndex', '0', 'String');

   Bot.sendMessage(startingAuction);
   Bot.run({
      command: 'sendBeforeStartGif',
      run_after: 10,
      label: 'start_gif',
   });
}
