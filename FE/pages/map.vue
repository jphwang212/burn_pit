<template>
  <div>
    <map-nav app :my-map="myMap" :countries="countryNames" class="nav" />
    <div class="pa-5">
      <v-card id="mapid" class="pa-5" text />
    </div>
  </div>
</template>
<script>
import mapNav from '../components/mapNav'
import flameOn from '../assets/flameOn.svg'
/* eslint-disable no-undef */
export default {
  name: 'Map',
  components: {
    mapNav
  },
  data () {
    return {
      myMap: null,
      allCountries: [],
      countryLayerGroup: null,
      flameIcon: null,
      allBases: [],
      baseLayerGroup: null,
      countryNames: []
      // flameOnIcon
    }
  },
  computed: {
    bases () {
      return this.$store.getters.shownBases
    },
    countries () {
      return this.$store.getters.shownCountries
    }

  },
  watch: {
    countries (countries) {
      if (countries) {
        if (this.countryLayerGroup) {
          this.countryLayerGroup.eachLayer((layer) => { this.countryLayerGroup.removeLayer(layer) })
          this.allCountries.forEach((c) => {
            this.myMap.removeLayer(c)
          })
          this.allCountries = []
        }
        this.countryLayerGroup = new L.FeatureGroup()
        this.myMap.addLayer(this.countryLayerGroup)
        console.log(countries.length)
        countries.forEach(async (country) => {
          if (country.cords !== 1) {
            const newPolygon = L.polygon(country.cords, {
              color: '#e2813b'
            })
            const bounds = await newPolygon.getBounds()
            this.countryNames.push({ name: country.name.toUpperCase(), bounds })
            this.allCountries.push(newPolygon)
          } else {
            console.log(country)
          }
        })
      } else {
        this.allCountries = []
        this.countryLayerGroup.eachLayer((layer) => { this.countryLayerGroup.removeLayer(layer) })
      }
    },
    bases (vals) {
      if (vals) {
        this.populatedBases(vals)
      }
    }
  },
  mounted () {
    this.$store.dispatch('getBases')
    this.myMap = L.map('mapid', {
      center: [26.46488727752, 46.425649305],
      zoom: 5,
      renderer: L.svg()
    })
    // .setView([51.505, -0.09], 13);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        maxZoom: 15,
        minZoom: 3,
        id: 'mapbox/dark-v10', // "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.MAP_KEY
      }
    ).addTo(this.myMap)

    this.myMap.on('click', this.getLatLong)
    this.myMap.on('zoomend', this.zoomChange)
  },
  methods: {
    getLatLong (e) {
      console.log(e.latlng)
    },
    zoomChange () {
      const zoomlevel = this.myMap.getZoom()
      if (zoomlevel < 5) {
        if (!this.myMap.hasLayer(this.allCountries[0])) {
          this.myMap.addLayer(new L.FeatureGroup(this.allCountries))
        }
        if (this.myMap.hasLayer(this.allBases[0])) {
          this.allBases.forEach((c) => {
            this.myMap.removeLayer(c)
          })
        }
      } else if (zoomlevel >= 5) {
        if (!this.myMap.hasLayer(this.allBases[0])) {
          this.myMap.addLayer(new L.FeatureGroup(this.allBases))
        }
        if (this.myMap.hasLayer(this.allCountries[0])) {
          this.allCountries.forEach((c) => {
            this.myMap.removeLayer(c)
          })
        }
      }
    },
    polyClick (newPolygon) {
      const popup = new L.Popup()
      const bounds = newPolygon.getBounds()
      const popupContent = 'popup content here'
      popup.setLatLng(bounds.getCenter())
      popup.setContent(popupContent)
      this.myMap.openPopup(popup)
    },
    populatedBases (vals) {
      if (this.baseLayerGroup) {
        this.baseLayerGroup.eachLayer((layer) => { this.baseLayerGroup.removeLayer(layer) })
        this.allBases = []
      }
      this.baseLayerGroup = new L.FeatureGroup()
      this.myMap.addLayer(this.baseLayerGroup)
      vals.forEach((e) => {
        this.flameIcon = L.icon({
          iconUrl: flameOn,
          iconSize: 40
        })
        const latlng = e.latLong.map(e => parseFloat(e))
        if (latlng && latlng.length) {
          const lat = parseFloat(e.latLong[0])
          const long = parseFloat(e.latLong[1])
          if (lat && long) {
            this.allBases.push(
              L.marker(L.latLng(lat, long), {
                icon: this.flameIcon
              }).bindPopup(`<div class="card card-1"><h1>${e.name}</h1><h2>${e.startDate}- ${e.stopDate}</h2><h3>From: <a href="${e.sourceUrl}" target="_blank"
                alt="${e.source}">${e.source}</a> </h3></div>`)
            )
          }
        }
      })
      this.allBases.forEach((c) => {
        this.baseLayerGroup.addLayer(c)
      })
    }
  }
}
</script>
<style>
#mapid {
  height: calc(100vh - 250px);
}
.leaflet-pane {
  position: relative !important;
  z-index: 0;
}
</style>
