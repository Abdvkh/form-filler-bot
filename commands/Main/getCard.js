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

if (message.length >= questions['card']['min_length']) {
   setAsPreviousCommand();
   questionary.addAnswer('card', message);
   questionary.sendForm();
   return askConfirmation();
}
utils.onWrongInputRun('getCard');


function askConfirmation() {
   let command = {
      cmd: 'getConfirmation',
      txt: questions['confirmation']['text'],
      btns: utils.makeKeyboard(questions['confirmation']['keyboard'],'bm')
   };
   Api.sendMessage({text: lang['requisite']});
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
