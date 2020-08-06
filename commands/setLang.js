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
   aucOver: 'Три!\n🎊Аукцион закончился, победитель: ',
   enterBetAmount: 'Пожалуйста введите свою ставку',
   new_admin: '🎊 Поздравляем, теперь вы являетесь админом!\nВсе заполненные формы будут отправляться вам!\n\nДоступные команды на кнопках',
   bet: {
      multiple: "Ставка должна быть кратной 5",
      already_made: "Ваша ставка меньше которая уже предложено",
      wrong: "Вы набрали не верное значение",
      positive_above_cur: "Ставка должна быть положительной и больше предыдущей"
   },
   buttons: {
      back: "🔙Назад",
      mainmenu: "🔝Главное меню",
      stat: "📊Статистика"
   },
   template: {
      box: "📦 *Бокс*:   ",
      price: "💰 *Цена*:   ",
      location: "📍 *Местоположение*:   ",
      delivery: "🚩 *Тип адреса*:   ",
      branch: "📮 *Отделение почты*:   ",
      address: "📫 *Адрес*:   ",
      phone: "📞 *Номер телефона*:   ",
      fullname: "ℹ️ *ФИО получателя*:   ",
      payment: "💸 *Тип оплаты*:   ",
      card: "🧾 *Реквизиты карты*:   ",
      confirmation: "✅ *Подтверждение оплаты*:   "
   },
   stats: {
      recieved: '📥 _Получено запросов_:  ',
      accepted: '☑️ _Принято_:  ',
      refused: '🔘 _Отказано_:  ',
      total: '👥 _Общее кол-во_:  ',
      groups:'🗣 _Группы_:  ',
      users:'👤 _Пользователи_:  ',
      super_groups:'🗣 _Супер-группы_:  ',
      active_day:'🏃‍♂️ _Активные в течении последнего дня_:  ',
      active_week:'🚶‍♂️ _Активные в течении последней недели_:  '
   },
   help: '✔️ *Доступные команды*: \n\n🔹 /menu - главное меню\n\n🏷 Бот [разработан](t.me/Abduvakhidov) для https://t.me/ytkaauction',
   greet: "Добро пожаловать %s!",
   mainMenuButtons: ["📝Заполнить форму", "🔖Помощь"],
   info_accepted: "Ваши данные получены: *%s*",
   req_confirmed: "✅ Ваша заявка была *одобрена* и опубликована! Спасибо!",
   req_denied: "❌ Ваша заявка была *откланена* из-за несоответствия! Извините!",
   completed: "🔄 Данные приняты! Cпасибо!",
   wrongInput: "🔸 Неправильная команда, попробуйте еще раз!"
};

Libs.Lang.setup("ru", ruLang);

Bot.setProperty(
   'betKeyboard',
   {
      inline_keyboard: [
         [
            { text: 'Другая ставка', switch_inline_query_current_chat: 'Ваша ставка: ' },
            { text: 'Повысить на 5', callback_data: 'bet 5' },
         ],
      ],
   },
   'JSON');

Bot.sendMessage("Languages are successfully set!");
