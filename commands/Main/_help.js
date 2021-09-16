/*CMD
  command: /help
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Main
  answer: 
  keyboard: 
  aliases: 🔖помощь
CMD*/

const { help } = lang;
const options = { disable_web_page_preview: true};
Bot.sendMessage(help, options);
