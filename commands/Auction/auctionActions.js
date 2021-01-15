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
const lotTranslations = lang['lot'];
const actionsButtons = Object.values(actions);
const { actions } = lang['auction'];

const { lots } = auction.getAucByID(auctionID);

if (lots.length > 0) {
    lotsDetails = lotTranslations['count'].replace('{lots_length}', lots.length);

    lots.forEach(({id, title, description, startingPrice}) => {
        lotsDetails += `\n${lotTranslations['id']}: ${id}`
            + `\n${lotTranslations['title']}${title}`
            + `\n${lotTranslations['description']}${description}`
            + `\n${lotTranslations['startingPrice']}${startingPrice}\n\n`;
    });
} else {
    lotsDetails = lotTranslations['noLots'];
}

utils.runCommandWithKeyboard({
    cmd: 'handleAction',
    btns: actionsButtons,
    txt: lotsDetails
});
