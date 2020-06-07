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

function getRequestsRecievedCount() {
   let requestsRecievedCount = Bot.getProperty('requestsRecievedCount');
   if (requestsRecievedCount == undefined) {
      Bot.setProperty('requestsRecievedCount', 0, 'Number');
      return 0;
   }
   return requestsRecievedCount;
}

function sendForm() {
   let utils = Libs.Utils;
   let lang = Libs.Lang.get();
   let sheet = Libs.GoogleSpreadSheet;

   let admin = Bot.getProperty('admin');

   let requestsRecievedCount = getRequestsRecievedCount();
   let answers = getCurrentQuestionary();

   let req = 'Запрос от ' + utils.getLinkFor(user) + ':\n\n';

   clearAnswers();
//goes through the answers and creates request
   Object.entries(answers).forEach(([key, value]) => {
      if (key == 'confirmation' && value.length > 0) {
         Api.sendPhoto({
            chat_id: admin,
            photo: value,
            caption: req,
            parse_mode: 'Markdown'
         });
         value = 'фотография';
      }
      req += lang['template'][key] + '`' + value + '`\n';
   });
//counts requests
   if (Object.keys(answers).length > 2) {
      Bot.sendMessage(lang['completed']);
      Bot.setProperty(
         'requestsRecievedCount',
         requestsRecievedCount+1,
         'Number'
      );

      // saving data in google spread sheet
      sheet.addRow({
         sheetName: "Auction",  // sheet name
         row: answers,
         onSuccess: 'onSuccess',
         onError: 'onError'
      });
   }
   addRequest({req: req, filled_by: user.telegramid});
   Api.sendMessage({
      chat_id: admin,
      text: req
   });
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
