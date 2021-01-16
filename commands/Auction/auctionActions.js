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
const {
    count,
    noLots,
    id: idText,
    title: titleText,
    description: descriptionText,
    startingPrice: startingPriceText
} = lang['lot'];
const keywords = lang['keywords'];
const auctionID = message;
const { lots } = auction.getAucByID(auctionID);

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

const { actions } = lang['auction'];
const actionsButtons = Object.values(actions);

utils.runCommandWithKeyboard({
    cmd: {
        command: 'handleAction',
        options: {
            auctionID: auctionID
        }
    },
    btns: actionsButtons,
    txt: lotsDetails
}, 'm');
