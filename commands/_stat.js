/*CMD
  command: /stat
  help:
  need_reply:
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
   let msg = wordsLikeButton.stat + "\n\n\n📑*Запросы*\n\n" +
             st_tr['recieved'] + recieved + '\n\n' +
             st_tr['accepted'] + accepted + '\n\n' +
             st_tr['refused'] + refused + '\n\n\n🐾*Пользователи*\n\n' +
             st_tr['total'] + st['total'] + '\n\n' +
             st_tr['users'] + st['user_chats_count'] + '\n\n' +
             st_tr['groups'] + st['group_chats_count'] + '\n\n' +
             st_tr['super_groups'] + st['super_group_chats_count'] + '\n\n' +
             st_tr['active_day'] + st['active_during_last_day'] + '\n\n' +
             st_tr['active_week'] + st['active_during_last_week'];
   Bot.sendMessage(msg);
}
