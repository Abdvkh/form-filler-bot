const LIB_PREFIX = 'utils_';

//returns previously saved command details
function getPreviousCommand() {
   return User.getProperty('previousCommand');
}

//on wrong input sends a message and runs given command
function onWrongInputRun(command) {
   const lang = Libs.Lang.get();
   Bot.sendMessage(lang.wrongInput);
   Bot.runCommand(command);
}

//runs the given command
function runCommandWithKeyboard(command, extraBtnsCode=''){
   const { cmd, btns, txt } = command;
   const commandKeyboard = Array.isArray(btns) ? makeKeyboard(btns, extraBtnsCode) : btns;
   const commandToRun = typeof cmd === 'string' ? {command: cmd} : cmd;

   Bot.sendKeyboard(commandKeyboard, txt);
   Bot.run(commandToRun);
}

//saves command details to run in go back function
function saveAsPreviousCommandDetails(command){
   User.setProperty('previousCommand', command,'Object');
}

//makes keyboard from an array
//adds 'back' and 'main menu' button regarding to code
function makeKeyboard(buttonsArray, code){
   const lang = Libs.Lang.get();
   const back = code.indexOf('b') > -1;
   const menu = code.indexOf('m') > -1;
   let keyboard = '';

   for(let i = 1; i <= buttonsArray.length; i++){
      keyboard += buttonsArray[i-1] + ',' ;

      if(i % 2 === 0){
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
   const pass = Bot.getProperty('password');
   if(password === pass){return true;}
   return false;
}

function getNameFor(member){
  const haveAnyNames = member.username||member.first_name||member.last_name;
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
   let matches, day, month, year;
   const allowBlank = false;
   const minYear = 0;
   const maxYear = (new Date()).getYear() - 100;

   let errorMsg = "";

   // regular expression to match required date format
   const re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](\d{2})$/;

   if (input !== '') {
      if (matches = input.match(re)) {
         day = matches[1];
         month = matches[2];
         year = matches[3];

         if (day < 1 || day > 31) {
            errorMsg = "Неверно дан день: " + day;
         } else if (month < 1 || month > 12) {
            errorMsg = "Неверно дан месяц: " + month;
         } else if (year < minYear || year > maxYear) {
            errorMsg = "Неверно дан год: " + year + " - должно быть между " + minYear + " и " + maxYear;
         }
      } else {
         errorMsg = "Неверный формат даты: " + input;
      }
   } else if (!allowBlank) {
      errorMsg = "Пустая дата не принимается!";
   }

   if (errorMsg !== "") {
      Bot.sendMessage(errorMsg);
      return {
         isValid: false,
         data: matches,
         standardDate: month + "/" + day + "/" + year//changed format to mm/dd/yy
      };
   }

   return {
      isValid: true,
      data: matches,
      standardDate: month + "/" + day + "/" + year//changed format to mm/dd/yy
   };
}

/** Validates input time and returns information back. GMT by default +05 hours
 * @param {string} input - Time input
 * @param {number|string} gmt_hours - GMT standard
 *
 * @return {object} isValid, data, standardTime
 * */
function checkTime(input, gmt_hours=5) {
   let matches, hours, minutes;
   //Checks time format of string in form of HH/MM
   let errorMsg = "";

   // regular expression to match required time format
   const date_format = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

   if (input !== "") {
      if (matches = input.match(date_format)) {
         hours = matches[1];
         minutes = matches[2];

         if (matches[4]) {
            // 12-hour time format with am/pm
            if (hours < 1 || hours > 12) {
               errorMsg = "Неверно дан часы: " + hours;
            }
         } else {
            // 24-hour time format
            if (hours > 23) {
               errorMsg = "Неверно дан часы: " + hours;
            }
         }
         if (!errorMsg && minutes > 59) {
            errorMsg = "Неверно даны минуты: " + minutes;
         }
      } else {
         errorMsg = "Неверный формат времени: " + input;
      }
   }

   if (errorMsg !== "") {
      Bot.sendMessage(errorMsg);
      return {
         isValid: false,
         data: matches,
         standardTime: parseInt(hours) - gmt_hours + ":" + minutes
      };
   }

   return {
         isValid: true,
         data: matches,
         standardTime: parseInt(hours) - gmt_hours + ":" + minutes
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
