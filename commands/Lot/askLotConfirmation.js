/*CMD
  command: askLotConfirmation
  help:
  need_reply: true
  auto_retry_time:
  folder: Lot
  answer:
  keyboard:
  aliases: 📥Сохранить
CMD*/

const { save: saveBtn } = lang['keywords'];

if (message === saveBtn) {
   auction.saveCreatedLot();
   Bot.run({command: '/showAuctions'});
}
