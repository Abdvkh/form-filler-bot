/*CMD
  command: /help
  help:
  need_reply: true
  auto_retry_time:
  folder:
  answer:
  keyboard:
  aliases: 🔖Помощь
CMD*/

let options = { disable_web_page_preview: true};
Bot.sendMessage(lang['help'], options);
