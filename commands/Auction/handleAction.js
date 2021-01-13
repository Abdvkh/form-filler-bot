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
    addLots: askLotID,
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

function askLotID(){
    const { auctions } = lang['auction'];
    const { id } = lang['lot'];
    const { insert } = lang['phrases'];

    Bot.sendKeyboard(utils.makeKeyboard([auctions], 'm'), `${insert}\n${id}`);
}

function startAuction() {

}

function stopAuction() {

}

function removeAuction() {

}

function changeAuction() {

}
