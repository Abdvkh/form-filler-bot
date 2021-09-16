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

questionary.addAnswer('location', message);

if (locations.includes(message)) {
   return askAddress();
}
askDelivery();


function askAddress() {
   let command = {
      cmd: 'getAddress',
      txt: questions['address']['text'],
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
   let previousCommand = {
      btns: utils.makeKeyboard(locations, 'bm'),
      txt: questions['location']['text'],
      cmd:'getLocation'
   }
   utils.savePreviousCommand(previousCommand);
}
