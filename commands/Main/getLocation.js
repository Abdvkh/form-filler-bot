/*CMD
  command: getLocation
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

let locations = questionary.getLocations();

setAsPreviousCommand();
if (message in locations) {
   questionary.addAnswer('location', message);
   return askPhone();
}
askMail();

function askPhone() {
   let command = {
      cmd: 'getPhone',
      txt: questions['phone']['text'],
      btns: utils.makeKeyboard([],'bm')
   };
   utils.runCommandWithKeyboard(command);
}

function askMail() {
   let command = {
      cmd: 'getMail',
      txt: questions['mail']['text'],
      btns: utils.makeKeyboard([],'bm')
   };
   utils.runCommandWithKeyboard(command);
}

function setAsPreviousCommand(){
   let previousCommand = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['location']['text'],
      cmd:'getLocation'
   }
   utils.savePreviousCommand(previousCommand);
}
