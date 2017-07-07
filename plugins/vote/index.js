'use strict'
const request = require('request');
function vote(res, teamName, toolKit) {
  const vote_text = res.text.slice(res.text.indexOf("vote"));
  if (!vote_text.match(/:([^\s]+):/g)) return;
  const emojis = vote_text.match(/:([^\s]+):/g).map(value =>{
    return value.replace(/:/g, '');
  });
  if(emojis == null){
    return ;
  }
  const timestamp = res.ts;
  const channel = res.channel;
  for(let emoji of emojis){
    toolKit.reactionAdd(timestamp, channel, emoji);
  }
}

module.exports = {vote: vote};
