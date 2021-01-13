/*CMD
  command: askStartingPrice
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer:
  keyboard:
  aliases: 🏷Начальная цена
CMD*/

const price = parseInt(message);

const { startingPrice, picture } = lang['lot'];
const { send } = lang['phrases'];

auction.lot.setLotProp('startingPrice', price, type='creating');
auction.lot.setLotProp('betPrice', price, type='creating');

utils.runCommandWithKeyboard({
   cmd: 'askPicture',
   btns: [startingPrice],
   txt: send + '\n' + picture
});
