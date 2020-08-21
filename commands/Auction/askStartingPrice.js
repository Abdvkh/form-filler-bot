/*CMD
  command: askStartingPrice
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 4. Введите начальную цену аукциона
  keyboard: Главное меню, Описание
  aliases: Начальная цена
CMD*/

auction.lot.setCurLot('startingPrice', parseInt(message));
auction.lot.setCurLot('betPrice', 0);

Bot.run({
   command: 'askPicture',
});
