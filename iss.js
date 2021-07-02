const request = require('request');
const { IpUrl } = require('./consts');

const fetchMyIP = function(callback) { 
  request(IpUrl, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    body = JSON.parse(body); 
    callback(null, body.ip);   
  });

}

const fetchCoordsByIP = (IP, callback) => {

  request(`https://freegeoip.app/json/${IP}`, (error, response, body) => {
    let latLong = {};

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    body = JSON.parse(body); 
    latLong.latitude = body.latitude;
    latLong.longitude = body.longitude;

    callback(null, latLong);   
  });
}

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss/v1/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    body = JSON.parse(body);

    callback(null, body.response);   
  });
};

const nextISSTimesForMyLocation = function(callback) {

};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };