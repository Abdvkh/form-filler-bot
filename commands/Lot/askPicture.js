/*CMD
  command: askPicture
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer:
  keyboard:
  aliases: 🖼Картинка
CMD*/

if (request.photo.length > 0) {
   const { picture,  } = lang['lot'];
   const { save, confirm } = lang['keywords'];

   auction.lot.setLotProp('picture', request.photo[1]['file_id'], 'creating');

   utils.runCommandWithKeyboard({
      cmd: 'askLotConfirmation',
      btns: [save, picture],
      txt: confirm + ' лот'
   });

} else {
   Api.sendMessage({text: send + '\n' + picture});
   Bot.run({command: 'askPicture'});
}

