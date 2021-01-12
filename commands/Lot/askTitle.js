/*CMD
  command: askTitle
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer: 2. Введите заголовок лота
  keyboard: Главное меню, Идентификатор
  aliases: Заголовок
CMD*/


auction.lot.setCurLot('title', message);

Bot.run({
   command: 'askDescription',
});
