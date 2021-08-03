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
   let video_file_id, picture_file_id;

   if (request.video.file_id) {
      video_file_id = request.video.file_id;
   } else {
      picture_file_id = request.photo[1]['file_id'];
   }
   auction.setCreatingAucProp('takeVideo', video_file_id);
   auction.setCreatingAucProp('takePicture', picture_file_id);

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
