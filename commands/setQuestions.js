let questionary = {
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
      text: "Какое отделение или адрес?"
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
Bot.setProperty('questionary', questionary, 'JSON');
Bot.sendMessage('Questions are set!');
