/*CMD
  command: askStartingPrice
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Введите начальную цену аукциона
  keyboard: Главное меню
  aliases:
CMD*/

auction.setCurrentAuction('startingPrice', message);
auction.setCurrentAuction('betPrice', message);
Bot.runCommand('askDescription');
