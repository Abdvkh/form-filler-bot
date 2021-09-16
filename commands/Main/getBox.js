/*CMD
  command: getBox
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Main

  <<ANSWER
Отлично. Теперь Вам придется немного поработать ручками. Начнем.
📦 Напишите номер бокса, который Вы выиграли?

_Например: 125_
  ANSWER
  keyboard: 
  aliases: 📝заполнить форму
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
