/*CMD
  command: getBox
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('box', message);
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
      cmd: 'getBox',
      txt: questions['box']['text'],
      btns: utils.makeKeyboard([],'bm')
   };
   utils.savePreviousCommand(previousCommand);
}
