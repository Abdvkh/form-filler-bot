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
if (!isNaN(bet) && bet > 0) {
   Bot.runCommand('bet '+bet);
} else {
   Bot.sendMessage('Вы набрали не верное значение');
}
