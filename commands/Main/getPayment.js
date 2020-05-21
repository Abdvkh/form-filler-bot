/*CMD
  command: getPayment
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

setAsPreviousCommand();
acceptTypeAndComplete();


function acceptTypeAndComplete() {
   if (questions['payment']['keyboard'].includes(message)) {
      questionary.addAnswer('payment', message);
      questionary.sendForm();
      return askConfirmation();
   }
   utils.onWrongInputRun('getPayment');
}

function askConfirmation() {
   let command = {
      cmd: 'getConfirmation',
      txt: questions['confirmation']['text'],
      btns: utils.makeKeyboard(questions['confirmation']['keyboard'],'bm')
   };
   utils.runCommandWithKeyboard(command);
}

function setAsPreviousCommand(){
   let previousCommand = {
      btns: utils.makeKeyboard(questions['payment']['keyboard'], 'bm'),
      txt: questions['payment']['text'],
      cmd:'getPayment'
   };
   utils.savePreviousCommand(previousCommand);
}

function askDetails() {//when asking card details required can be used
   let command = {
      cmd: 'getCard',
      txt: questions['card']['text'],
      btns: utils.makeKeyboard([], 'bm')
   };
   utils.runCommandWithKeyboard(command);
}
