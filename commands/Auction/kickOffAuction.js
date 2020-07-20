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

Bot.clearRunAfter({label: 'start_gif'});
let group = Bot.getProperty('chat');
let admin = Bot.getProperty('admin');
auction.kickOffTo(group);
auction.kickOffTo(admin);
Bot.sendMessage('Sent');
