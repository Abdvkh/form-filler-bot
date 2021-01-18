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
    addLot: null,
    startAuction: null,
    stopAuction: null,
    removeAuction: null,
    changeAuction: null,
};
// addLot: "➕Добавить лот",
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

const fn = callbacks[command];
if (typeof fn === 'function')
    fn();

options['manual'] = true;

Bot.run({
    command: command,
    options: options
});
