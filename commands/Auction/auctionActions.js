/*CMD
  command: auctionActions
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer:
  keyboard: Главное меню
  aliases:
CMD*/

let lotsDetails;
const auctionID = message;
const keywords = lang['keywords'];
const { lots } = auction.getAucByID(auctionID);
const {
    count,
    noLots,
    id: idText,
    title: titleText,
    description: descriptionText,
    startingPrice: startingPriceText
} = lang['lot'];

if (lots.length > 0) {
    lotsDetails = count.replace('{lots_length}', lots.length) + '\n';

    lots.forEach(({id, title, status, description, startingPrice}) => {
        lotsDetails += `\n${idText}: ${id}`
            + `\n${titleText}: ${title}`
            + `\n${descriptionText}: ${description}`
            + `\n${keywords.status}: ${keywords[status]}`
            + `\n${startingPriceText}: ${startingPrice}\n\n`;
    });
} else {
    lotsDetails = noLots;
}

const { actions, auctions } = lang['auction'];
const actionsButtons = Object.values(actions);

utils.runCommandWithKeyboard({
    cmd: {
        command: 'handleAction',
        options: {
            auctionID: auctionID
        }
    },
    btns: actionsButtons.push(auctions),
    txt: lotsDetails
}, 'm');
