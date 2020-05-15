/*CMD
  command: getLocation
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

let locations = questionary.getLocations();

if (message in locations) {
   questionary.addAnswer('location', message);
   Bot.sendMessage(questions['phone']['text']);
   return Bot.runCommand('getPhone');
}
Bot.sendMessage(questions['price']['text']);
