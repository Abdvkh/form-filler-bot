/*CMD
  command: askTakePicture
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 8. Отправьте картинку "Беру"
  keyboard: Главное меню, Заголовок Беру
  aliases: Картинка Беру
CMD*/



auction.lot.setCurLot('take_picture', request.photo[1]['file_id']);

Bot.run({
   command: 'askConfirmation',
});
