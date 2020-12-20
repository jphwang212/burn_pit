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
    countries () {
      return this.$store.getters.getCountries
    },
    bases () {
      return this.$store.getters.getBases
    }
  },
  watch: {
    countries (vals) {
      if (vals) {
        this.countryLayerGroup = new L.FeatureGroup()
        this.myMap.addLayer(this.countryLayerGroup)
        Object.keys(vals).forEach(async (c) => {
          if (vals[c] !== 1) {
            const newPolygon = L.polygon(vals[c], {
              color: '#e2813b'
            })
            // newPolygon.on('click', this.polyClick)
            const bounds = await newPolygon.getBounds()
            this.countryNames.push({ name: c.toUpperCase(), bounds })

            this.allCountries.push(newPolygon)
          }
        })
        //   }
        // })
        this.allCountries.forEach((c) => {
          this.countryLayerGroup.addLayer(c)
        })
      }
    },
    bases (vals) {
      this.baseLayerGroup = new L.FeatureGroup()
      this.myMap.addLayer(this.baseLayerGroup)
      vals.forEach((e) => {
        this.flameIcon = L.icon({
          iconUrl: flameOn,
          iconSize: 40
        })
        const latlng = e.latLong.map(e => parseFloat(e))
        if (latlng && latlng.length) {
          // this.allBases.push(
          const lat = parseFloat(e.latLong[0])
          const long = parseFloat(e.latLong[1])
          if (lat && long) {
            this.allBases.push(
              L.marker(L.latLng(lat, long), {
                icon: this.flameIcon
              }).bindPopup(e.name)
              // .addTo(this.myMap)
            )
          }
        }
      })
      this.allBases.forEach((c) => {
        this.baseLayerGroup.addLayer(c)
      })
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
      // e.preventDefault()
      // preventDefault()
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
      }
      if (zoomlevel >= 5) {
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
