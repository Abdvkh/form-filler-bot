/*CMD
  command: askTakeCaption
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases: 🥡Заголовок беру
CMD*/

auction.setCreatingAucProp('takeCaption', message);
askAuctionTakePicture();


function askAuctionTakePicture(){
   Bot.run({
      command: 'askTakePicture',
   });
}
