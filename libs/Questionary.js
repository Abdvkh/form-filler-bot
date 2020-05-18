function setup() {
   currentQuestionary = getCurrentQuestionary();

   if (currentQuestionary) { return }

   currentQuestionary = new Object();
   User.setProperty('currentQuestionary', currentQuestionary, 'JSON');
}

function getLocations() {
   let locations = Bot.getProperty('locations');
   return locations['cities'];
}

function getCurrentQuestionary() {
   let curQuiz = User.getProperty('currentQuestionary');
   if (curQuiz) { return curQuiz; }
   newCurQuiz = new Object();
   setCurrentQuestionary(newCurQuiz);
   return newCurQuiz;
}

function setCurrentQuestionary(data) {
   User.setProperty('currentQuestionary', data, 'JSON');
}

function addAnswer(propertyName, value) {
   let curQuiz = User.getProperty('currentQuestionary');
   curQuiz[propertyName] = value;
   setCurrentQuestionary(curQuiz);
}

function getQuestions() {
   return Bot.getProperty('questionary');
}

function clearAnswers() {
   setCurrentQuestionary({});
}

function sendForm() {
   let lang = Libs.Lang.get();
   let utils = Libs.Utils;
   let admin = Bot.getProperty('admin');
   let answers = getCurrentQuestionary();
   let req = 'Запрос от ' + utils.getLinkFor(user) + ':\n\n';

   clearAnswers();

   Object.entries(answers).forEach(([key, value]) => {
      if (key == 'confirmation' && value.length > 10) {
         Api.sendPhoto({
            chat_id: admin,
            photo: value,
            caption: req
         });
         value = 'фотография';
      }
      req += '*' + lang['template'][key] + '*' + value+'\n';
   });

   addRequest({req: req, filled_by: user.telegramid});
   Bot.sendInlineKeyboardToChatWithId(
      admin,
      [
         [
            {title: 'Одобрить', command: 'request 1|' + user.telegramid},
            {title: 'Отказать', command: 'request 0|' + user.telegramid}
         ]
      ],
      req
   );
}

function getRequests() {
   let requests = Bot.getProperty('requests');
   if (requests != undefined) {
      return requests;
   }
   let queries = {};
   Bot.setProperty('requests', queries, 'JSON');
   return queries;
}

function addRequest(query) {
   let req = query['req'];
   let userId = query['filled_by'];
   let requests = getRequests();
   let userRequests = requests[userId];
   userRequests = [];
   userRequests.push(req);
   clearAnswers();
   Bot.setProperty('requests', requests, 'JSON');
}

function getRequest(userId) {
   let requests = getRequests();
   return requests[userId];
}

publish({
   user: {
      setup: setup,
   },
   getRequest: getRequest,
   getLocations: getLocations,
   addAnswer: addAnswer,
   sendForm: sendForm,
   getQuestions: getQuestions,
})
