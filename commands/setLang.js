/*CMD
  command: setLang
  help:
  need_reply:
  auto_retry_time:
  folder:
  answer:
  keyboard:
  aliases:
CMD*/

let ruLang = {
   buttons: {
      back: "Назад",
      mainmenu: "Главное меню",
   },
   template: {
      box: "Бокс: ",
      price: "Цена: ",
      location: "Местоположение: ",
      delivery: "Тип адреса: ",
      branch: "Отделение почты: ",
      address: "Адрес: ",
      phone: "Номер телефона: ",
      fullname: "ФИО получателя: ",
      payment: "Тип оплаты: ",
      card: "Реквизиты карты: ",
      confirmation: "✅Подтверждение оплаты: "
   },
   greet: "Добро пожаловать %s!",
   mainMenuButtons: ["Заполнить форму", "Помощь"],
   info_accepted: "Ваши данные получены: *%s*",
   req_confirmed: "Ваша заявка была одобрена и опубликована! Спасибо!",
   req_denied: "Ваша заявка была откланена из-за несоответствия! Извините!",
   completed: "Данные приняты! Пожалуйста ждите ответа, спасибо!",
   wrongInput: "Неправильная команда, попробуйте еще раз!"
};

Libs.Lang.setup("ru", ruLang);
Bot.sendMessage("Languages are successfully set!");
