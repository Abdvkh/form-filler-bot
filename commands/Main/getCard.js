/*CMD
  command: getCard
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

setAsPreviousCommand();
acceptDetailsAndComplete();


function acceptDetailsAndComplete() {
   questionary.addAnswer('card', message);
   complete();
}

function setAsPreviousCommand(){
   let previousCommand = {
      btns: utils.makeKeyboard([], 'bm'),
      txt: questions['card']['text'],
      cmd:'getCard'
   }
   utils.savePreviousCommand(previousCommand);
}

function complete() {
   questionary.sendForm();
   Bot.runCommand('/menu')
}
