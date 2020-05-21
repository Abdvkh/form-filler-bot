let admin = Bot.getProperty('admin');

Bot.sendMessageToChatWithId(admin, 'Error with:\n\n' + inspect(options));
