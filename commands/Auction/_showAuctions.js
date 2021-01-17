/*CMD
  command: /showAuctions
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases: 🗂Аукционы
CMD*/

let msg, buttons = [];
const { count, id, date, time, takeCaption, noAuctions } = lang['auction'];
const keywords = lang['keywords'];
const auctions = auction.getAuctions();

if (auctions.length > 0) {

    msg = count.replace('{auctions_length}', auctions.length) + '\n';

    auctions.filter(auction => auction)
        .forEach(auction => {
            buttons.push(auction.id);
            msg += `\n${id}: ${auction.id}`
                + `\n${date} ${time}: ${auction.datetime}`
                + `\n${keywords.status}: ${keywords[auction.status]}`
                + `\n${takeCaption}: ${auction.takeCaption}\n\n`;
        });

    return utils.runCommandWithKeyboard({
        btns: buttons,
        cmd: 'auctionActions',
        txt: msg
    }, 'm');
}

Bot.sendKeyboard('Главное меню', noAuctions);
