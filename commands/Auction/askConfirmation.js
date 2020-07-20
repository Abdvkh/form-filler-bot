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
   Bot.setProperty('sentGifIndex', 0, 'Number');
   Api.sendDocument({
      chat_id: group,
      document: gifs.file_ids[0]
   });
   Bot.clearRunAfter({
      label: 'start_gif',
   });
   Bot.run({
      command: 'sendBeforeStartGif',
      run_after: 10,
      label: 'start_gif'
   });
} else if (message == 'Заполнить заново') {
   Bot.runCommand('/startAuction');
}
