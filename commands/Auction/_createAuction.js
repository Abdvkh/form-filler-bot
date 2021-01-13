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

const auctionQuestionsTranslations = lang['auction']['questions'];

Api.sendMessage({
   text: `${auctionQuestionsTranslations['id']['phrase']}`
});

Bot.run({command: 'askAuctionID'});