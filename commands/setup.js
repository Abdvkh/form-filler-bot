/*CMD
  command: setup
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

Bot.setProperty('admin', 469750202, 'Number');
Bot.sendMessage('Admin is set!');

Bot.setProperty('chat', -452881995, 'Number');
Bot.sendMessage('chat is set!');

Libs.GoogleSpreadSheet.setUrl('https://script.google.com/macros/s/AKfycbyl1Xf65rP-LbBJ6dtkDPFSSXEMDUhQjzyV84RCNlAPuelf_5E/exec');
Bot.sendMessage('SpreadSheet is set!');
