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

let results = [];
let totalResult = 0;

let pic_url = 'https://img.pngio.com/cross-png-transparent-84-images-in-collection-page-2-cross-pngs-260_280.jpg';

let curAucPrice = auction.getCurBetPrice();

let bet = parseInt(request.query.split(' ')[2]);
let title = msg = '';
let bet_is_approp = bet > 0 && bet > curAucPrice
if(!bet_is_approp){
   title = msg = lang['bet']['positive_above_cur'];
} else if(!bet_is_approp && (bet % 5 != 0)) {
   title = msg = lang['bet']['multiple'];
} else {
   pic_url = 'https://static.appvn.com/a/uploads/thumbnails/032015/do-button-by-ifttt_icon.png';
   title = "Нажмите чтобы сделать ставку в " + bet;
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
