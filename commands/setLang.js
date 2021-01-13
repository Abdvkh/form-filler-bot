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
   aucOver: 'Три!\n🎊Лот продан, победитель: ',
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
   auction: {
      id: "🆔Идентификатор аукциона",
      date: "🗓Дата проведения",
      time: "🕰Время проведения",
      takeCaption: "🥡Заголовок беру",
      takePicture: "🖼Картинка беру",
      save: "✅Сохранить аукцион",
      datetimeWrong: '🚫Пожалуйста введите дату в данном формате "дд/мм/гг ЧЧ:ММ"'
                   + ' пробел между датой(дд/мм/гг) и временем(ЧЧ:ММ) обязателен.\n'
                   + 'Попробуйте ещё раз пожалуйста!',
      count: "📬Количество лотов в текущий момент - {auctions_length}",
      actions: {
         addLots: "➕Добавить лот",
         startAuction: "🏁Начать аукцион",
         stopAuction: "⛔️Остановить аукцион",
         removeAuction: "🗑Удалить аукцион",
         changeAuction: "🔧Изменить аукцион",
      },
      questions: {
         id: {
            phrase: "🆔Введите идентификатор аукциона"
         },
         datetime: {
            phrase: "🕰Введите дату и время когда запускается аукцион",
            format: "`дд/мм/гггг чч:мм`"
         },
         take: {
            caption: {
               phrase: "🥡Введите заголовок 'Беру'"
            }
         }
      }
   },
   lot: {
      id: "🆔Идентификатор",
      title: "⭕️Наименование",
      description: "ℹ️Описание",
      startingPrice: "🏷Начальная цена",
      takeTitle: "",
      noLots: "📭Нету лотов",
      count: "📬Количество лотов в текущий момент - {lots_length}",
      remove: {
         noParams: "❌ Параметры не заданы. Попробуйте `/removeLot идентификатор`",
         noLots: "❌ Такого лота не существует или не удалён по некоторым причинам",
         success: "✅ Лот успешно удалён",
         wentWrong: "🤔Что-то пошло не так"
      },
   },
   phrases: {
     insert: "✍️Пожалуйста введите",
   },
   keywords: {
      valid: "валидно✅",
      invalid: "не валидно❌"
   },
   help: '✔️ *Доступные команды*: \n\n🔹 /menu - главное меню\n\n🏷 Бот [разработан](t.me/Abduvakhidov) для https://t.me/ytkaauction',
   greet: "Добро пожаловать %s!",
   mainMenuButtons: ["📝Заполнить форму", "🔖Помощь"],
   info_accepted: "Ваши данные получены: *%s*",
   req_confirmed: "✅ Ваша заявка была *одобрена* и опубликована! Спасибо!",
   req_denied: "❌ Ваша заявка была *откланена* из-за несоответствия! Извините!",
   completed: "🔄 Данные приняты! Cпасибо!",
   wrongInput: "🔸 Неправильная команда, попробуйте еще раз!",
   msg_to_winner: "🎊 Поздравляем, вы выиграли аукцион! Теперь ответьте пожалуйста на пару вопросиков чтобы продолжить процесс"

   questions: {
      box: {
         text: "Это оно. Теперь тебе придется немного поработать ручками. Я предупредил. Начнем.\n\n📦 Напиши номер бокса, который ты выиграл?\n\n_Например: номер бокса_",
      },
      price: {
         text: "💵 За какую цену ты отхватил его?\n\n_Например: 600_"
      },
      location: {
         text: "👌🏻 Четенько. Теперь напиши город, куда наши голуби должны доставить тебе бокс?\n\n_Например: Харьков_"
      },
      delivery: {
         text: "👍🏻 Супер! Еще чуть-чуть и ты сможешь выйти из этого чата. А пока ответь еще на один вопрос.\n\n🚚 Мы сейчас работаем через новую почту. Тебе отправлять на отделение или прямо под двери?",
         keyboard: ['Отделение', 'Адрес']
      },
      branch: {
         text: 'Курьер выдохнул :)\n📮Теперь загугли номер ближайшего в твоем районе отделения и напиши сюда.\n\n_Например: 2-е Харьковское почт. отд._'
      },
      address: {
         text: '📫 Напиши адрес доставки.\n_Например: Харьков, ул. Счастья 19_',
         min_length: 5
      },
      phone: {
         text: "📞 Черкани номер телефона получателя. Звонить посреди ночи не будем, обещаем.\n_Например: 098 888 88 88_",
         min_length: 7
      },
      fullname: {
         text: "✏️ Не нервничай, мясо уже почти у тебя на гриле. А пока напиши ФИО получателя через пробел. \n_Например: Калинин Вадим_",
         min_length: 10
      },
      payment: {
         text: "💳 Это предпоследний меседж, отвечаю. Выбери удобный способ оплаты: наложенный платеж или карта?",
         keyboard: ["Наложенный платеж", "Карта"]
      },
      card: {
         text: "🧾*Реквизиты карты через запятую.* \n_Например: Калинин Вадим Сергеевич, 4242 4242 4242 4242 , 08/26_",
         min_length: 20
      },
      confirmation: {
         text: "📸 Для подтверждения нажми '+' или отправь фото/скрин оплаты.\n\nНаши реквизиты для оплаты:\nПриватбанк🏪\n5168742719305413\nОдинцов Ярослав Андреевич",
         keyboard: ['+']
      }
   },
   locations: ['Харьков']
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
