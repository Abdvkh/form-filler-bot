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
const auctionID = message;
const { lots } = auction.getAucByID(auctionID);

if (lots.length > 0) {
    lotsDetails = count.replace('{lots_length}', lots.length);

    lots.forEach(({id, title, description, startingPrice}) => {
        lotsDetails += `\n${idText}: ${id}`
            + `\n${titleText}: ${title}`
            + `\n${descriptionText}: ${description}`
            + `\n${startingPriceText}: ${startingPrice}\n\n`;
    });
} else {
    lotsDetails = noLots;
}

const { actions } = lang['auction'];
const actionsButtons = Object.values(actions);

utils.runCommandWithKeyboard({
    cmd: 'handleAction',
    btns: actionsButtons,
    txt: lotsDetails
});
