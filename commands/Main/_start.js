
if (params && (params === 'bet')) {
   const { auctionOver, enterBetAmount } = lang;
   const currentBet = auction.getCurBet();

   if (auction.isOver()) {
      return Bot.sendMessage(auctionOver + utils.getLinkFor(currentBet['user']))
   }

   return utils.runCommandWithKeyboard({
      cmd: 'getBet',
      txt: enterBetAmount,
      keys: wordsLikeButton.mainmenu
   });
} else if (params.startsWith('form')) {
   const { notUser } = lang;
   const winnerUserID = params.split('-')[1];

   if (winnerUserID !== request.from['id'] && winnerUserID) {
      return Bot.sendMessage(notUser);
   }

   return Bot.run({command: 'getBox'});
}

questionary.user.setup();
Libs.Lang.user.setLang('ru');
const { welcome } = lang;

Bot.sendKeyboard(`${fillForm}, ${help}`, welcome);
Bot.run({command: '/menu'});
