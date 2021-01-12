/*CMD
  command: /startAuction
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Введите идентификационный или номер аукциона который был возвращён после заполнения
  keyboard: Главное меню
  aliases: Аукцион, Начать аукцион
CMD*/

let lotsCount = auction.lot.getLotsCount();
let ids = auction.lot.getIDs();
if (message < lotsCount || ids.includes(message)) {
   Bot.run({
      command: 'startAuction ' + message
   })
} else {
   Bot.sendMessage('Такого лота не существует!');
}
