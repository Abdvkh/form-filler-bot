/*CMD
  command: askTitle
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Lot
  answer: 
  keyboard: 
  aliases: 
CMD*/

const { title, description } = lang['lot'];
const { insert } = lang['phrases'];

auction.lot.setLotProp('title', message, 'creating');

utils.runCommandWithKeyboard({
   cmd: 'askDescription',
   btns: [],
   txt: insert + '\n' + description
}, 'm');
