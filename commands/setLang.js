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
      vacancy: "Вакансия",
      resume: "Резюме"
   },
   chooseChannel: "Выберите канал куда собираетесь сделать пост",
   greet: "Добро пожаловать {{first_name}}!",
   mainMenuButtons: ["Заполнить форму", "Помощь"],
   info_accepted: "Ваши данные получены: *{{message}}*",
   where: "В каком канале вы собираетесь опубликовать пост?",
   which_category: "Выберите какой тип поста вы хотите оставить",
   req_confirmed: "Ваша заявка была одобрена и опубликована! Спасибо!",
   req_denied: "Ваша заявка была откланена из-за несоответствия! Спасибо!",
   questionaryCompleted: "Данные приняты! Пожалуйста ждите ответа, спасибо за ответы!"
};

if(true){
   Libs.Lang.setup("ru", ruLang);
   Bot.sendMessage("Languages are successfully set!");
}
