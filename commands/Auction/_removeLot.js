/*CMD
  command: /startFillingLot
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Заполнение лота: \n1. Введите номер/идентификатор лота. Чтобы отменить команду нажмите на "Главное меню"
  keyboard: Главное меню
  aliases: Заполнить лот, Заполнить заново, Идентификатор
CMD*/

let command = '/startFillingLot';
let operation = auction.lot.setLotID(message);

if (operation == '200') {
   command = 'askTitle';
}

Bot.run({
   command: command,
});
