const wifi =  require("Wifi");
const http = require("http");

const WIFI_NAME = "TLU";
const WIFI_OPTIONS = { password : "" };
const logInterval = 10000;
const id = 1;

function onInit() {
  wifi.connect(WIFI_NAME, WIFI_OPTIONS, function(err) {
    if (err) {
      console.log("Connection error: "+err);
      return;
    }
    console.log("Connected!");
  });
}

setInterval(() =>{
  http.get("localhost:3000/?=" + id + moisture + timestamp + light, (res) => {
    res.on('data', (r) => {
      console.log(r);
    });
  });
}, logInterval);

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
