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
import flameOn from "../assets/flameOn.svg";
export default {
  name: "Map",
  components: {
    mapNav
  },
  data() {
    return {
      myMap: null,
      allCountries: [],
      countryLayerGroup: null,
      flameIcon: null,
      allBases: [],
      baseLayerGroup: null
      // flameOnIcon
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
    },
    countries() {
      return this.$store.getters.getCountries;
    },
    bases() {
      return this.$store.getters.getBases;
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

    zoomChange() {
      var zoomlevel = this.myMap.getZoom();
      if (zoomlevel < 5) {
        if (!this.myMap.hasLayer(this.allCountries[0])) {
          this.myMap.addLayer(new L.FeatureGroup(this.allCountries));
        }
        if (this.myMap.hasLayer(this.allBases[0])) {
          this.allBases.forEach(c => {
            this.myMap.removeLayer(c);
          });
        }
      }
      if (zoomlevel >= 5) {
        if (!this.myMap.hasLayer(this.allBases[0])) {
          this.myMap.addLayer(new L.FeatureGroup(this.allBases));
        }
        if (this.myMap.hasLayer(this.allCountries[0])) {
          this.allCountries.forEach(c => {
            this.myMap.removeLayer(c);
          });
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch("getBases");
    this.myMap = L.map("mapid", {
      center: [26.46488727752, 46.425649305],
      zoom: 5,
      renderer: L.svg()
    });
    //.setView([51.505, -0.09], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 15,
        minZoom: 3,
        id: "mapbox/dark-v10", //"mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.MAP_KEY
      }
    ).addTo(this.myMap);

    this.myMap.on("click", this.getLatLong);
    this.myMap.on("zoomend", this.zoomChange);
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
    },
    countries(vals, oldVal) {
      this.countryLayerGroup = new L.FeatureGroup();
      this.myMap.addLayer(this.countryLayerGroup);
      json.features.forEach(g => {
        if (vals[g.properties.name.toLowerCase()]) {
          const newCords = this.recurseArr(g.geometry.coordinates);
          this.allCountries.push(
            L.polygon(newCords, {
              color: "#e2813b"
            })
          );
        }
      });
      this.allCountries.forEach(c => {
        this.countryLayerGroup.addLayer(c);
      });
    },
    bases(vals, oldVal) {
      this.baseLayerGroup = new L.FeatureGroup();
      this.myMap.addLayer(this.baseLayerGroup);
      debugger;
      vals.forEach(e => {
        this.flameIcon = L.icon({
          iconUrl: flameOn,
          iconSize: 40
        });
        const latlng = e.latLong.map(e => parseFloat(e));
        if (latlng && latlng.length) {
          // this.allBases.push(
          const lat = parseFloat(e.latLong[0]);
          const long = parseFloat(e.latLong[1]);
          if (lat && long) {
            this.allBases.push(
              L.marker(L.latLng(lat, long), {
                icon: this.flameIcon
              }).bindPopup(e.name)
              // .addTo(this.myMap)
            );
          }
        }
      });
      this.allBases.forEach(c => {
        this.baseLayerGroup.addLayer(c);
      });
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
