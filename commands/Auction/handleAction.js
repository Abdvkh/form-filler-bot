/*CMD
  command: handleAction
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases:
CMD*/

let command;
const chosenAction = message;
const { actions } = lang['auction'];

const callbacks = {
    addLots: () => {
        const { auctions } = lang['auction'];
        const { id } = lang['lot'];
        const { insert } = lang['phrases'];
        const keyboard = utils.makeKeyboard([auctions], 'm');

        Bot.sendKeyboard(keyboard, `${insert}\n${id}`);
    },
    startAuction: startAuction,
    stopAuction: stopAuction,
    removeAuction: removeAuction,
    changeAuction: changeAuction,
};
// addLots: "➕Добавить лот",
// startAuction: "🏁Начать аукцион",
// stopAuction: "⛔️Остановить аукцион",
// removeAuction: "🗑Удалить аукцион",
// changeAuction: "🔧Изменить аукцион",


for(let action in actions){
    if (actions[action] === chosenAction){
        command = action;
        break;
    }
}

callbacks[command]();

Bot.run({
    command: command + ' ' + options['auctionID']
});
