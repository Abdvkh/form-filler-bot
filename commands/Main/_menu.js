/*CMD
  command: /menu
  help:
  need_reply:
  auto_retry_time:
  folder:
  answer: 🎉 Бинго! У тебя получилось! Тепер ты в главном меню – лови пятюню. 🖐🏻\n\nХочешь получить свой бокс? Тыкай – «заполнить форму».\n\nЖелаешь перетереть по всяким мясным вопросам? Жми «помощь».
  keyboard:📝Заполнить форму, 🔖Помощь
  aliases: asosiy menyu, 🔝Главное меню, main menu,  главное меню, меню, /start
CMD*/

const { mainmenu, fillForm, help } = lang['buttons'];

Bot.sendInlineKeyboard(
   [
      {title: fillForm, command: 'getBox'},
      {title: help, command: '/help'},
   ],
   mainmenu
);
