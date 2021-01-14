const { auctionOver, enterBetAmount, notUser } = lang;
const currentAuction = auction.getAuction();

if (params && (params === 'bet')) {
   if (auction.isOver()) {
      return Bot.sendMessage(auctionOver + utils.getLinkFor(currentAuction['betUser']))
   }
   let command = {
      cmd: 'getBet',
      txt: enterBetAmount,
      keys: wordsLikeButton.mainmenu
   };
   return utils.runCommandWithKeyboard(command);
} else if (params === 'form') {
   if (currentAuction['betUser']['telegramid'] === user.telegramid) {
      return Bot.run({command: 'getBox'});
   }
   return Bot.sendMessage(notUser);
}

questionary.user.setup();
Libs.Lang.user.setLang('ru');
Bot.sendMessage('Салют, мясофан! 👋🏻\n\nСпасибо, что с нами! На связи бот от Быстрой утки.');
Bot.runCommand('/menu');
