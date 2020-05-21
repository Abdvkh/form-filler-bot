/*CMD
  command: onsuccess
  help:
  need_reply:
  auto_retry_time:
  answer:
  keyboard:
  aliases:
CMD*/

let admin = Bot.getProperty('admin');

Api.sendMessage({
   chat_id: admin,
   text: 'Successfully added:\n\n' + inspect(options)
});
