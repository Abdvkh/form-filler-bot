/*CMD
  command: /setAdmin
  help:
  need_reply: true
  auto_retry_time:
  folder:
  answer: Отправьте Telegram ID админа
  keyboard:
  aliases:
CMD*/

Bot.setProperty('admin', message, 'Number');
