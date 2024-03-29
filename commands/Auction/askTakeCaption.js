/*CMD
  command: askTakeCaption
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Auction
  answer: 
  keyboard: 
  aliases: 🥡заголовок беру
CMD*/

auction.setCreatingAucProp('takeCaption', message);
askAuctionTakePicture();


function askAuctionTakePicture(){
   const { takePicture, takeCaption } = lang['auction'];
   const { send } = lang['phrases'];

   const details = {
      txt: `${send}\n${takePicture}`,
      cmd: 'askTakePicture',
      btns: []
   };

   utils.runCommandWithKeyboard(details, 'm');
}
