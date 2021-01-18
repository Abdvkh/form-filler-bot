/*CMD
  command: stopAuction
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

let msg;
const auctionID = params || options['auctionID'];
const auctionExists = auction.getAucByID(auctionID);
const { noSuchAuction, stopped } = lang['auction'];

if (auctionExists){// if auction id is the same as current auction ID
    msg = stopped.replace('{auctionID}', auctionID);
    stopAuction(auctionID);
} else {
    msg = noSuchAuction.replace('{auctionID}', auctionID)
}

utils.runCommandWithKeyboard({
    cmd: '/showAuctions',
    txt: msg,
    btns: []
}, 'm');


/** Turns auction status to be stopped and clears running auction
 * @param {string} auctionID - Auction ID
 * */
function stopAuction(auctionID) {
    auction.setAucProp('status', 'stopped', null, auctionID);
    Bot.crearRunAfter({label: 'startAcution' + auctionID});
}
