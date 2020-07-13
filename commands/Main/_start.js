if (params && params == 'bet') {
   let command = {
      cmd: 'getBet ' + request.message.message_id,
      txt: lang['enterBetAmount'],
      keys: wordsLikeButton.mainmenu
   };
   return utils.runCommandWithKeyboard(command);   
}

questionary.user.setup();
Libs.Lang.user.setLang('ru');
Bot.sendMessage('Салют, мясофан! 👋🏻\n\nСпасибо, что с нами! На связи бот от Быстрой утки.');
Bot.runCommand('/menu');
