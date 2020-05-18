/*CMD
  command: /stat
  help:
  need_reply: true
  auto_retry_time:
  folder:
  answer: Отправьте пароль админки
  keyboard:
  aliases: 📊Статистика
CMD*/

let admin = Bot.getProperty('admin');

if (user.telegramid == admin) {
   let st = statistics;
   let st_tr = lang['stats'];
   let recieved = Bot.getProperty('requestsRecievedCount');
   let accepted = Bot.getProperty('requestsAcceptedCount');
   let refused = Bot.getProperty('requestsDeniedCount');
   let msg = wordsLikeButton.stat + "\n\n📑Запросы\n" +
             st_tr['recieved'] + recieved + '\n' +
             st_tr['accepted'] + accepted + '\n' +
             st_tr['refused'] + refused + '\n\n🐾Пользователи\n' +
             st_tr['total'] + st['total'] + '\n' +
             st_tr['users'] + st['user_chats_count'] + '\n' +
             st_tr['groups'] + st['group_chats_count'] + '\n' +
             st_tr['super_groups'] + st['super_group_chats_count'] + '\n\n' +
             st_tr['active_day'] + st['active_during_last_day'] + '\n' +
             st_tr['active_week'] + st['active_during_last_week'];
   Bot.sendMessage(msg);
}
