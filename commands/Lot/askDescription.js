/*CMD
  command: askDescription
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer: 3. Введите описание лота
  keyboard: Главное меню, Заголовок
  aliases: Описание
CMD*/

auction.lot.setCurLot('description', message);

Bot.run({
   command: 'askStartingPrice',
});
