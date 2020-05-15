/*CMD
  command: getPrice
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('price', message);
Bot.sendMessage(questions['price']['text']);
Bot.runCommand('getLocation');
