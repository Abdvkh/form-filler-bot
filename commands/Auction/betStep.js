/*CMD
  command: betStep
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

let curBet = auction.getCurBet();
let gifs = Bot.getProperty('gifs');
let group = Bot.getProperty('chat');

if (auction.isOver()) {
   Api.sendMessage({
      chat_id: group,
      text: lang['aucOver'] + utils.getLinkFor(curBet['user']),
      reply_markup: {
         inline_keyboard: [
            [
               { text: 'Заполнить форму', url: 'tg://resolve?domain=abduvakhidovs&start=form' },
            ],
         ],
      },
      parse_mode: 'Markdown',
   });
   Api.sendDocument({
      chat_id: group,
      document: gifs.file_ids[0]
   });
   return Bot.clearRunAfter({
      label: 'bet'
   });
}

let betStep = auction.getCurAuction()['betStep'];
auction.setCurrentAuction('betStep', parseInt(betStep)+1);

let betKeyboard = Bot.getProperty('betKeyboard');
let betStep_str = betStep==1 ? "Раз" : betStep==2 ? "Два" : "Три";
let betMsg = betStep_str + ' cтавка от ' + utils.getLinkFor(curBet['user']) + ' ' + curBet['price'];

Api.sendMessage({
   chat_id: group,
   text: betMsg,
   parse_mode: 'Markdown',
   reply_markup: betKeyboard,
});

if (betStep==2) {
   let gif_id = utils.getRandomInt(7, 9);
   Api.sendDocument({
      chat_id: group,
      document: gifs.file_ids[gif_id]
   });
}

Bot.run({
   command: 'betStep',
   run_after: 60,
   label: 'bet'
});
