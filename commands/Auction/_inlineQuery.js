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

results.push({
  type: "article",
  id: totalResult,
  title: "Request info",
  input_message_content:
     { "message_text": request }
})

Api.answerInlineQuery({
  // see another fields at:
  // core.telegram.org/bots/api#answerinlinequery
  inline_query_id: request.id,
  results: results,
  cache_time: 30000 // cache time in sec
})
