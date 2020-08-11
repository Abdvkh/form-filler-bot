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
   Bot.sendMessage('Lot is saved');
   Bot.sendMessage('In order to fill new lot enter /startFillingLot');
} else if (message == 'Заполнить заново') {
   Bot.runCommand('/startFillingLot');
}
