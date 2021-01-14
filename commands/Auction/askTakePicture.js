/*CMD
  command: askTakePicture
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases: 🖼Картинка беру
CMD*/

let commandDetails;
const { takeCaption, takePicture, save, wrongPicture } = lang['auction'];

if (request.photo.length > 0) {
   const { phrase: confirmationPhrase } = lang['confirmation'];

   auction.setCreatingAucProp('takePicture', request.photo[1]['file_id']);

   commandDetails = {
      btns: [takePicture, save],
      txt: confirmationPhrase,
      cmd: 'askAuctionConfirmation'
   };
} else {

   commandDetails = {
      btns: [takeCaption],
      txt: wrongPicture,
      cmd: 'askTakePicture'
   };
}

utils.runCommandWithKeyboard(commandDetails, 'm');
