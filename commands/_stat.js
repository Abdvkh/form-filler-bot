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

const admin = Bot.getProperty('admin');

if (user.telegramid === admin) {
   const {
      total,
      user_chats_count,
      group_chats_count,
      super_group_chats_count,
      active_during_last_day,
      active_during_last_week
   } = statistics;
   const statistics = lang['stats'];
   const recieved = Bot.getProperty('requestsRecievedCount');
   const accepted = Bot.getProperty('requestsAcceptedCount');
   const refused = Bot.getProperty('requestsDeniedCount');
   const msg = wordsLikeButton.stat + "\n\n\n📑*Запросы*\n\n" +
             statistics['recieved'] + recieved + '\n\n' +
             statistics['accepted'] + accepted + '\n\n' +
             statistics['refused'] + refused + '\n\n\n🐾*Пользователи*\n\n' +
             statistics['total'] + total + '\n\n' +
             statistics['users'] + user_chats_count + '\n\n' +
             statistics['groups'] + group_chats_count + '\n\n' +
             statistics['super_groups'] + super_group_chats_count + '\n\n' +
             statistics['active_day'] + active_during_last_day + '\n\n' +
             statistics['active_week'] + active_during_last_week;
   Bot.sendMessage(msg);
}
