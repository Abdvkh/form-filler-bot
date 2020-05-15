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
   Bot.sendMessage(questions['box']['text']);
   Bot.runCommand('getBox');
}
