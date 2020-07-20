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

let sentGifIndex = parseInt(Bot.getProperty('sentGifIndex')) + 1;
if (sentGifIndex >=5) {
   Bot.clearRunAfter({
      label: 'start_gif',
   });
   Bot.setProperty('sentGifIndex', '0', 'String');
   return Bot.runCommand('kickOffAuction');
}

let group = Bot.getProperty('chat');
let gifs = Bot.getProperty('gifs');

Bot.setProperty('sentGifIndex', sentGifIndex.toString(), 'String');
Api.sendDocument({
   chat_id: group,
   document: gifs.file_ids[sentGifIndex]
});

Bot.run({
   command: 'sendBeforeStartGif',
   run_after: 10,
   label: 'start_gif'
});
