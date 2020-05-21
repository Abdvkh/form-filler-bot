/*CMD
  command: onerror
  help:
  need_reply:
  auto_retry_time:
  answer:
  keyboard:
  aliases:
CMD*/

let admin = Bot.getProperty('admin');

Bot.sendMessageToChatWithId(admin, 'Error with:\n\n' + inspect(options));
