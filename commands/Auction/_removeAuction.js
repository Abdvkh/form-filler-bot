/*CMD
  command: /removeAuction
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: 🆔Введите идентификатор аукциона
  keyboard: Главное меню
  aliases:
CMD*/

Bot.run({
    command: 'removeAuction',
    options: {
        auctionID: message
    }
});
