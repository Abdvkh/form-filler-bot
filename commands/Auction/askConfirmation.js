/*CMD
  command: askConfirmation
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Подтвердите лот
  keyboard: Начать аукцион, Заполнить заново, Главное меню
  aliases:
CMD*/

if (message == 'Начать аукцион') {
   let chat = Bot.getProperty('chat');
   auction.kickOffTo(chat);
   let admin = Bot.getProperty('admin');
   auction.kickOffTo(admin);
   Bot.sendMessage('Sent');
} else if (message == 'Заполнить заново') {
   Bot.runCommand('/startAuction');
}
