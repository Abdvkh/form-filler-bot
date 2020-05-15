/*CMD
  command: getBox
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('box', message);
Bot.sendMessage(questions['price']['text']);
Bot.runCommand('getPrice');
