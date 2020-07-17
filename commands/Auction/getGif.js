/*CMD
  command: getBet
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

if (request.document.file_id) {
   let file_id = request.document.file_id;
   gifs.file_ids.push(file_id);
   Bot.sendMessage(file_id + ' this id is stored uder ' + (gifs.file_ids.length - 1) + ' index');
}
