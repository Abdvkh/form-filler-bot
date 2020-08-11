/*CMD
  command: /startAuction
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Введите идентификационный номер аукциона который был возвращён после заполнения
  keyboard: Главное меню
  aliases: Аукцион, Начать аукцион
CMD*/

if (params) {
   return Bot.sendMessage(JSON.stringify(params));
}

Bot.setProperty('sentGifIndex', '0', 'String');
Bot.sendMessage('Аукцион начнется через 10 секунд');
Bot.run({
   command: 'sendBeforeStartGif',
   run_after: 10,
   label: 'start_gif'
});

auction.setCurrentAuction('name', message);
Bot.runCommand('askStartingPrice');
