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
   admin_buttons: ['/stat'],
   new_admin: 'Поздравляем, теперь вы являетесь админом! Все заполненные формы будут отправляться вам!\n\nДоступные команды на кнопках',
   buttons: {
      back: "Назад",
      mainmenu: "Главное меню",
      stat: "Статистика"
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
   stats: {
      total: 'Общее кол-во: ',
      groups:'Группы: ',
      users:'Пользователи: ',
      super_groups:'Супер-группы: ',
      active_day:'Активные в течении последнего дня: ',
      active_week:'Активные в течении последней недели: '
   },
   help: 'Доступные команды: \n/menu - главное меню\n\nБот [разработан](t.me/Abduvakhidov) для https://t.me/ytkaauction',
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
