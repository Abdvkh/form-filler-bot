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
const removed = auction.removeAuctionByID(auctionID);
const { removed: removedMsg, notRemoved: notRemovedMsg } = lang['auction'];

if (removed){
    msg = removedMsg;
}
msg = notRemovedMsg;

Api.sendMessage({text: msg});
