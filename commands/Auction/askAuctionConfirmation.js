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

const { save, not } = lang['auction'];
const creatingAuction = auction.getAuction('creating');


if (message === save) {
    auction.addAuction(creatingAuction);

    const { id: auctionID } = creatingAuction;
    const seconds = getAuctionStartingTimeSeconds(creatingAuction);

    //when someone will be creating auction in the same time as auction is being run, then idle logic will be broken
    Bot.setProperty('currentAuctionIsIdle', true, 'Boolean');

    Bot.run({
        command: 'startAuction ' + auctionID,
        label: 'startAuction' + auctionID,
        run_after: seconds
    });
    Bot.run({command: '/showAuctions'});
} else {
    Bot.sendMessage(not.saved);
}


function getAuctionStartingTimeSeconds(creatingAuction) {
    const inputParts = creatingAuction['datetime'].split(' ');

    const [inputDate, inputTime] = inputParts;

    const { standardDate } = utils.time.checkDate(inputDate);
    const { standardTime } = utils.time.checkTime(inputTime,2);

    const scheduledTime = (new Date(standardDate + " " + standardTime)).getTime();
    const currentTime = Date.now();

    return (scheduledTime - currentTime) / 1000;
}
