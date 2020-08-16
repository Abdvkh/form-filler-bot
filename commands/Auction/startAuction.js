/*CMD
  command: startAuction
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

auction.lot.removeLot(params);

Bot.setProperty('sentGifIndex', '0', 'String');
Bot.sendMessage('Аукцион начнется через 10 секунд');
Bot.run({
   command: 'sendBeforeStartGif',
   run_after: 10,
   label: 'start_gif',
});
