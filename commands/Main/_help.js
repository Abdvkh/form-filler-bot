/*CMD
  command: /help
  help:
  need_reply:
  auto_retry_time:
  folder:
  answer:
  keyboard:
  aliases: 🔖Помощь
CMD*/

const { help } = lang;
const options = { disable_web_page_preview: true};
Bot.sendMessage(help, options);
