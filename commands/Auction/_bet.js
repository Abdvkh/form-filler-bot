/*CMD
  command: /bet
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

let bet = parseInt(params.split(' ')[2]);
let curAucPrice = parseInt(auction.getCurBetPrice());
if (!isNaN(bet) && bet > 0){
   if (bet % 5 != 0) {
      return Bot.sendMessage(lang['bet']['multiple']);
   }
   if(bet > curAucPrice) {
      let difference = bet - curAucPrice;
      Bot.runCommand('bet '+bet);
   } else if (bet < curAucPrice){
      Bot.sendMessage(lang['bet']['already_made']);
   }
} else {
   Bot.sendMessage(lang['bet']['wrong']);
}
