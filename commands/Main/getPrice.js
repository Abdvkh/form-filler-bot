/*CMD
  command: getPrice
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('price', message);
setAsPreviousCommand();
askLocation();

function askLocation() {
   let locations = questionary.getLocations();
   let command = {
      cmd: 'getLocation',
      txt: questions['location']['text'],
      btns: utils.makeKeyboard(locations, 'bm')
   };
   utils.runCommandWithKeyboard(command);
}

function setAsPreviousCommand(){
   let previousCommand = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['price']['text'],
      cmd:'getPrice'
   }
   utils.savePreviousCommand(previousCommand);
}
