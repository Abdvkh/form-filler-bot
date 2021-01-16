const [acception, userId] = params.split("|");

if (acception === '0') {
   const requestsDeniedCount = Bot.getProperty('requestsDeniedCount') || 0;
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

if (acception === '1') {
   const requestsAcceptedCount = Bot.getProperty('requestsAcceptedCount') || 0;

   Api.sendMessage({
      chat_id: userId,
      text: lang['req_confirmed'],
      parse_mode: 'Markdown'
   });
   Bot.setProperty(
      'requestsAcceptedCount',
      requestsAcceptedCount + 1,
      'Number'
   );
}
