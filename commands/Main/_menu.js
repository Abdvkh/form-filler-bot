/*CMD
  command: /menu
  help: главное меню
  need_reply:
  auto_retry_time:
  folder:
  answer: 🔝Главное меню
  keyboard:📝Заполнить форму, 🔖Помощь
  aliases: asosiy menyu, 🔝Главное меню, main menu,  главное меню, меню, /start
CMD*/

Bot.sendInlineKeyboard(
   [
      {title: '📝Заполнить форму', command: 'getBox'},
      {title: '🔖Помощь', command: '/help'},
   ],
   '🔝Главное меню'
);
