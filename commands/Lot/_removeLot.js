/*CMD
  command: /removeLot
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Lot
  answer: 
  keyboard: Главное меню
  aliases: 
CMD*/

let msg;
const { success, noSuchLot, wentWrong, noParams } = lang['lot']['remove'];

if (!params) {
    return Bot.sendMessage(noParams);
}
const lotRemovingStatus = parseInt(auction.lot.endLot(params));

if (lotRemovingStatus === 400) {
    msg = noSuchLot;
} else if (lotRemovingStatus === 200) {
    msg = success;
}  else {
    msg = wentWrong;
}
Bot.sendMessage(msg);
