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

setAsPreviousCommand();

if (locations.includes(message)) {
   questionary.addAnswer('location', message);
   return askPhone();
}
askDelivery();


function askPhone() {
   let command = {
      cmd: 'getPhone',
      txt: questions['phone']['text'],
      btns: utils.makeKeyboard([],'bm')
   };
   utils.runCommandWithKeyboard(command);
}

function askDelivery() {
   let command = {
      cmd: 'getDelivery',
      txt: questions['delivery']['text'],
      btns: utils.makeKeyboard(questions['delivery']['keyboard'],'bm')
   };
   utils.runCommandWithKeyboard(command);
}

function setAsPreviousCommand(){
   let locations = questionary.getLocations();
   let previousCommand = {
      btns: utils.makeKeyboard(locations, 'bm'),
      txt: questions['location']['text'],
      cmd:'getLocation'
   }
   utils.savePreviousCommand(previousCommand);
}
