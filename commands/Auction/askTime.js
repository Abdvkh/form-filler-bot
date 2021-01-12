/*CMD
  command: askTime
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 6. Введите запланированное время лота формат(дд/мм/гг ЧЧ:ММ | Например: 01/01/20 13:12). \nПробел между датой и временем обязателен
  keyboard: Главное меню, Картинка
  aliases: Время
CMD*/

let inputs = message.split(' ');

let inputDate = inputs[0];
let inputTime = inputs[1];

let date = utils.time.checkDate(inputDate);
let time = utils.time.checkTime(inputTime, 2);

let time_info = time['isValid'] ? 'Время варидно.' : 'Время не валидно.';
let date_info = date['isValid'] ? 'Дата валидна.' : 'Дата не валидна.';

let scheduled_time = (new Date(date['standardDate']+" "+time['standardTime'])).getTime();
let cur_time = Date.now();
let diff =  parseInt((scheduled_time - cur_time)/1000)

let lot_number = auction.lot.getLotsCount();

if (inputs.length !== 2 || message.length > 15 || diff < 1) {
   Bot.sendMessage(
      'Пожалуйста введите дату в данном формате "дд/мм/гг ЧЧ:ММ"'
    + ' пробел между датой(дд/мм/гг) и временем(ЧЧ:ММ) обязателен.\n'
    + 'Попробуйте ещё раз пожалуйста!'
   );
   return Bot.run({command: 'askTime'});
}

if (date['isValid'] && time['isValid']) {
   auction.lot.setCurLot('time', `${inputDate} ${time['standardTime']}`);

   Bot.run({
      command: 'askTakeTitle',
   });
} else {
   Bot.sendMessage(date_info + " и " + time_info);
}
