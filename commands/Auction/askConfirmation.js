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
   auction.lot.saveCurLot();
   Bot.run({
      command: 'startAuction ' + lot_id,
      label: 'startAuction',
      run_after: diff
   });
   Bot.sendMessage('Lot is saved under '+ lot_id);
   Bot.sendMessage('In order to fill new lot enter /startFillingLot');
}
