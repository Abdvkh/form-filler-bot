/*CMD
  command: setLang
  help:
  need_reply:
  auto_retry_time:
  folder:
  answer:
  keyboard: Установить язык, \nСоздать организацию, \nСтатистика, Главное меню
  aliases: Установить язык
CMD*/

let ruLang = {
   buttons: {
      back: "Назад",
      menu: "Главное меню",
   },
   greet: "Добро пожаловать {{first_name}}!",
   mainMenuButtons: ["Заполнить форму", "Помощь"],
   info_accepted: "Ваши данные получены: *{{message}}*",
   req_confirmed: "Ваша заявка была одобрена и опубликована! Спасибо!",
   req_denied: "Ваша заявка была откланена из-за несоответствия! Спасибо!",
   completed: "Данные приняты! Пожалуйста ждите ответа, спасибо за ответы!"
};

if(true){
   Libs.Lang.setup("ru", ruLang);
   Bot.sendMessage("Languages are successfully set!");
}
