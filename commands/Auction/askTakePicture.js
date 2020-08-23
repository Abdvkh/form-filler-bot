/*CMD
  command: askTakePicture
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 8. Отправьте картинку "Беру"
  keyboard: Главное меню
  aliases: Картинка Беру
CMD*/


auction.lot.setCurLot('take_picture', message);

Bot.run({
   command: 'askConfirmation',
});
