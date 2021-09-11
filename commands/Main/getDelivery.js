/*CMD
  command: getDelivery
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Main
  answer: 
  keyboard: 
  aliases: 
CMD*/

switch (message) {
   case questions['delivery']['keyboard'][0]://branch
      next('branch');
      break;
   case questions['delivery']['keyboard'][1]://address
      next('address');
      break;
   default:
      utils.onWrongInputRun('getDelivery');
}

function next(type) {
   questionary.addAnswer('delivery', message);
   setAsPreviousCommand();
   if (type == 'branch') { return askBranch(); }
   askAddress();
}

function askBranch() {
   let command = {
      cmd: 'getBranch',
      txt: questions['branch']['text'],
      btns: utils.makeKeyboard([],'bm')
   };
   utils.runCommandWithKeyboard(command);
}

function askAddress() {
   let command = {
      cmd: 'getAddress',
      txt: questions['address']['text'],
      btns: utils.makeKeyboard([],'bm')
   };
   utils.runCommandWithKeyboard(command);
}

function setAsPreviousCommand(){
   let previousCommand = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['delivery']['text'],
      cmd:'getDelivery'
   }
   utils.savePreviousCommand(previousCommand);
}
