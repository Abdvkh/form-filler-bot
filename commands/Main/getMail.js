/*CMD
  command: getMail
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('mail', message);
Bot.sendMessage(questions['phone']['text']);
Bot.runCommand('phone');
