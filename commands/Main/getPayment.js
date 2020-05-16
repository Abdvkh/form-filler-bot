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
acceptTypeAndAskDetailsOrComplete();


function acceptTypeAndAskDetailsOrComplete() {
   if (message == questions['payment']['keyboard'][1]) {//card
      questionary.addAnswer('payment', message);
      return askDetails();
   } else if (message == questions['payment']['keyboard'][0]) {//naoljniy
      questionary.addAnswer('payment', message);
      return complete();
   }
   utils.onWrongInputRun('getPayment');
}

function setAsPreviousCommand(){
   let previousCommand = {
      btns: utils.makeKeyboard(questions['payment']['keyboard'], 'bm'),
      txt: questions['payment']['text'],
      cmd:'getPayment'
   };
   utils.savePreviousCommand(previousCommand);
}

function askDetails() {
   let command = {
      cmd: 'getCard',
      txt: questions['card']['text'],
      btns: utils.makeKeyboard([], 'bm')
   };
   utils.runCommandWithKeyboard(command);
}

function complete() {
   questionary.sendForm();
   Bot.runCommand('/menu')
}
