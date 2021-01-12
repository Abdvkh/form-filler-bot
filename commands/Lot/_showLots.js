/*CMD
  command: /showLots
  help:
  need_reply:
  auto_retry_time:
  folder: Lot
  answer:
  keyboard: Главное меню
  aliases: Лоты
CMD*/

const lotTranslations = lang['lot'];
const lots = auction.getLots();
let msg;

if (lots.length > 0) {
    msg = lotTranslations['count'].replace('{lots_length}', lots.length) + ":\n\n";

   lots.sort((a, b) => new Date(a.time) - new Date(a.time))
       .forEach(lot => {
          msg += `\n${lotTranslations['id']}: ${lot.id}`
               + `\n${lotTranslations['title']}: ${lot.title}`
               + `\n${lotTranslations['description']}: ${lot.description}`
               + `\n${lotTranslations['startingPrice']}: ${lot.startingPrice}`
               + `\n${lotTranslations['takeTitle']}: ${lot.takeTitle}\n\n`;
       });
} else {
   msg = lotTranslations['noLots'];
}
Bot.sendMessage(msg);
