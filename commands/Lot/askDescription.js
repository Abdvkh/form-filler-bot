/*CMD
  command: askDescription
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer:
  keyboard:
  aliases: ℹ️Описание
CMD*/

const { startingPrice, description } = lang['lot'];
const { insert } = lang['phrases'];

auction.lot.setLotProp('description', message, type='creating');

utils.runCommandWithKeyboard({
   cmd: 'askStartingPrice',
   btns: [description],
   txt: insert + '\n' + startingPrice
});
