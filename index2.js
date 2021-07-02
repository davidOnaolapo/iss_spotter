const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');
const { timeConverter } = require('./timeConverter')

fetchMyIP()
  .then(data => {
    fetchCoordsByIP(data)
      .then(data => { 
        fetchISSFlyOverTimes(data)
          .then(data => {
            data = JSON.parse(data);
            for(let val of data.response) {
              console.log(`Next pass at ${timeConverter(val.risetime)} for ${val.duration} seconds`)
            }
          })
          .catch((error) => {
            console.log("It didn't work: ", error.message);
          });

      })
  })



