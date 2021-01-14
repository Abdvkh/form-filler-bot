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

const { multiple, already_made, wrong } = lang['bet'];
const bet = parseInt(params.split(' ')[2]);
const curAucPrice = parseInt(auction.getCurBetPrice());

if (!isNaN(bet) && (bet > 0)){
   if (bet % 5 !== 0) {
      return Bot.sendMessage(['multiple']);
   }
   if(bet > curAucPrice) {
      const difference = bet - curAucPrice;

      Bot.runCommand('bet '+difference);
   } else if (bet < curAucPrice){
      Bot.sendMessage(already_made);
   }
} else {
   Bot.sendMessage(wrong);
}
