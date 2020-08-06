let curAuc = auction.getCurAuction();
if (params && params == 'bet') {
   if (auction.isOver()) {
      return Bot.sendMessage(lang['aucOver'] + utils.getLinkFor(curAuc['betUser']))
   }
   let command = {
      cmd: 'getBet',
      txt: lang['enterBetAmount'],
      keys: wordsLikeButton.mainmenu
   };
   return utils.runCommandWithKeyboard(command);
} else if (params == 'form') {
   if (curAuc['betUser']['telegramid']==user.telegramid) {
      return Bot.runCommand('getBox');
   }
   return Bot.sendMessage('Извините, но вы не победитель аукциона!')
}

questionary.user.setup();
Libs.Lang.user.setLang('ru');
Bot.sendMessage('Салют, мясофан! 👋🏻\n\nСпасибо, что с нами! На связи бот от Быстрой утки.');
Bot.runCommand('/menu');
