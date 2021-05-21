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

setAsPreviousCommand();
acceptPriceAndAskLocation();


function acceptPriceAndAskLocation() {
   const price = parseInt(message);
   if (!isNaN(price)) {
      questionary.addAnswer('price', message);
      return askLocation();
   }
   utils.onWrongInputRun('getPrice');
}

function setAsPreviousCommand(){
   let previousCommand = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['price']['text'],
      cmd:'getPrice'
   }
   utils.savePreviousCommand(previousCommand);
}

function askLocation() {
   let locations = questionary.getLocations();
   let command = {
      cmd: 'getLocation',
      txt: questions['location']['text'],
      btns: utils.makeKeyboard(locations, 'bm')
   };
   utils.runCommandWithKeyboard(command);
}
