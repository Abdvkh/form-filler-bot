/*CMD
  command: getFullname
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Main
  answer: 
  keyboard: 
  aliases: 
CMD*/

if (message.length >= questions['fullname']['min_length'] && message.split(' ').length >= 2) {
   questionary.addAnswer('fullname', message);
   setAsPreviousCommand();
   return askPayment();
}
utils.onWrongInputRun('getFullname');


function askPayment(){
   let command = {
      btns: utils.makeKeyboard(questions['payment']['keyboard'], 'bm'),
      txt: questions['payment']['text'],
      cmd:'getPayment'
   }
   utils.runCommandWithKeyboard(command);
}

function setAsPreviousCommand() {
   let previousCommand = {
      cmd: 'getFullname',
      txt: questions['fullname']['text'],
      btns: utils.makeKeyboard([],'bm')
   };
   utils.savePreviousCommand(previousCommand);
}
