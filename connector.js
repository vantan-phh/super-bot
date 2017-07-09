"use strict"
const fs = require("fs");
const childProcess = require("child_process")
const Log = require("./log.js").Log;
const tokens = require("./tokens.json")

console.log(tokens);
//const log = new Log();

class Connector {
  constructor(){
    this.pluginsDir = __dirname+"/plugins";
    this.outputModuleDir = __dirname+"/outputModules"
      this.requireObjects = Object.create(null);  
    this.outputModulesChildren = Object.create(null);
  }

  Start(){
    console.log("all start!")
      this.ReadPlugins()
      this.ReadOutputModules();
    this.ConnectionSet()
  }

  ReadPlugins(){
    console.log("plugin read!"); 

    const pluginObjects = Object.create(null);
    fs.readdirSync(this.pluginsDir).forEach(pluginName => {
      var pluginIndexPath = this.pluginsDir+"/"+pluginName+"/index.js";

      console.log("module name : ",pluginName);
      console.log("index file : ",pluginIndexPath);

      pluginObjects[pluginName] = pluginIndexPath;

    });

    Object.keys(pluginObjects).forEach((pluginName)=>{
      const plugin = require(pluginObjects[pluginName]);

      this.requireObjects[pluginName] = plugin;
    });

    console.log(this.requireObjects)

  };

  ReadOutputModules(){
    console.log("module read!") 

      const moduleObjects = Object.create(null);
    fs.readdirSync(this.outputModuleDir).forEach(outputName => {
      var outputIndexPath = this.outputModuleDir + "/" + outputName + "/index.js";
      console.log(outputIndexPath);

      moduleObjects[outputName] = outputIndexPath;
    })

    Object.keys(moduleObjects).forEach((outputName) =>{
      //      console.log(moduleObjects[outputName]);
      const process = childProcess.fork(moduleObjects[outputName]);

      this.outputModulesChildren[outputName] = process;
    });

    //    console.log(this.outputModulesChildren)
  }

  ConnectionSet(){
    Object.keys(this.outputModulesChildren).forEach((serviceName) =>{
      const process = this.outputModulesChildren[serviceName];
      process.send({type: "token",tokens: tokens.service[serviceName]})
        process.send({type: "rtmStart"})
    }); 
  }
}

process.on('message', function(message) { 
  switch(message.type){
    case "":
    break;
    default:
      Log.TsAndLog(message);
    break;
  }
});

module.exports = {connector:Connector};
