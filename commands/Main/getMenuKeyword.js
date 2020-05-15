/*CMD
  command: getMenuKeyword
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

let passedMenuKeyword = message;

setAsPreviousCommand();

switch (passedMenuKeyword) {
   case lang.mainMenuButtons[0]://Заполнить форму
      startFillingForm();
      break;
   case lang.mainMenuButtons[1]://Помощь
      Bot.runCommand('/help');
      break;
   default:
      utils.onWrongInput('/menu');
}

function askBox(){
   let command = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['box']['text'],
      cmd:'getBox'
   }
   utils.runCommandWithKeyboard(command);
}

function setAsPreviousCommand() {
   let previousCommand = {
      cmd: '/menu',
      txt: wordsLikeButton.mainmenu,
      btns: utils.makeKeyboard(lang.mainMenuButtons, '')
   };
   utils.savePreviousCommand(previousCommand);
}
