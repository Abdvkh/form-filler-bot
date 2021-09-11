/*CMD
  command: askAuctionID
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Auction
  answer: 
  keyboard: Главное меню
  aliases: 🆔идентификатор аукциона
CMD*/

const { id, questions: auctionQuestions, alreadyExists } = lang['auction'];

if(auction.getAucByID(message)){
    utils.runCommandWithKeyboard({
        txt: auctionQuestions['id']['phrase'] + '\n\n' + alreadyExists.replace('{auctionID}', message),
        btns: [],
        cmd: askAuctionID
    }, 'm');
}

auction.setCreatingAucProp('id', message);
auction.setCreatingAucProp('status', 'active');
auction.setCreatingAucProp('lots', []);

askAuctionDatetime();

function askAuctionDatetime(){
    const { datetime } = auctionQuestions;

    const details = {
        txt: `${datetime['phrase']} Формат: ${datetime['format']}`,
        cmd: 'askAuctionDatetime',
        btns: []
    };

    utils.runCommandWithKeyboard(details, 'm');
}
