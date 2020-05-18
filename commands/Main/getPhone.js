/*CMD
  command: getPhone
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

if (message.length >= questions['phone']['min_length']) {
   setAsPreviousCommand();
   return askFullname();
}
utils.onWrongInputRun('getPhone');


function setAsPreviousCommand(){
   let previousCommand = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['phone']['text'],
      cmd:'getPhone'
   }
   utils.savePreviousCommand(previousCommand);
}

function askFullname() {
   questionary.addAnswer('phone', message);
   let command = {
      cmd: 'getFullname',
      txt: questions['fullname']['text'],
      btns: utils.makeKeyboard([], 'bm')
   };
   utils.runCommandWithKeyboard(command);
}
