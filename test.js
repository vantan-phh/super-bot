const fs = require('fs');

const pluginsDir = __dirname+"/plugins";

// プラグインオブジェクトの入れ物
const pluginObjects = Object.create(null);
const requireObjects = Object.create(null);

// プラグインファイルパスのオブジェクト化
fs.readdirSync(pluginsDir).forEach(pluginName => {
  var pluginIndexPath = pluginsDir+"/"+pluginName+"/index.js"

  console.log("module name : ",pluginName);
  console.log("index file : ",pluginIndexPath);

  pluginObjects[pluginName] = pluginIndexPath;

});

Object.keys(pluginObjects).forEach((pluginName)=>{
  const plugin = require(pluginObjects[pluginName]);

  requireObjects[pluginName] = plugin;
});

console.log(requireObjects)


