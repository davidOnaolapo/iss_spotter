const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
const { timeConverter } = require('./timeConverter')

fetchMyIP((error, ip) => {
  if (error) {
    console.log("I never found an IP addy bruh: ", error);
    return;
  }
  fetchCoordsByIP(ip, (error, obj) => {
    if (error) {
      console.log("I couldn't fetch coords bruh: ", error);
      return;
    }
    fetchISSFlyOverTimes(obj, (error, arr) => {
      if (error) {
        console.log("I couldn't fetch response times bruh: ", error);
        return;
      }
      for(let obj of arr) {
        console.log(`Next pass at ${timeConverter(obj.risetime)} for ${obj.duration} seconds`);
      }
    })
  })
});



