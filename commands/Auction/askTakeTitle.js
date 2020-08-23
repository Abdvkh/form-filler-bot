/*CMD
  command: askTakeTitle
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 7. Введите заголовок "Беру" лота
  keyboard: Главное меню, Время
  aliases: Заголовок Беру
CMD*/


auction.lot.setCurLot('take_title', message);

Bot.run({
   command: 'askTakePicture',
});
