let details = params.split("|");
let acception = details[0];
let userId = details[1];

if (acception == '0') {
   let requestsDeniedCount = Bot.getProperty('requestsDeniedCount');
   if (requestsDeniedCount == undefined) {
      requestsDeniedCount = 0;
   }
   Bot.setProperty(
      'requestsDeniedCount',
      requestsDeniedCount+1,
      'Number'
   );
   Api.sendMessage({
      chat_id: userId,
      text: lang['req_denied'],
      parse_mode: 'Markdown'
   });
}

if (acception == '1') {
   let requestsAcceptedCount = Bot.getProperty('requestsAcceptedCount');
   if (requestsAcceptedCount  == undefined) {
      requestsAcceptedCount = 0;
   }
   Api.sendMessage({
      chat_id: userId,
      text: lang['req_confirmed'],
      parse_mode: 'Markdown'
   });
   Bot.setProperty(
      'requestsAcceptedCount',
      requestsAcceptedCount+1,
      'Number'
   );
}
