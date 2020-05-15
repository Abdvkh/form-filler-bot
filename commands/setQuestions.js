let questions = {
   box: {
      text: "Какой бокс вы выиграли?"
   },
   price: {
      text: "По какой цене?"
   },
   location: {
      text: "Из какого вы города?"
   },
   mail: {
      text: "Какое отделение или адрес?",
      keyboard: ['Отделение', "Адрес"]
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
Bot.setProperty('questionary', questions, 'JSON');
Bot.sendMessage('Questions are set!');
