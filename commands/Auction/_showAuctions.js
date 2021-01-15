/*CMD
  command: /showAuctions
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases: Аукцоны
CMD*/

let msg, buttons = [];
const { count, id, date, time, takeCaption, noAuctions } = lang['auction'];
const auctions = auction.getAuctions();

if (auctions.length > 0) {

    msg = count.replace('{auctions_length}', auctions.length);

    auctions.filter(auction => auction)
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
        .forEach(auction => {
            buttons.push(auction.id);
            msg += `\n${id}: ${auction.id}`
                + `\n${date} ${time}: ${auction.datetime}`
                + `\n${takeCaption}: ${auction.takeCaption}\n\n`;
        });

    return utils.runCommandWithKeyboard({
        btns: buttons + ', Главное меню',
        cmd: 'auctionActions',
        txt: msg
    });
}

Bot.sendKeyboard('Главное меню', noAuctions);
