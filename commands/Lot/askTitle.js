/*CMD
  command: askTitle
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer:
  keyboard:
  aliases: 📌Заголовок
CMD*/

const { title, description } = lang['lot'];
const { insert } = lang['phrases'];

auction.lot.setLotProp('title', message, 'creating');

utils.runCommandWithKeyboard({
   cmd: 'askDescription',
   btns: [title],
   txt: insert + '\n' + description
}, 'm');
