/*CMD
  command: addLot
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer:
  keyboard:
  aliases:
CMD*/

const auctionID = params || options['auctionID'];

const { auctions } = lang['auction'];
const { title } = lang['lot'];
const { insert } = lang['phrases'];

auction.lot.setLotProp('id', message, 'creating');
auction.lot.setLotProp('auctionID', auctionID, 'creating');

utils.runCommandWithKeyboard({
    cmd: 'askTitle',
    btns: [],
    txt: insert + '\n' + title
}, 'm')
