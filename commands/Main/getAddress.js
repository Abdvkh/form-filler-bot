/*CMD
  command: getAddress
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('address', message);
Bot.sendMessage(questions['phone']['text']);
Bot.runCommand('getPhone');
