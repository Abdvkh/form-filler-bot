/*CMD
  command: askLotID
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Lot
  answer: 
  keyboard: 
  aliases: 
CMD*/

const { title } = lang['lot'];
const { insert } = lang['phrases'];

auction.lot.setLotProp('id', message, 'creating');
auction.lot.setLotProp('status', 'active', 'creating');

utils.runCommandWithKeyboard({
   cmd: 'askTitle',
   btns: [],
   txt: insert + '\n' + title
}, 'm');
