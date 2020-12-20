# hack-map ingest

### Description

Used for ingesting and converting CSVs to JSON then storing it in GraphQL

run `node index.js`

-GraphQl must be running to store data

-Will look for file called "BurnpitLocations.csv

-Convert it into a JSON object, look at "bp.json" for an example

-The send a mutation call to graphql running on port 3002
