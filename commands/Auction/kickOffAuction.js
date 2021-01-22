/*CMD
  command: kickOffAuction
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

const group = Bot.getProperty('chat');
const admin = Bot.getProperty('admin');

const { sent } = lang['keywords'];
const { id: currentID } = auction.getAuction();

Bot.clearRunAfter({label: 'start_gif'});

auction.launchAuctionAt([admin, group]);

Bot.clearRunAfter({label: 'startAuction' + currentID});
Bot.run({
    command: 'startAuction',
    label: 'startAuction' + currentID,
    run_after: 300,
    options: {
        auctionID: currentID
    }
});

Api.sendMessage({
    chat_id: admin,
    text: sent
});

/** After 5 minutes of idle starts next lot*/
function startNexLotAfter5MinutesOfIdle() {
    const seconds = 60 * 5;
    auction.startNexLot(seconds);
}
