/*CMD
  command: getAddress
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

if (message.length >= questions['address']['min_length']) {
   questionary.addAnswer('address', message);
   setAsPreviousCommand();
   return askPhone();
}
utils.onWrongInputRun('getAddress');


function askPhone(){
   let command = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['phone']['text'],
      cmd:'getPhone'
   }
   utils.runCommandWithKeyboard(command);
}

function setAsPreviousCommand() {
   let previousCommand = {
      cmd: 'getAddress',
      txt: questions['address']['text'],
      btns: utils.makeKeyboard([],'bm')
   };
   utils.savePreviousCommand(previousCommand);
}
