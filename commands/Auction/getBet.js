/*CMD
  command: getBet
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases:
CMD*/

const { wrong, positiveOrAboveCurrent } = lang['bet'];

const currentBetPrice = auction.getCurBetPrice();
const bet = currentBetPrice + parseInt(message);

const group = Bot.getProperty('chat');

if (message && !isNaN(message)) {

   if (message < 0) {
      //ask bet again
      Bot.sendMessage(`${wrong} ${positiveOrAboveCurrent}`);
      return Bot.runCommand('getBet');
   }

   sendGIF();

   sendBetMadeMessage();

   auction.setCurBet(user, bet);
   auction.setLotProp('betStep', 1);

   Bot.clearRunAfter({
      label: 'bet'
   });

   Bot.run({
      command: 'betStep',
      run_after: 60,
      label: 'bet'
   });
}


function sendBetMadeMessage(){
   const betKeyboard = Bot.getProperty('betKeyboard');

   Api.sendMessage({
      chat_id: group,
      text: 'Ставка от ' + utils.getLinkFor(user) + ' ' + bet,
      parse_mode: 'Markdown',
      reply_markup: betKeyboard
   });
   Bot.sendMessage('Ваша ставка сделана, спасибо!');
}

function sendGIF() {
   //send gif
   const gifID = utils.getRandomInt(5, 6);
   const gifs = Bot.getProperty('gifs');

   Api.sendDocument({
      chat_id: group,
      document: gifs.file_ids[gifID]
   });
}
