let questionsSet = {
   box: {
      text: "Какой бокс вы выиграли? \nНапример: `Номер бокса`",
   },
   price: {
      text: "По какой цене? \nНапример: `600`"
   },
   location: {
      text: "Из какого вы города? \nНапример: `Харьков`"
   },
   delivery: {
      text: "Отделение почты или адрес куда осуществляется доставка.",
      keyboard: ['Отделение', 'Адрес']
   },
   branch: {
      text: 'Название отделения. \nНапример: `2й Харьковский Почт. отд.`'
   },
   address: {
      text: 'Адрес доставки. \nНапример: `Харьков, ул. Счастья 19`',
      min_length: 5
   },
   phone: {
      text: "Номер телефона получателя. \nНапример: `+7 777 777 77 77`",
      min_length: 7
   },
   fullname: {
      text: "ФИО получателя *через пробел*. \nНапример: `Калинин Вадим`",
      min_length: 10
   },
   payment: {
      text: "Тип оплаты",
      keyboard: ["Наложенный платеж", "Карта"]
   },
   card: {
      text: "Реквизиты карты через запятую. \nНапример: `Калинин Вадим Сергеевич, 4242 4242 4242 4242 , 08/26`",
      min_length: 20
   },
   confirmation: {
      text: "Подтвердите проведение оплаты отправленным скриншотом или знаком '+'",
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
