const wifi = require("Wifi");
const http = require("http");

const WIFI_NAME = "TLU";
const WIFI_OPTIONS = { password : "" };
const deviceID = "Stenver";

let isGrown = false;

const server = () => {
  const sensor = require("HC-SR04").connect(D4,D5,function(dist) {
    console.log(dist+" cm away");
    isGrown = dist < 7;
    isGrown ? console.log("isGrowaodada") : null
  });

  setInterval(() => {
    sensor.trigger();
    let moisture = analogRead(0);
    console.log(moisture);
    updateRequest(deviceID, moisture, isGrown);
  }, 5000);

};

const updateRequest = (board, moisture, isGrown) => {
  http.get("https://taimed.herokuapp.com/api/create?board=" + deviceID + "&moisture=" + moisture + "&isGrown="+isGrown, (res) => {
    console.log("Response: ",res);
    res.on('data', (d) => {
      console.log("Repsonse suc"+d);
    });
  });
};

wifi.connect(WIFI_NAME, WIFI_OPTIONS,(err) => {
  if (err) {
    console.log("Connection error: "+err);
    return;
  }
  console.log("Connected to wifi");
  server();
});
