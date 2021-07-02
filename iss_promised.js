const request = require('request-promise-native');
const { IpUrl } = require('./consts');

const fetchMyIP = function() { 
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = (IP) => {

  IP = JSON.parse(IP).ip;
  return request(`https://freegeoip.app/json/${IP}`)
}

const fetchISSFlyOverTimes = function(coords) {

  coords = JSON.parse(coords);
  return request(`http://api.open-notify.org/iss/v1/?lat=${coords.latitude}&lon=${coords.longitude}`)
};

const nextISSTimesForMyLocation = function(callback) {

};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };