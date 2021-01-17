/*CMD
  command: changeAuction
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases:
CMD*/

const auctionID = params || options['auctionID'];
const { id, questions: auctionQuestions } = lang['auction'];

Bot.clearRunAfter({label: 'startAuction' + auctionID});// clear previous schedule of auction
auction.setCreatingAucProp('id', auctionID);

Bot.run({command: 'askAuctionDatetime'});

askAuctionDatetime();

function askAuctionDatetime(){
    const { datetime } = auctionQuestions;

    const details = {
        txt: `${datetime['phrase']} Формат: ${datetime['format']}`,
        cmd: 'askAuctionDatetime',
        btns: [id]
    };

    utils.runCommandWithKeyboard(details, 'm');
}
