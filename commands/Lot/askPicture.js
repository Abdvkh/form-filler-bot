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

if (request.video.file_id || request.photo.length > 0) {
   if (request.video.file_id) {
      auction.lot.setLotProp('video', request.video.file_id, 'creating');
   } else {
      auction.lot.setLotProp('picture', request.photo[1]['file_id'], 'creating');
   }

   utils.runCommandWithKeyboard({
      cmd: 'askLotConfirmation',
      btns: [save],
      txt: confirm + ' лот'
   }, 'm');
} else {
   Api.sendMessage({text: send + '\n' + picture});
   Bot.run({command: 'askPicture'});
}

