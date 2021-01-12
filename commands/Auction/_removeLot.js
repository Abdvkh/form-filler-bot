/*CMD
  command: /removeLot
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases:
CMD*/

if (!params)
    return Bot.sendMessage('❌ Параметры не заданы. Попробуйте `/removeLot идентификатор`');

if (auction.lot.removeLot(params) === '400')
    Bot.sendMessage('❌ Такого лота не существует или не удалён по некоторым причинам');
else if (auction.lot.removeLot(params) === '200')
    Bot.sendMessage('✅ Лот успешно удалён');
else
    Bot.sendMessage('Что-то пошло не так');
