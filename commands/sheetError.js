let admin = Bot.getProperty('admin');

Bot.sendMessageToChatWithId(admin, 'Error with:\n\n');
Bot.sendMessage(inspect(options));
