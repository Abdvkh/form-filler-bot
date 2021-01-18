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
   const { text, keyboard } = questions['confirmation'];

   utils.runCommandWithKeyboard({
      btns: utils.makeKeyboard(keyboard, 'bm'),
      txt: text,
      cmd: 'getConfirmation'
   });
}

function setAsPreviousCommand(){
   const { text, keyboard } = questions['payment'];

   utils.savePreviousCommand({
      btns: utils.makeKeyboard(keyboard, 'bm'),
      txt: text
      cmd: 'getPayment'
   });
}

function askDetails() {//when asking card details required can be used
   let command = {
      cmd: 'getCard',
      txt: questions['card']['text'],
      btns: utils.makeKeyboard([], 'bm')
   };
   utils.runCommandWithKeyboard(command);
}
