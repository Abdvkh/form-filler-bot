/*CMD
  command: auctionsActions
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases:
CMD*/

const auctionID = message;
const { actions } = lang['auction']
const actionButtons = Object.values(actions);

let lotsDetails = '';

utils.runCommandWithKeyboard({
    cmd: 'handleAction',
    btns: actionsButtons,
    txt: lotsDetails
});
