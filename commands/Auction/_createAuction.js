/*CMD
  command: /createAuction
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases: Создать аукцион
CMD*/

const { id } = lang['auction']['questions'];

Bot.sendKeyboard(wordsLikeButton.mainmenu, `${id['phrase']}`);

Bot.run({command: 'askAuctionID'});
