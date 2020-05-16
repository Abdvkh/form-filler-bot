/*CMD
  command: getBranch
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('branch', message);
Bot.sendMessage(questions['phone']['text']);
Bot.runCommand('getPhone');
setAsPreviousCommand();
askPrice();

function askPrice(){
   let command = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['price']['text'],
      cmd:'getPrice'
   }
   utils.runCommandWithKeyboard(command);
}

function setAsPreviousCommand() {
   let previousCommand = {
      cmd: 'getDelivery',
      txt: questions['delivery']['text'],
      btns: utils.makeKeyboard([],'bm')
   };
   utils.savePreviousCommand(previousCommand);
}
