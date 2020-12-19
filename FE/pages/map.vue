<template>
  <div>
    <map-nav app :myMap="myMap" class="nav"></map-nav>
    <div class="pa-5">
      <v-card class="pa-5" text id="mapid"> </v-card>
    </div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import mapNav from "../components/mapNav";
import { json } from "../countries";
export default {
  name: "Map",
  components: {
    mapNav
  },
  data() {
    return {
      myMap: null,

      polygon: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [12.87, 43.1]
            },
            properties: {
              id: "ITA2054",
              worldview: "all",
              tilequery: {
                distance: 0,
                geometry: "polygon",
                layer: "boundaries_admin_2"
              }
            }
          }
        ]
      }
    };
  },
  computed: {
    newGeo() {
      return this.$store.getters.newGeo;
    },
    newGeoNum() {
      return this.$store.getters.newGeoNum;
    },
    newMultiGeoNum() {
      return this.$store.getters.newMultiGeoNum;
    },
    newMultiGeo() {
      return this.$store.getters.newMultiGeo;
    }
  },
  methods: {
    getLatLong(e) {
      //e.preventDefault()
      // preventDefault()
      console.log(e.latlng);
    },
    goToPlace(req) {
      var line = L.polygon(req, { color: "red" }).addTo(this.myMap);
      //var circle = this.myMap.circle( center, { renderer: myRenderer } );
      this.myMap.fitBounds(line.getBounds());
    },
    recurseArr(newArr) {
      return newArr.map(item => {
        if (item.length == 2) {
          return item.reverse();
        } else {
          return this.recurseArr(item);
        }
      });
    },
    setGeo() {
      this.recurseArr(this.newGeo);
      var line = L.polygon(this.newGeo, { color: "red" }).addTo(this.myMap);
      this.myMap.flyToBounds(line.getBounds());
    },
    setMultiGeo() {
      let polys = [];
      newMultiGeo.forEach(item => {
        this.recurseArr(item.geometry.rings);
        let poly = L.polygon(item.geometry.rings, { color: "blue" }).addTo(
          this.myMap
        );
        polys.push(poly);
        L.circle(poly.getCenter(), { radius: 200, color: green }).addTo(
          this.myMap
        );
      });

      this.myMap.fitBounds(polys.getBounds());
    },
    addCountries() {
      // debugger;
      // console.log(json.type);
      // console.log("features length " + json.features.length);

      if (json.features) {
        // json.features[1].geometry.coordinates.forEach(geo => {
        const newCords = this.recurseArr(json.features[0].geometry.coordinates);
        var polygon = L.polygon(newCords, {
          color: "red"
        }).addTo(this.myMap);
        // });
      }
    }
  },
  mounted() {
    console.log(process.env.MAP_KEY);
    this.myMap = L.map("mapid", {
      center: [38.97649255070067, -76.84675534064796],
      zoom: 11,
      renderer: L.svg()
    });
    //.setView([51.505, -0.09], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 5,
        minZoom: 3,
        id: "mapbox/dark-v10", //"mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.MAP_KEY
      }
    ).addTo(this.myMap);
    this.addCountries();
    this.myMap.on("click", this.getLatLong);
  },
  watch: {
    newGeoNum(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setGeo();
      }
    },
    newMultiGeoNum(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setMultiGeo();
      }
    }
  }
};
</script>
<style>
#mapid {
  height: calc(100vh - 250px);
}
.leaflet-pane {
  position: relative !important;
}
</style>
