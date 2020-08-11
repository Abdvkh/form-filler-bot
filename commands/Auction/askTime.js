/*CMD
  command: askTitle
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 6. Введите запланированное время лота формат(дд/мм/гг ЧЧ:ММ | Например: 01/01/20 13:12). \nПробел между датой и временем обязателен
  keyboard: Главное меню, Идентификатор
  aliases: Заголовок
CMD*/

let inputs = message.split(' ');

let inputDate = inputs[0];
let inputTime = inputs[1];

let date = utils.time.checkDate(inputDate);
let time = utils.time.checkTime(inputTime);

let time_info = time['isValid'] ? 'Time is valid.' : 'Time is invalid.';
let date_info = date['isValid'] ? 'Date is valid.' : 'Date is invalid.';

let scheduled_time = new Date(date['standardDate']+" "+time['standardTime']);
let cur_time = Date.now();
let diff =  parseInt((scheduled_time.getTime() - cur_time)/1000)

let lot_number = auction.getLotsCount();

if (inputs.length > 2 || message.length > 15) {
   Bot.sendMessage(
      'Please enter datetime in right way "dd/mm/yy HH:MM"'
    + ' a space between date(dd/mm/yy) and time(HH:MM) is required.\n'
    + 'Try again please!'
   );
   return Bot.run({command: 'askTime'});
}

Bot.sendMessage(inputDate+" "+inputTime);


if (date['isValid'] && time['isValid']) {
   auction.setCurrentLot('time', message);

   Bot.run({
      command: '/startAuction ' + lot_umber,
      label: 'startAuction',
      run_after: diff
   });

   Bot.sendMessage("Success");
   Bot.run({
      command: 'askConfirmation',
   });
} else {
   Bot.sendMessage(date_info + " and " + time_info);
}
