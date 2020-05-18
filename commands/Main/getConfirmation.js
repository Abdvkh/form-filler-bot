/*CMD
  command: getConfirmation
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

if (message == '+') {
   data = '+';
   return getConfirmationAndComplete(data);
} else if (request.photo.length != 0) {
   data = request.photo[-1]['file_id'];
   return getConfirmationAndComplete(data);
}
utils.onWrongInputRun('getConfirmation');

function getConfirmationAndComplete(data) {
   questionary.addAnswer('confirmation', data);
   setAsPreviousCommand();
   complete();
}

function setAsPreviousCommand(){
   let previousCommand = {
      btns: utils.makeKeyboard(questions['confirmation']['keyboard'], 'bm'),
      txt: questions['confirmation']['text'],
      cmd:'getConfirmation'
   }
   utils.savePreviousCommand(previousCommand);
}

function complete() {
   questionary.sendForm();
   Bot.runCommand('/menu')
}
