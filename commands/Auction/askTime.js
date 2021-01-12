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

const inputs = message.split(' ');
const translationKeywords = lang['keywords'];
const auctionTranslations = lang['auction'];

let inputDate = inputs[0];
let inputTime = inputs[1];

let date = utils.time.checkDate(inputDate);
let time = utils.time.checkTime(inputTime, 2);

const time_info = `${auctionTranslations['time']} ${time['isValid'] ? translationKeywords['valid'] : translationKeywords['invalid']}`;
const date_info = `${auctionTranslations['date']} ${date['isValid'] ? translationKeywords['valid'] : translationKeywords['invalid']}`;

let scheduled_time = (new Date(date['standardDate'] + " " + time['standardTime'])).getTime();
let cur_time = Date.now();
let diff =  parseInt((scheduled_time - cur_time)/1000)

let lot_number = auction.lot.getLotsCount();

if (inputs.length !== 2 || message.length > 15 || diff < 1) {
   Bot.sendMessage(auctionTranslations['datetimeWrong']);
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
