/*CMD
  command: askTitle
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 6. Введите запланированное время лота
  keyboard: Главное меню, Идентификатор
  aliases: Заголовок
CMD*/

auction.setCurrentLot('time', message);

Bot.run({
   command: 'askConfirmation',
});
