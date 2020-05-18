/*CMD
  command: /admin
  help:
  need_reply: true
  auto_retry_time:
  folder:
  answer: Отправьте пароль админки
  keyboard:
  aliases:
CMD*/

let password = Bot.getProperty('password');

if (message == password) {
   Bot.setProperty('admin', user.telegramid, 'Number');
   let keyboard = utils.makeKeyboard([wordsLikeButton.stat],'m');
   Bot.sendKeyboard(keyboard, lang['new_admin']);
}
