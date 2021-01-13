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

const auctionID = params;
auction.setupCurAuc(auctionID);
startAuction();


function startAuction() {
   const { startingAuction } = lang['auction'];

   Bot.setProperty('sentGifIndex', '0', 'String');

   Bot.sendMessage(startingAuction);
   Bot.run({
      command: 'sendBeforeStartGif',
      run_after: 10,
      label: 'start_gif',
   });
}
