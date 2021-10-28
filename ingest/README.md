# hack-map ingest

### Description

Used for ingesting and converting CSVs to JSON then storing it in GraphQL

run `node index.js`

-GraphQl must be running to store data

-Will look for file called "BurnpitLocations.csv

-Convert it into a JSON object, look at "bp.json" for an example

-The send a mutation call to graphql running on port 3004


### The Data

The CSV file is populated with data from PDF reports published by the Army Pubilc Health Center:

Periodic Occupational and Environmental Monitoring Summary (POEMS)
https://phc.amedd.army.mil/topics/envirohealth/hrasm/Pages/POEMS.aspx

### Augmenting the data

There are a lot of areas for improvement. Double-checking locations (lat-long), adding new locations which have evidence of burn pit activity. Possibly adding URLs for images of burn pit activities or linking to URIs of audio interviews, printed interviews, legal documents from people who were there during a specific time window.
