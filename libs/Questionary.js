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
//
// function getCurrentQuestionaryProperty(propertyName) {
//    return User.getProperty('currentQuestionary')['propertyName'];
// }

function getQuestions() {
   return Bot.getProperty('questionary');
}
//
// function getQuestion() {
//    let answers = getCurrentQuestionary();
//    let questions = getQuestions();
//    let questionsName = Object.keys(questions).length;
//    let curQuizLength = Object.keys(answers).length;
//
//    if (questions) { return questionsName[quizLength]; }
//
//    Bot.sendMessage('Nothing to ask');
//    return;
// }
//
// function saveAnswer(answerName, answerMessage) {
//    answerObj = {answerName: answerMessage}
//    addCurrentQuestionaryProperty('answers', getAnwers().push(answer));
// }

function sendForm() {
   let admin = Bot.getProperty('admin');
   let answers = getCurrentQuestionary();
   let req = '';

   Object.entries(answers).forEach(([key, value]) => {
      req += lang['template'][key] + value;
   });

   clearCurrentQuestionary();
   addRequest({req: req, filled_by: user.id});

   Bot.sendInlineKeyboardToChatWithId(
      admin,
      [
         [
            {text: 'Одобрить', command: 'request 1|' + user.id},
            {text: 'Отказать', command: 'request 0|' + user.id}
         ]
      ],
      'Запрос от ' + utils.getLinkFor(user) + ':\n\n' + req
   );
}

function clearAnsewrs() {
   setCurrentQuestionary(new Object());
}

function getRequests() {
   let requests = Bot.getProperty('requests');
   if (requests != undefined) {
      return requests;
   }
   let queries = new Array()
   Bot.setProperty('requests', {queries: queries}, 'JSON');
   return queries;
}

function addRequest(query) {
   let req = query['req'];
   let userId = query['filled_by'];
   clearAnswers();
   let requests = getRequests();
   let requests = utils.obj.setDefault(requests, userId, new Array());
   if (!req) { return }
   requests[userId].push(req)
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
