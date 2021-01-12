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

const removeLotTranslations = lang['lot']['remove'];

if (!params) {
    return Bot.sendMessage(removeLotTranslations['noParams']);
}
const lotRemovingStatus = parseInt(auction.lot.removeLot(params));

if (lotRemovingStatus === 400) {
    Bot.sendMessage(removeLotTranslations['noSuchLot']);
} else if (lotRemovingStatus === 200) {
    Bot.sendMessage(removeLotTranslations['success']);
}  else {
    Bot.sendMessage(removeLotTranslations['wentWrong']);
}
