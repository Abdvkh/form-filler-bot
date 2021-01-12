/*CMD
  command: askConfirmation
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer: Подтвердите лот
  keyboard: Сохранить лот, Картинка Беру,\nЗаполнить заново, Главное меню
  aliases:
CMD*/

let lotInputTime = auction.lot.getCurLot('time');
let inputs = lotInputTime.split(' ');

let inputDate = inputs[0];
let inputTime = inputs[1];

let date = utils.time.checkDate(inputDate);
let time = utils.time.checkTime(inputTime);

let scheduled_time = (new Date(date['standardDate']+" "+time['standardTime'])).getTime();
let cur_time = Date.now();
let diff =  parseInt((scheduled_time - cur_time)/1000)

if (message == 'Сохранить лот') {
   let lot_id = auction.lot.getCurLot('id');
   let saving_lot = auction.lot.saveCurLot();
   if (saving_lot != '200') {
      return Bot.sendMessage('Что-то пошло не так во время сохранения лота');
   }
   Bot.run({
      command: 'startAuction ' + lot_id,
      label: 'startAuction',
      run_after: diff
   });
   Bot.sendMessage('Лот сохранён под идентификатором `' + lot_id + '`');
   Bot.sendMessage('Чтобы заполнить новый лот, нажмите /startFillingLot');
}
