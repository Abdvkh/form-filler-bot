/*CMD
  command: /showLots
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases: Лоты
CMD*/

const lots = auction.getLots();
let msg = 'Нету лотов';
if (lots.length > 0) {
   msg = 'В текущий момент имеется ' + (lots.length + 1) + ' лотов:\n\n';

   lots.sort((a, b) => new Date(a.time) - new Date(a.time))
       .forEach(lot => {
          msg += `\nИдентификатор: ` + lot.id;
          msg += `\nВремя проведения: ` + lot.time;
          msg += `\nНаименование: ` + lot.title;
          msg += `\nОписание: ` + lot.description;
          msg += `\nИдентификатор: ` + lot.startingPrice;
          msg += `\nОписание беру: ` + lot.title;
          msg += '\n\n';
       });
}
Bot.sendMessage(msg);
