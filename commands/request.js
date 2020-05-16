let details = params.split("|");
let acception = details[0];
let userId = details[1];

if (acception == '0') {
   Api.sendMessage({
      chat_id: userId,
      text: lang['req_denied']
   });
}

if (acception == '1') {
   Api.sendMessage({
      chat_id: userId,
      text: lang['req_confirmed']
   })
}
