/*CMD
  command: getBranch
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('branch', message);
Bot.sendMessage(questions['phone']['text']);
Bot.runCommand('getPhone');
