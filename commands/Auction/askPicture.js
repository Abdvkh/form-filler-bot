/*CMD
  command: askPicture
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Введите описание аукциона
  keyboard: Главное меню
  aliases:
CMD*/

auction.setCurrentAuction('picture', message);
Bot.runCommand('askConfirmation');
