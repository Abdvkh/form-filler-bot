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

const auctionTranslations = lang['auction']
const auctionQuestionsTranslations = auctionTranslations['questions'];

auction.setCreatingAucProp('id', message);
auction.setCreatingAucProp('status', 'active');
auction.setCreatingAucProp('lots', []);
askAuctionDatetime();

function askAuctionDatetime(){
    const details = {
        txt: `${auctionQuestionsTranslations['datetime']['phrase']} Формат: ${auctionQuestionsTranslations['datetime']['format']}`,
        cmd: 'askDatetime',
        btns: [auctionTranslations['id']]
    };

    utils.runCommandWithKeyboard(details, 'm');
}
