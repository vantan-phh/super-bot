"use strict";
const Log = require("../../log.js").Log;
const WS = require('ws');
const request = require('request');

class Slack {
  constructor(token){
    this.token = token;
  }

  rtmStart(){
    request.post("https://slack.com/api/rtm.start",{json :true,qs:{token:this.token}}
        ,function(err,res,body){
          console.log(body)
          this.ws = new WS(body.url, {agent: null});
          this.ws.on('open',function(){
            console.log("open");
          })
          this.ws.on('pong',function(){
            console.log("pong");
          })
          this.ws.on('message',function(res,body){
            var parsedRes = JSON.parse(res);
            Log.TsAndLog(parsedRes);
          })
        })
  }

}

var slack = new Slack();

process.on("message",function(message){
  switch(message.type){
    case "rtmStart":
      slack.rtmStart();
    break;
    case "token":
      slack.token = message.tokens.token;
//      Log.TsAndLog("token set",slack.token); 
      break;
    default:
      Log.TsAndLog("child get!",message);
      process.send(message);
      break;
  }
})


