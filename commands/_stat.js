let admin = Bot.getProperty('admin');

if (user.telegramid == admin) {
   let st = statistics;
   let st_tr = lang['stats'];
   let msg = wordsLikeButton.stat + ": \n\n" +
             st_tr['total'] + st['total'] + '\n' +
             st_tr['groups'] + st['group_chats_count'] + '\n' +
             st_tr['users'] + st['user_chats_count'] + '\n' +
             st_tr['super_groups'] + st['super_group_chats_count'] + '\n' +
             st_tr['active_day'] + st['active_during_last_day'] + '\n' +
             st_tr['active_week'] + st['active_during_last_week'];
   Bot.sendMessage(msg);
}
