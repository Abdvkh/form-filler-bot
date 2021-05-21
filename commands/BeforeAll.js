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

const lang = Libs.Lang.get();
const questionary = Libs.Questionary;
const auction = Libs.Auction;
const utils = Libs.Utils;
const questions = questionary.getQuestions();
const wordsLikeButton = lang.buttons;

if (chat && (chat.chat_type === 'private')) {
   if ([wordsLikeButton.mainmenu, '/start'].includes(message)) {
      return Bot.runCommand('/menu');
   }

   if (message === wordsLikeButton.back && !([wordsLikeButton.mainmenu, '/start'].includes(message))) {
      const previousCommand = utils.getPreviousCommand();
      const commandToRun = {
         cmd: previousCommand.cmd,
         txt: previousCommand.txt,
         btns: previousCommand.btns
      };
      return utils.runCommandWithKeyboard(commandToRun);
   }

   if (message === lang.mainMenuButtons[0]) {
      return startFilling();
   }
}


function startFilling() {
   const command = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['box']['text'],
      cmd: 'getBox'
   }
   utils.runCommandWithKeyboard(command);
}
