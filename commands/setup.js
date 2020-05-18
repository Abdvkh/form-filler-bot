let questionsSet = {
   box: {
      text: "📦*Какой бокс вы выиграли?* \n_Например: Номер бокса_",
   },
   price: {
      text: "💰*По какой цене?* \n_Например: 600_"
   },
   location: {
      text: "📍*Из какого вы города?* \n_Например: Харьков_"
   },
   delivery: {
      text: "🚩*Отделение почты или адрес куда осуществляется доставка.*",
      keyboard: ['Отделение', 'Адрес']
   },
   branch: {
      text: '📮*Название отделения.* \n_Например: 2й Харьковский Почт. отд._'
   },
   address: {
      text: '📫*Адрес доставки.* \n_Например: Харьков, ул. Счастья 19_',
      min_length: 5
   },
   phone: {
      text: "📞*Номер телефона получателя.* \n_Например: +7 777 777 77 77_",
      min_length: 7
   },
   fullname: {
      text: "ℹ️*ФИО получателя *через пробел*.* \n_Например: Калинин Вадим_",
      min_length: 10
   },
   payment: {
      text: "💸*Тип оплаты*",
      keyboard: ["Наложенный платеж", "Карта"]
   },
   card: {
      text: "🧾*Реквизиты карты через запятую.* \n_Например: Калинин Вадим Сергеевич, 4242 4242 4242 4242 , 08/26_",
      min_length: 20
   },
   confirmation: {
      text: "✅*Подтвердите проведение оплаты отправленным скриншотом или знаком '+'*",
      keyboard: ['+']
   }
}

Bot.setProperty('questionary', questionsSet, 'JSON');
Bot.sendMessage('Questions are set!');

let locations = {cities: new Array()};
locations.cities.push('Харьков');
Bot.setProperty('locations', locations, 'Array');
Bot.sendMessage('locations are set!');

Bot.setProperty('admin', 469750202, 'Number');
Bot.sendMessage('Admin is set!');

Bot.setProperty('password', 4919076, 'Number');
Bot.sendMessage('password is set!');
