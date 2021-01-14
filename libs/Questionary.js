function setup() {
   let currentQuestionary = getCurrentQuestionary();

   if (currentQuestionary) { return }

   currentQuestionary = {};
   User.setProperty('currentQuestionary', currentQuestionary, 'JSON');
}

function getLocations() {
   const locations = Libs.Lang.get()['locations'];
   return locations['cities'] || [];
}

function getCurrentQuestionary() {
   const newCurQuiz = {};
   const curQuiz = User.getProperty('currentQuestionary');

   if (curQuiz) { return curQuiz; }
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
   return Libs.Lang.get()['questions'] || [];
}

function clearAnswers() {
   setCurrentQuestionary({});
}

function getRequestsRecievedCount() {
   const requestsRecievedCount = Bot.getProperty('requestsRecievedCount');
   if (requestsRecievedCount === undefined) {
      Bot.setProperty('requestsRecievedCount', 0, 'Number');
      return 0;
   }
   return requestsRecievedCount;
}

function sendForm() {
   const utils = Libs.Utils;
   const lang = Libs.Lang.get();
   const sheet = Libs.GoogleSpreadSheet;

   const admin = Bot.getProperty('admin');

   const requestsRecievedCount = getRequestsRecievedCount();
   const answers = getCurrentQuestionary();

   let req = 'Запрос от ' + utils.getLinkFor(user) + ':\n\n';

   clearAnswers();
   //goes through the answers and creates request
   Object.entries(answers).forEach(([key, value]) => {
      if (key === 'confirmation' && value.length > 10) {
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
      text: req,
      parse_mode: 'Markdown'
   });
}

function getRequests() {
   const queries = {};
   const requests = Bot.getProperty('requests');

   if (requests !== undefined) {
      return requests;
   }

   Bot.setProperty('requests', queries, 'JSON');
   return queries;
}

function addRequest(query) {
   const req = query['req'];
   const userId = query['filled_by'];
   const requests = getRequests();
   let userRequests = requests[userId];
   userRequests = [];
   userRequests.push(req);
   clearAnswers();
   Bot.setProperty('requests', requests, 'JSON');
}

function getRequest(userId) {
   const requests = getRequests();
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
