"use strict";
class Log{
  constructor(){
    this.date = new Date();
  }

  TsAndLog(obj){
    console.log("ts : "+ this.date.getTime() + ", log :",arguments);
  }



}

module.exports = {Log: new Log()};
