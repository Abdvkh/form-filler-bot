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
   let group = Bot.getProperty('chat');
   let gifs = Bot.getProperty('gifs');

   Api.sendDocument({
      chat_id: group,
      document: gifs.file_ids[0]
   });
   Bot.run({
      command: 'kickOffAuction',
      run_after: 10,
      label: 'auction_start'
   });
} else if (message == 'Заполнить заново') {
   Bot.runCommand('/startAuction');
}
