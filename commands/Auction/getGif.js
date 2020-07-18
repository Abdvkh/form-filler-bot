/*CMD
  command: getGif
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Please send the gif
  keyboard: Главное меню
  aliases:
CMD*/

let gifs = Bot.getProperty('gifs');
if (gifs==undefined) {
   gifs = {file_ids: []};
   Bot.setProperty('gifs', gifs, 'JSON');
}

let file_id = request.document.file_id;
if (file_id) {
   gifs.file_ids.push(file_id);
   Bot.setProperty('gifs', gifs, 'JSON');
   Bot.sendMessage(file_id + ' this id is stored under ' + gifs.file_ids.length + ' position');
}
