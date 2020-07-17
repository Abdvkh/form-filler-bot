/*CMD
  command: /startAuction
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Чтобы начать аукцион введите заголовок/номер/идентификатор лота. Чтобы отменить команду нажмите на "Главное меню"
  keyboard: Главное меню
  aliases: Аукцион, Начать аукцион, Заполнить заново
CMD*/

if (message=='Главное меню') {
   Bot.runCommand('/menu');
}
auction.setCurrentAuction('name', message);
Bot.runCommand('askStartingPrice');
