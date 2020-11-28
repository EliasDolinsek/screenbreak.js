const electron = window.require("electron");
const path = window.require("path");
const fs = window.require("fs");

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const configFile = path.join(userDataPath, "config.json");

export function writeConfig(config){
  fs.writeFileSync(configFile, JSON.stringify(config));
}

export function readConfig(){
  return JSON.parse(fs.readFileSync(configFile, "utf-8"));
}
