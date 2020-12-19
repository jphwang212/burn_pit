# burn_pit
Vets Hackathon


Example Neo4J Cypher language Query to create basic nodes and edges
```
CREATE
  (`0` :`Burn Pit` {Name:"Camp Fallujah",lat:'33.355026',lng:'43.783337'}) ,
  (`1` :ServiceMember {Name:"Billy Badass",JoinDate:'2018-12-19',ReleaseDate:'209-12-19'}) ,
  (`2` :Material {Name:'Batteries',ImgURI:'https://ds8ah.com'}) ,
  (`4` :`Burn Pit` {Name:"Camp Baharia",Lat:'33.315264',Long:'43.883169'}) ,
  (`1`)-[:`Visited` ]->(`0`),
  (`2`)-[:``Burned at`` ]->(`0`),
  (`1`)-[:`Visited` ]->(`4`)

```

