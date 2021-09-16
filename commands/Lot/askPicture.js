/*CMD
  command: askPicture
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Lot
  answer: 
  keyboard: 
  aliases: 
CMD*/

const { picture,  } = lang['lot'];
const { save, confirm } = lang['keywords'];

if (request.video || request.photo.length > 0) {
   let video_file_id, picture_file_id;

   if (request.video && request.video.file_id) {
      video_file_id = request.video.file_id;
   } else {
      picture_file_id = request.photo[1]['file_id'];
   }

   auction.lot.setLotProp('video', video_file_id);
   auction.lot.setLotProp('picture', picture_file_id);

   utils.runCommandWithKeyboard({
      cmd: 'askLotConfirmation',
      btns: [save],
      txt: confirm + ' лот'
   }, 'm');
} else {
   Api.sendMessage({text: send + '\n' + picture});
   Bot.run({command: 'askPicture'});
}
