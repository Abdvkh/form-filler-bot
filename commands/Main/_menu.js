/*CMD
  command: /menu
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Main
  answer: 
  keyboard: 
  aliases: asosiy menyu, 🔝главное меню, main menu, главное меню, меню, /start
CMD*/

const { inMainMenu } = lang;
const { fillForm, help } = lang['buttons'];

Bot.sendInlineKeyboard(
   [
      {title: fillForm, command: 'getBox'},
      {title: help, command: '/help'},
   ],
   inMainMenu
);
