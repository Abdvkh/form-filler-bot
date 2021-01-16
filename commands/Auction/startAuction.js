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

if (auction.setupCurAuc(auctionID)){// if auction successfully setup(if status is active)
   startAuction();
} else {
   Api.sendMessage({
      text: noSuchAuction.replace('{auctionID}', auctionID)
   });
}
Bot.run({command: '/showAuctions'});


function startAuction() {
   Bot.setProperty('sentGifIndex', '0', 'String');

   Bot.sendMessage(startingAuction);
   Bot.run({
      command: 'sendBeforeStartGif',
      run_after: 10,
      label: 'start_gif',
   });
}
