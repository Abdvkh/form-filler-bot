/*CMD
  command: /setChat
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Отправьте Telegram ID чата
  keyboard: 
  aliases: 
CMD*/

Bot.setProperty('chat', message, 'Number');
Bot.sendMessage('Chat id['+message+'] is set');
