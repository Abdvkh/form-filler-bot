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

// result.query - it is query from inline searching
if(!request.query){ return }

results = [];
totalResult = 0;

// it is array of results.
// we have InlineQueryResultArticle
// core.telegram.org/bots/api#inlinequeryresultarticle
// another types: https://core.telegram.org/bots/api#inlinequeryresult
if (parseInt(request.query) % 5 != 0) {
   results.push({
     type: "article",
     id: totalResult,
     thumb_url: 'https://img.pngio.com/cross-png-transparent-84-images-in-collection-page-2-cross-pngs-260_280.jpg',
     title: "Ставка должна быть кратной 5",
     input_message_content:
        { "message_text": 'Ставка должна быть кратной 5' }
   })
} else {
   results.push({
     type: "article",
     id: totalResult,
     thumb_url: 'https://static.appvn.com/a/uploads/thumbnails/032015/do-button-by-ifttt_icon.png',
     title: "Нажмите чтобы сделать ставку",
     input_message_content:
        { "message_text": '/bet ' + request.query }
   });
}

Api.answerInlineQuery({
  // see another fields at:
  // core.telegram.org/bots/api#answerinlinequery
  inline_query_id: request.id,
  results: results,
  cache_time: 30000 // cache time in sec
})
