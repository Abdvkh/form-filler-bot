let admin = Bot.getProperty('admin');

Api.sendMessage({
   chat_id: admin,
   text: 'Successfully added:\n\n' + inspect(options)
});
