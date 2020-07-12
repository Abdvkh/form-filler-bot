/*CMD
  command: @
  help:
  need_reply:
  auto_retry_time:
  folder:
  answer:
  keyboard:
  aliases:
CMD*/

let lang = Libs.Lang.get('ru');
let questionary = Libs.Questionary;
let auction = Libs.Auction;
let utils = Libs.Utils;
let questions = questionary.getQuestions();
let wordsLikeButton = lang.buttons;

if ([wordsLikeButton.mainmenu, '/start'].includes(message)) {
   return Bot.runCommand('/menu');
}

if (message == wordsLikeButton.back && !([wordsLikeButton.mainmenu, '/start'].includes(message))) {
   let previousCommand = utils.getPreviousCommand();
   let commandToRun = {
      cmd: previousCommand.cmd,
      txt: previousCommand.txt,
      btns: previousCommand.btns
   };
   return utils.runCommandWithKeyboard(commandToRun);
}

if (message == lang.mainMenuButtons[0]) {
   return startFilling();
}


function startFilling(){
   let command = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['box']['text'],
      cmd:'getBox'
   }
   utils.runCommandWithKeyboard(command);
}
