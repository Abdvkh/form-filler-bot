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
let msg = '📭Нету лотов';
if (lots.length > 0) {
   msg = `📬В текущий момент имеется ${lots.length} лотов:\n\n`;

   lots.sort((a, b) => new Date(a.time) - new Date(a.time))
       .forEach(lot => {
          msg += `\n🆔Идентификатор: ` + lot.id;
          msg += `\n🕰Время проведения: ` + lot.time;
          msg += `\n⭕️Наименование: ` + lot.title;
          msg += `\nℹ️Описание: ` + lot.description;
          msg += `\n🏷Начальная цена: ` + lot.startingPrice;
          msg += `\n🥡Описание беру: ` + lot.title;
          msg += '\n\n';
       });
}
Bot.sendMessage(msg);
