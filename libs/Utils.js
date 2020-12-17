let LIB_PREFIX = 'utils_';

//returns previously saved command details
function getPreviousCommand() {
   return User.getProperty('previousCommand');
}

//on wrong input sends a message and runs given command
function onWrongInputRun(command) {
   let lang = Libs.Lang.get('ru');
   Bot.sendMessage(lang.wrongInput);
   Bot.runCommand(command);
}

//runs the given command
function runCommandWithKeyboard(command){
   Bot.sendKeyboard(command['btns'], command['txt']);
   Bot.runCommand(command['cmd']);
}

//saves command details to run in go back function
function saveAsPreviousCommandDetails(command){
   User.setProperty('previousCommand', command,'Object');
}

//makes keyboard from an array
//adds 'back' and 'main menu' button regarding to code
function makeKeyboard(buttonsArray, code){
   let lang = Libs.Lang.get('ru');
   let keyboard = '';
   let back = code.indexOf('b') > -1;
   let menu = code.indexOf('m') > -1;

   for(let i = 1; i <= buttonsArray.length; i++){
      keyboard += buttonsArray[i-1] + ',' ;

      if(i % 2 == 0){
         keyboard += '\n,';
      }
   }
   //adds back button
   if (back) {keyboard += '\n' + lang.buttons.back + ',';}
   //adds mainmenu button
   if (menu) {keyboard += lang.buttons.mainmenu;}

   return keyboard;
}

//checks whether given password is valid or not
function passwordIsValid(password){
   let pass = Bot.getProperty('password');
   if(password==pass){return true;}
   return false;
}

function getNameFor(member){
  let haveAnyNames = member.username||member.first_name||member.last_name;
  if(!haveAnyNames){ return ""}

  if(member.username){
    return "@" + member.username
  }

  return member.first_name ? member.first_name : member.last_name
}

function getLinkFor(member){
  return "[" + getNameFor(member) + "](tg://user?id=" + member.telegramid + " )";
}

function getRandomIntFromRange(min, max) {
   /*get random int from range till the given numbers*/
  return Math.floor(Math.random() * ((max+1) - min) + min);
}

function checkDate(input) {
   //Checks date format of string in form of dd/mm/yy
   let regs;
   let allowBlank = false;
   let minYear = 0;
   let maxYear = (new Date()).getYear() - 100;

   let errorMsg = "";

   // regular expression to match required date format
   let re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](\d{2})$/;

   if (input != '') {
      if (regs = input.match(re)) {
         if (regs[1] < 1 || regs[1] > 31) {
            errorMsg = "Invalid value for day: " + regs[1];
         } else if (regs[2] < 1 || regs[2] > 12) {
            errorMsg = "Invalid value for month: " + regs[2];
         } else if (regs[3] < minYear || regs[3] > maxYear) {
            errorMsg = "Invalid value for year: " + regs[3] + " - must be between " + minYear + " and " + maxYear;
         }
      } else {
         errorMsg = "Invalid date format: " + input;
      }
   } else if (!allowBlank) {
      errorMsg = "Empty date not allowed!";
   }

   if (errorMsg != "") {
      Bot.sendMessage(errorMsg);
      return {
         isValid: false,
         data: regs,
         standardDate: regs[2] + "/" + regs[1] + "/" + regs[3]//changed format to mm/dd/yy
      };
   }

   return {
      isValid: true,
      data: regs,
      standardDate: regs[2] + "/" + regs[1] + "/" + regs[3]//changed format to mm/dd/yy
   };
}

function checkTime(input) {
   let regs;
   //Checks time format of string in form of HH/MM
   let errorMsg = "";

   // regular expression to match required time format
   let re = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

   if (input != "") {
      if (regs = input.match(re)) {
         if (regs[4]) {
            // 12-hour time format with am/pm
            if (regs[1] < 1 || regs[1] > 12) {
               errorMsg = "Invalid value for hours: " + regs[1];
            }
         } else {
            // 24-hour time format
            if (regs[1] > 23) {
               errorMsg = "Invalid value for hours: " + regs[1];
            }
         }
         if (!errorMsg && regs[2] > 59) {
            errorMsg = "Invalid value for minutes: " + regs[2];
         }
      } else {
         errorMsg = "Invalid time format: " + input;
      }
   }

   if (errorMsg != "") {
      Bot.sendMessage(errorMsg);
      return {
         isValid: false,
         data: regs,
         standardTime: parseInt(regs[1])-5 + ":" + regs[2]
      };
   }

   return {
         isValid: true,
         data: regs,
         standardTime: parseInt(regs[1])-5 + ":" + regs[2]
   };
}


publish({
   time: {
      checkDate: checkDate,
      checkTime: checkTime,
   },
   getLinkFor: getLinkFor,
   getNameFor: getNameFor,
   getPreviousCommand: getPreviousCommand,
   runCommandWithKeyboard: runCommandWithKeyboard,
   savePreviousCommand: saveAsPreviousCommandDetails,
   passwordIsValid: passwordIsValid,
   makeKeyboard: makeKeyboard,
   onWrongInputRun: onWrongInputRun,
   getRandomInt: getRandomIntFromRange
});
