/*CMD
  command: /removeAuction
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 🆔Введите идентификатор аукциона
  keyboard: Главное меню
  aliases:
CMD*/

let msg;
const auctionID = message;
const removed = auction.removeAuctionByID(auctionID); //removes auction from stored auctions list
const { removed: removedMsg, notRemoved: notRemovedMsg } = lang['auction'];

msg = notRemovedMsg;

if (removed){
    msg = removedMsg;
    Bot.clearRunAfter({label: 'startAuction' + auctionID}); //removes auction from "to be executed" list
}

Api.sendMessage({text: msg});
