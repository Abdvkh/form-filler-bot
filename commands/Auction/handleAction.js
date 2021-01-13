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

const chosenAction = message;
const { actions } = lang['auction'];

// addLots: "➕Добавить лот",
// startAuction: "🏁Начать аукцион",
// stopAuction: "⛔️Остановить аукцион",
// removeAuction: "🗑Удалить аукцион",
// changeAuction: "🔧Изменить аукцион",

let command;

for(let action in actions){
    if (actions[action] === chosenAction){
        command = action;
        break;
    }
}

Bot.run({
   command: command,
   options: options,
});
