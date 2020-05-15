/*CMD
  command: /start
  help:
  need_reply:
  auto_retry_time:
  folder: Main
  answer:
  keyboard:
  aliases:
CMD*/

questionary.user.setup();

function setLangAndRunMenu(code){
   Libs.Lang.user.setLang(code);
   Bot.runCommand("/menu");
}

setLangAndRunMenu('ru')
