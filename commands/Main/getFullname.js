/*CMD
  command: getFullname
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('fullname', message);
Bot.sendMessage(questions['payment']['text']);
Bot.runCommand('getPayment');
