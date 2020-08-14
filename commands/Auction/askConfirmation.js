/*CMD
  command: askConfirmation
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Подтвердите лот
  keyboard: Сохранить лот, Заполнить заново, Главное меню
  aliases:
CMD*/

if (message == 'Сохранить лот') {
   let lot_number = auction.lot.getLotsCount();
   Bot.sendMessage('Lot is saved under '+lot_number);
   Bot.sendMessage('In order to fill new lot enter /startFillingLot');
} else if (message == 'Заполнить заново') {
   Bot.runCommand('/startFillingLot');
}
