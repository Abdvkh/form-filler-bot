/*CMD
  command: getCard
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.addAnswer('card', message);
Bot.sendMessage(lang['completed']);
Bot.runCommand('sendForm');
