if (params && params == 'bet') {
   let statusIsOver = auction.getCurAuction()['isOver'];
   if (statusIsOver) {
      return Bot.sendMessage(lang['aucOver'] + utils.getLinkFor(curBet['user']))
   }
   let command = {
      cmd: 'getBet',
      txt: lang['enterBetAmount'],
      keys: wordsLikeButton.mainmenu
   };
   return utils.runCommandWithKeyboard(command);
}

questionary.user.setup();
Libs.Lang.user.setLang('ru');
Bot.sendMessage('Салют, мясофан! 👋🏻\n\nСпасибо, что с нами! На связи бот от Быстрой утки.');
Bot.runCommand('/menu');
