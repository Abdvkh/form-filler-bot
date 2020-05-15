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

questionary.addAnswer('payment', message);
if (message == 'Карта') {
   Bot.sendMessage(questions['card']['text']);
   Bot.runCommand('getCard');
}
Bot.sendMessage(lang['completed']);
questionary.sendForm();
