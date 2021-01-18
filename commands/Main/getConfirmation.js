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

let data;

if (message === '+') {
   data = '+';
   return getConfirmationAndComplete(data);
} else if (request.photo.length !== 0) {
   const file_id_count = request.photo.length;

   data = request.photo[file_id_count-1]['file_id'];

   return getConfirmationAndComplete(data);
}

utils.onWrongInputRun('getConfirmation');


function getConfirmationAndComplete(data) {
   questionary.addAnswer('confirmation', data);
   setAsPreviousCommand();
   complete();
}

function setAsPreviousCommand(){
   const { text, keyboard } = questions['confirmation'];
   utils.savePreviousCommand({
      btns: utils.makeKeyboard(keyboard, 'bm'),
      txt: text,
      cmd: 'getConfirmation'
   });
}

function complete() {
   questionary.sendForm();
   Bot.runCommand('/menu');
}
