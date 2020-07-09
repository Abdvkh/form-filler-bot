/*CMD
  command: askPicture
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Отправьте фотографию лота
  keyboard: Главное меню
  aliases:
CMD*/

auction.setCurrentAuction('picture', request.photo[1]['file_id']);
Bot.runCommand('askConfirmation');
