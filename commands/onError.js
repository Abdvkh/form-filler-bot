/*CMD
  command: onError
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
   text: 'Что-то пошло не так во время добавления:\n\n' + inspect(options)
});
