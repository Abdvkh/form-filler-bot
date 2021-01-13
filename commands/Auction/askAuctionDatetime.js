/*CMD
  command: askAuctionDatetime
  help:
  need_reply: true
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases: 🕰Время проведения
CMD*/

const auctionTranslations = lang['auction']
const auctionQuestionsTranslations = auctionTranslations['questions'];

handleDatetimeInput(message);


function handleDatetimeInput(input){
    const keywordsTranslations = lang['keywords'];
    const inputs = input.split(' ');

    const inputDate = inputs[0];
    const inputTime = inputs[1];

    const date = utils.time.checkDate(inputDate);
    const time = utils.time.checkTime(inputTime, 2);

    const time_info = `${auctionTranslations['time']} ${time['isValid'] ? keywordsTranslations['valid'] : keywordsTranslations['ivalid']}`;
    const date_info = `${auctionTranslations['date']} ${date['isValid'] ? keywordsTranslations['valid'] : keywordsTranslations['ivalid']}`;

    const scheduled_time = (new Date(date['standardDate'] + " " + time['standardTime'])).getTime();
    const cur_time = Date.now();
    const diff =  parseInt((scheduled_time - cur_time)/1000)

    if (inputs.length !== 2 || input.length > 15 || diff < 1) {
        Bot.sendMessage(auctionTranslations['datetimeWrong']);

        return Bot.run({command: 'askAuctionDatetime'});
    }

    if (date['isValid'] && time['isValid']) {
        auction.setCreatingAucProp('datetime', `${inputDate} ${time['standardTime']}`);
        askAuctionTakeCaption();
    } else {
        Bot.sendMessage(date_info + " и " + time_info);
    }
}

function askAuctionTakeCaption(){
    const details = {
        txt: `${auctionQuestionsTranslations['take']['caption']['phrase']}`,
        cmd: 'askTakeCaption',
        btns: [auctionTranslations['time']]
    };

    utils.runCommandWithKeyboard(details, 'm');
}