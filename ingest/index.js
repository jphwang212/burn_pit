require('dotenv').config()
try {
  const axios = require("axios");
  const csvFilePath = "BurnpitLocations.csv";
  const csv = require("csvtojson");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      jsonObj.forEach((e) => {
        const query = `mutation AddBase($name: String, $latLong: [String], $country: String, $startDate: String, $stopDate: String, $source: String, $sourceUrl: String ) {
                addBase(name: $name, latLong: $latLong, country: $country, startDate: $startDate, stopDate: $stopDate, source: $source, sourceUrl: $sourceUrl ){
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
          source: 'Army Public Health Center',
          sourceUrl: 'https://phc.amedd.army.mil/topics/envirohealth/hrasm/Pages/POEMS.aspx'
        };
        axios
          .post(`${process.env.BE_URL}/graphql`, {
            variables,
            query,
          })
          .then((res) => {
            console.log(`statusCode: ${res.status}`);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
} catch (error) {
  console.log(error);
}
