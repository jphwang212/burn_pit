const csv = require("csvtojson");
var fs = require("fs");

var fs = require("fs");
try {
  const axios = require("axios");
  const csvFilePath = "BurnpitLocations.csv";
  const csv = require("csvtojson");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const json = JSON.stringify(jsonObj);

      jsonObj.forEach((e) => {
        const query = `mutation AddBase($name: String, $latLong: [String], $country: String, $startDate: String, $stopDate: String ) {
                addBase(name: $name, latLong: $latLong, country: $country, startDate: $startDate, stopDate: $stopDate ){
                    name
                    country
                }
            }`;
        const variables = {
          country: e.Country,
          name: e.Name,
          latLong: e["Lat, Long"].replace(/\s/g, "").split(","),
          startDate: e.Start,
          stopDate: e.Stop,
        };
        axios
          .post("http://localhost:3002/graphql", {
            variables,
            query,
          })
          .then((res) => {
            console.log(`statusCode: ${res.statusCode}`);
            console.log(res);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
} catch (error) {
  console.log(error);
}
