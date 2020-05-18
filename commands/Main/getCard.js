/*CMD
  command: getCard
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

setAsPreviousCommand();
questionary.addAnswer('card', message);
questionary.sendForm();
askConfirmation();


function askConfirmation() {
   let command = {
      cmd: 'getConfirmation',
      txt: questions['confirmation']['text'],
      btns: utils.makeKeyboard(questions['confirmation']['keyboard'],'bm')
   };
   utils.runCommandWithKeyboard(command);
}

function setAsPreviousCommand(){
   let previousCommand = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['card']['text'],
      cmd:'getCard'
   }
   utils.savePreviousCommand(previousCommand);
}
