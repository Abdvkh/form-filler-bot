/*CMD
  command: askDescription
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Lot
  answer: 
  keyboard: 
  aliases: 
CMD*/

const { startingPrice, description } = lang['lot'];
const { insert } = lang['phrases'];

auction.lot.setLotProp('description', message, 'creating');

utils.runCommandWithKeyboard({
   cmd: 'askStartingPrice',
   btns: [],
   txt: insert + '\n' + startingPrice
}, 'm');
