"use strict";

class Plugin {
  constructor(){}
  //リアクション系
  reactionCondiction() {return /.*/}
  action(message){
    message.res("huga")
  }
  reply(message){
    message.res("huga")
  }
  directMail(message){
    message.res("huga")
  }
  //時報系
  schedule(tools){return ["0 * * * * *",function(tools){
    tools.send("test cron");
  }]}
}
