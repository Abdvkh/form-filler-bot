/*CMD
  command: askAuctionConfirmation
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

const { save } = lang['auction'];

if (message === save) {
    const creatingAuction = auction.getAuction('creating');
    const { id: auctionID } = creatingAuction;
    const seconds = getAuctionStartingTimeSeconds(creatingAuction);

    auction.addAuction(creatingAuction);

    Bot.run({
        command: 'startAuction ' + auctionID,
        label: 'startAuction' + auctionID,
        run_after: seconds
    });
    Bot.run({command: '/showAuctions'});
}


function getAuctionStartingTimeSeconds(creatingAuction) {
    const inputParts = creatingAuction['datetime'].split(' ');

    const [inputDate, inputTime] = inputParts;

    const date = utils.time.checkDate(inputDate);
    const time = utils.time.checkTime(inputTime);

    const scheduledTime = (new Date(date['standardDate'] + " " + time['standardTime'])).getTime();
    const currentTime = Date.now();

    return +scheduledTime - (+currentTime) / 1000;
}
