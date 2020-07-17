let group = Bot.getProperty('chat');
auction.kickOffTo(group);
let admin = Bot.getProperty('admin');
auction.kickOffTo(admin);
Bot.sendMessage('Sent');
