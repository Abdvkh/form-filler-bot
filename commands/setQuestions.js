let questionsSet = {
   box: {
      text: "Какой бокс вы выиграли?"
   },
   price: {
      text: "По какой цене?"
   },
   location: {
      text: "Из какого вы города?"
   },
   delivery: {
      text: "Отделение почты или адрес куда осуществляется доставка",
      keyboard: ['Отделение', "Адрес"]
   },
   branch: {
      text: 'Название отделения'
   },
   address: {
      text: 'Адрес доставки'
   },
   phone: {
      text: "Номер телефона получателя"
   },
   fullname: {
      text: "ФИО получателя"
   },
   payment: {
      text: "Тип оплаты",
      keyboard: ["Наложенный платеж", "Карта"]
   },
   card: {
      text: "Реквизиты карты"
   }
}

let locations = ['Харьков'];

Bot.setProperty('questionary', questionsSet, 'JSON');
Bot.sendMessage('Questions are set!');
Bot.setProperty('locations', locations, 'JSON');
Bot.sendMessage('locations are set!');
