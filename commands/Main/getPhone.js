/*CMD
  command: getPhone
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('phone', message);
Bot.sendMessage(questions['fullname']['text']);
Bot.runCommand('getFullname');
