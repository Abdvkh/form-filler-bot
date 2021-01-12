/*CMD
  command: askStartingPrice
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer: 4. Введите начальную цену аукциона
  keyboard: Главное меню, Описание
  aliases: Начальная цена
CMD*/

let price = parseInt(message);
auction.lot.setCurLot('startingPrice', price);
auction.lot.setCurLot('betPrice', price);

Bot.run({
   command: 'askPicture',
});
