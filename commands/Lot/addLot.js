/*CMD
  command: addLot
  help:
  need_reply:
  auto_retry_time:
  folder: Lot
  answer:
  keyboard:
  aliases:
CMD*/

const auctionID = params || options['auctionID'];

const { id } = lang['lot'];
const { insert } = lang['phrases'];

auction.lot.setLotProp('auctionID', auctionID, 'creating');

utils.runCommandWithKeyboard({
    cmd: 'askLotID',
    btns: [],
    txt: insert + '\n' + id
}, 'm')
