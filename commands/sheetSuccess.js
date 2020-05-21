let admin = Bot.getProperty('admin');

Bot.sendMessageToChatWithId(admin, 'Successfully added:\n\n');
Bot.sendMessage(inspect(options));
