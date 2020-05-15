/*CMD
  command: /start
  help:
  need_reply: true
  auto_retry_time:
  folder: Main
  answer: 🇷🇺Выберите язык | 🇺🇿Til tanlang
  keyboard: 🇷🇺Русский, 🇺🇿O'zbekcha
  aliases:
CMD*/

questionary.user.setup();

function setLangAndRunMenu(code){
   Libs.Lang.user.setLang(code);
   let msg = utils.json.stringTemplateParser(lang.greet, user)
   Bot.runCommand("/menu");
}

setLangAndRunMenu('ru')
