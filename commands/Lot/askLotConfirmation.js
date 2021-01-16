/*CMD
  command: askLotConfirmation
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer:
  keyboard:
  aliases:
CMD*/

const { save: saveBtn } = lang['keywords'];

if (message === saveBtn) {
   auction.lot.saveCreatedLot();
   Bot.run({command: '/showAuctions'});
}
