/*CMD
  command: sendBeforeStartGif
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

const gifs = Bot.getProperty('gifs');
const sentGifIndex = parseInt(Bot.getProperty('sentGifIndex')) + 1;

if (sentGifIndex >= 5) {
   Bot.clearRunAfter({
      label: 'start_gif',
   });
   Bot.setProperty('sentGifIndex', '0', 'String');
   return Bot.run({command: 'kickOffAuction'});
}
Bot.setProperty('sentGifIndex', sentGifIndex.toString(), 'String');

const group = Bot.getProperty('chat');
Api.sendDocument({
   chat_id: group,
   document: gifs.file_ids[sentGifIndex]
});

Bot.run({
   command: 'sendBeforeStartGif',
   run_after: 10,
   label: 'start_gif'
});
