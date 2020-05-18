/*CMD
  command: /menu
  help: главное меню
  need_reply:
  auto_retry_time:
  folder:
  answer:
  keyboard:
  aliases: asosiy menyu, 🔝Главное меню, main menu
CMD*/

let command = {
   btns: utils.makeKeyboard(lang.mainMenuButtons,''),
   txt: wordsLikeButton.mainmenu,
   cmd: 'getMenuKeyword'
};
utils.runCommandWithKeyboard(command);
