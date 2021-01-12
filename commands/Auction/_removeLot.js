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

const lotRemovingStatus = parseInt(auction.lot.removeLot(params);

if (lotRemovingStatus === 400)
    Bot.sendMessage('❌ Такого лота не существует или не удалён по некоторым причинам');
else if (lotRemovingStatus === 200)
    Bot.sendMessage('✅ Лот успешно удалён');
else
    Bot.sendMessage('🤔Что-то пошло не так');
