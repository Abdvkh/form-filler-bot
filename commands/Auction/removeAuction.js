/*CMD
  command: removeAuction
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
const removed = auction.removeAuctionByID(auctionID); //removes auction from stored auctions list
const { removed: removedMsg, notRemoved: notRemovedMsg } = lang['auction'];

msg = notRemovedMsg;

if (removed){
    msg = removedMsg;
    Bot.clearRunAfter({label: 'startAuction' + auctionID}); //removes auction from "to be executed" list
}

Api.sendMessage({text: msg});
Bot.run({command: '/showAuctions'});
