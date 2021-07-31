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
const { takeCaption, takePicture, save, wrongPicture, questions: auctionQuestions } = lang['auction'];

if (request.video.file_id || request.photo.length > 0) {
   const { phrase: confirmationPhrase } = auctionQuestions['confirmation'];

   if (request.video.file_id) {
      auction.setCreatingAucProp('takeVideo', request.video.file_id);
   } else {
      auction.setCreatingAucProp('takePicture', request.photo[1]['file_id']);
   }

   commandDetails = {
      btns: [save],
      txt: confirmationPhrase,
      cmd: 'askAuctionConfirmation'
   };
} else {

   commandDetails = {
      btns: [],
      txt: wrongPicture,
      cmd: 'askTakePicture'
   };
}

utils.runCommandWithKeyboard(commandDetails, 'm');
