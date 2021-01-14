/*CMD
  command: /inlineQuery
  help:
  need_reply:
  auto_retry_time:
  folder: Auction
  answer:
  keyboard:
  aliases:
CMD*/

if(!request.query){ return }

let title, msg;
let pic_url = 'https://img.pngio.com/cross-png-transparent-84-images-in-collection-page-2-cross-pngs-260_280.jpg';

const results = [];
const totalResult = 0;

const { positive_above_cur, multiple } = lang['bet'];
const curAucPrice = auction.getCurBetPrice();

const bet = parseInt(request.query.split(' ')[2]);
const betIsAppropriate = bet > 0 && bet > curAucPrice;

if(!betIsAppropriate){
   title = msg = positive_above_cur;
} else if(!betIsAppropriate && (bet % 5 !== 0)) {
   title = msg = multiple;
} else {
   pic_url = 'https://static.appvn.com/a/uploads/thumbnails/032015/do-button-by-ifttt_icon.png';
   title = 'Нажмите чтобы сделать ставку в ' + bet;
   msg = '/bet ' + request.query;
}

results.push({
   type: "article",
   id: totalResult,
   thumb_url: pic_url,
   title: title,
   input_message_content: {
     "message_text": msg
   }
});

Api.answerInlineQuery({
  inline_query_id: request.id,
  results: results,
  cache_time: 30000
})
