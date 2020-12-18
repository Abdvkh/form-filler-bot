let questionsSet = {
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
}
Bot.setProperty('questionary', questionsSet, 'JSON');
Bot.sendMessage('Questions are set!');

// let locations = {cities: new Array()};
// locations.cities.push('Харьков');
// Bot.setProperty('locations', locations, 'Array');
// Bot.sendMessage('locations are set!');

Bot.setProperty('admin', -452881995, 'Number');
Bot.sendMessage('Admin is set!');

Bot.setProperty('chat', -452881995, 'Number');
Bot.sendMessage('chat is set!');

Libs.GoogleSpreadSheet.setUrl('https://script.google.com/macros/s/AKfycbyl1Xf65rP-LbBJ6dtkDPFSSXEMDUhQjzyV84RCNlAPuelf_5E/exec');
Bot.sendMessage('SpreadSheet is set!');