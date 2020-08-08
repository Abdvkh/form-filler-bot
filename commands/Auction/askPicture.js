/*CMD
  command: askPicture
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 5. Отправьте картинку лота
  keyboard: Главное меню, Начальная цена
  aliases: Картинка
CMD*/

auction.setCurrentLot('picture', request.photo[1]['file_id']);

Bot.run({
   command: 'askTime',
});
