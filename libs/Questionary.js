function setup() {
   currentQuestionary = getCurrentQuestionary();

   if (currentQuestionary) { return }

   currentQuestionary = new Object();
   User.setProperty('currentQuestionary', currentQuestionary, 'JSON');
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

function getAnwers() {
   return getCurrentQuestionary()['answers'];
}

function addAnswer(propertyName, value) {
   let curQuiz = User.getProperty('currentQuestionary');
   curQuiz[propertyName] = value;
   setCurrentQuestionary(curQuiz);
}

function getCurrentQuestionaryProperty(propertyName) {
   return User.getProperty('currentQuestionary')['propertyName'];
}

function getQuestions() {
   return Bot.getProperty('questionary');
}

function getQuestion() {
   let answers = getCurrentQuestionary();
   let questions = getQuestions();
   let questionsName = Object.keys(questions).length;
   let curQuizLength = Object.keys(answers).length;

   if (questions) { return questionsName[quizLength]; }

   Bot.sendMessage('Nothing to ask');
   return;
}

function saveAnswer(answerName, answerMessage) {
   answerObj = {`${answerName}`: answerMessage}
   addCurrentQuestionaryProperty('answers', getAnwers().push(answer));
}

function sendForm() {
   let admin = Bot.getProperty('admin');
   let answers = getAnwers();

   let answer = new Object();
   Object.entries(answers).forEach(([key, value]) => {
      answer[key] = value;
   });

   let template = curChannelQuiz[type]['template'];
   Bot.sendMessage(template);
   saveUserRequest(user.id, {req: template, channel: curChannel['id']});

   Bot.sendInlineKeyboardToChatWithId(
      admin,
      [
         [
            {text: 'Одобрить', command: 'request 1|' + curChannel['id'] + '|' + user.id},
            {text: 'Отказать', command: 'request 0|' + curChannel['id'] + '|' + user.id}
         ]
      ],
      'Request from ' + utils.getLinkFor(user) + ':\n' + template
   );
}

function clearAnsewrs() {
   addCurrentQuestionaryProperty('answers', new Array());
}

function getRequests() {
   let requests = Bot.getProperty('requests');
   return requests ? requests : {};
}

function saveUserRequest(userId, req) {
   clearAnswers();
   let requests = getRequests();
   let requests = utils.obj.setDefault(requests, userId, new Array());
   if (!req) { return }
   Bot.setProperty('requests', requests[userId].push(req), 'JSON');
}

function getRequest(userId) {
   let requests = getRequests()
   return requests[userId];
}

publish({
   user: {
      setup: setup,
      saveAnswer: saveAnswer,
      addCurQuizProp: addCurrentQuestionaryProperty,
      getCurQuizProp: getCurrentQuestionaryProperty,
      getAnswers: getAnswers,
   },
   addAnswer: addAnswer,
   getRequest: getRequest,
   sendForm: sendForm,
   getQuestion: getQuestion,
   getQuestions: getQuestions,
})
