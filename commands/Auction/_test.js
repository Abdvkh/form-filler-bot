/*CMD
  command: /test
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer: Enter datetime
  keyboard:
  aliases:
CMD*/

let inputs = message.split(' ');

if (inputs.length > 2) {
   Bot.sendMessage(
      'Please enter datetime in right way "dd/mm/yy HH:MM"'
    + ' a space between date(dd/mm/yy) and time(HH:MM) is required.\n'
    + 'Try again please!'
   );
   return Bot.run({command: '/test'});
}

let inputDate, inputTime = inputs;

let date = utils.time.checkDate(inputDate);
let time = utils.time.checkTime(inputTime);

let time_info = time['isValid'] ? 'Time is valid.' : 'Time is invalid.';
let date_info = date['isValid'] ? 'Date is valid.' : 'Date is invalid.';

if (date['isValid'] && time['isValid']) {
   Bot.sendMessage("Success");
   // Bot.run({
   //    command: 'askDescription',
   // });
} else {
   Bot.sendMessage(date_info + " and " + time_info);
}
