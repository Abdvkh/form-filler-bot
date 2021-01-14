/*CMD
  command: askAuctionID
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases: 🆔Идентификатор аукциона
CMD*/

const { id, questions: auctionQuestions } = lang['auction']
const { datetime } = auctionQuestions;

auction.setCreatingAucProp('id', message);
auction.setCreatingAucProp('status', 'active');
auction.setCreatingAucProp('lots', []);

askAuctionDatetime();

function askAuctionDatetime(){
    const details = {
        txt: `${datetime['phrase']} Формат: ${datetime['format']}`,
        cmd: 'askAuctionDatetime',
        btns: [id]
    };

    utils.runCommandWithKeyboard(details, 'm');
}
