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

const { sent } = lang['keywords'];

const group = Bot.getProperty('chat');
const admin = Bot.getProperty('admin');

Bot.clearRunAfter({label: 'start_gif'});

auction.launchAuctionAt(group);
auction.launchAuctionAt(admin);

Api.sendMessage({
    text: sent
});
