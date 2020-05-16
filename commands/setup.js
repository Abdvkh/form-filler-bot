let questionsSet = {
   box: {
      text: "Какой бокс вы выиграли? \nНапример: `Название`"
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
      text: 'Адрес доставки. \nНапример: `Харьков, ул. Счастья 19`'
   },
   phone: {
      text: "Номер телефона получателя. \nНапример: `+7 777 777 77 77`"
   },
   fullname: {
      text: "ФИО получателя. \nНапример: `Калинин Вадим`"
   },
   payment: {
      text: "Тип оплаты",
      keyboard: ["Наложенный платеж", "Карта"]
   },
   card: {
      text: "Реквизиты карты. \nНапример: `Калинин Вадим , 4242 4242 4242 4242 , 08/26`"
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
