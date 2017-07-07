"use strict"
const fs = require("fs");

class Connector {
  constructor(){
    this.pluginsDir = __dirname+"/plugins";
    this.requireObjects = Object.create(null);  
  }

  Start(){
    console.log("start!"); 

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

  };
}

module.exports = {connector:Connector};
