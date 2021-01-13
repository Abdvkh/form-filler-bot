/*CMD
  command: addLot
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer:
  keyboard:
  aliases: ➕Добавить лот
CMD*/

const auctionID = params || options['auctionID'];

const { addLot } = lang['auction']['actions'];
const { title } = lang['lot'];
const { insert } = lang['phrases'];

auction.setLotProp('id', messagge, type='creating');
auction.setLotProp('auctionID', auctionID, type='creating');

utils.runCommandWithKeyboard({
    cmd: 'askTitle',
    btns: [addLot],
    txt: insert + ' ' + title
})
