/*CMD
  command: onSuccess
  help:
  need_reply:
  auto_retry_time:
  answer:
  keyboard:
  aliases:
CMD*/

const admin = Bot.getProperty('admin');

Api.sendMessage({
   chat_id: admin,
   text: 'Успешно добавлен:\n\n' + inspect(options)
});
