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
const { noSuchAuction, startingAuction, lotEnded, defaultTakeSectionCaption } = lang['auction'];
const admin = Bot.getProperty('admin');

if (auction.setupCurAuc(auctionID)){// if auction successfully setup(if status is active)
   if (auction.getAucLotsCount() > 0){// if there are active lots(not started ones)
      const lotIndex = auction.lot.getIndex(auctionID);
      let gifIndex;

      if (lotIndex > 0){
         gifIndex =  '3';
         Api.sendMessage({text: lotEnded});
      } else {
         gifIndex = '0';
      }

      startAuction(gifIndex);
   } else {
      auction.setAucProp('status', 'ended', null, auctionID);
      auction.setAucLotProp('status', 'ended', auctionID, auction.lot.getLotProp('id'));

      auction.lot.setProperty('isOver', true);
      auction.lot.setProperty('status', 'ended');
      auction.takeSection.setSentState(true);

      Api.sendMessage({text: lotEnded});

      auction.takeSection.send();
   }
} else {
   Api.sendMessage({
      chat_id: admin,
      text: noSuchAuction.replace('{auctionID}', auctionID)
   });
}
(options && options.hasOwnProperty('manual')) && Bot.run({command: '/showAuctions'});// if has manual options run command


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
