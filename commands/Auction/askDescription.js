/*CMD
  command: askDescription
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Введите описание аукциона
  keyboard: Главное меню
  aliases:
CMD*/

auction.setCurrentAuction('description', message);
Bot.runCommand('askPicture');
