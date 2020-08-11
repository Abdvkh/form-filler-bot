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

auction.lot.setCurrentLot('start_price', parseInt(message));

Bot.run({
   command: 'askPicture',
});
