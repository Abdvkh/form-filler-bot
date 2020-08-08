/*CMD
  command: /startAuction
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Начать аукцион
  keyboard: Главное меню
  aliases: Аукцион, Начать аукцион
CMD*/

auction.setCurrentAuction('name', message);
Bot.runCommand('askStartingPrice');
