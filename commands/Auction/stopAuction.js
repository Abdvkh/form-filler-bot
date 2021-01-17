/*CMD
  command: stopAuction
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases:
CMD*/


const auctionID = params || options['auctionID'];
const { id } = auction.getAuction();
const { noSuchAuction, stopped } = lang['auction'];

if (id === auctionID){// if auction id is the same as current auction ID
    Api.sendMessage({
        text: stopped.replace('{auctionID}', auctionID)
    });
    stopAuction(auctionID);
} else {
    Api.sendMessage({
        text: noSuchAuction.replace('{auctionID}', auctionID)
    });
}
Bot.run({command: '/showAuctions'});


function stopAuction(auctionID) {
    auction.setAucProp('status', 'stopped', null, auctionID);
    Bot.crearRunAfter({label: 'startAcution' + auctionID});
}
