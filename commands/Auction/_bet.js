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

let bet = params.split(' ')[2];
let curAucPrice = auction.getCurBetPrice();
if (!isNaN(bet) && bet > 0){
   if (bet % 5 != 0) {
      return Bot.sendMessage('Ставка должна быть кратное 5');
   }
   if(bet > curAucPrice) {
      Bot.runCommand('bet '+bet);
   } else if (bet < curAucPrice){
      Bot.sendMessage('Ваша ставка меньше которая уже предложено');
   }
} else {
   Bot.sendMessage('Вы набрали не верное значение');
}
