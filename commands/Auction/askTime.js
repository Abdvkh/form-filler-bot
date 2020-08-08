/*CMD
  command: askTitle
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 2. Введите заголовок лота
  keyboard: Главное меню, Идентификатор
  aliases: Заголовок
CMD*/

auction.setCurrentLot('time', message);

Bot.run({
   command: 'askConfirmation',
});
