<template>
  <div>
    <v-form>
      <div v-if="countries">
        <v-select
          v-model="selectedCountry"
          :items="countries"
          label="Countries"
          item-text="properties.name"
          return-object
          single-line
          class="c-select"
        />
      </div>
      <div id="mapId" />
    </v-form>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { json } from '../countries'
import { recurseArr } from '../utils'
export default {
  name: 'Incident',
  data () {
    return {
      selectedCountry: '',
      map: null
    }
  },
  computed: {
    countries () {
      return json.features
    }
  },
  watch: {
    async selectedCountry (val) {
      if (val) {
        const newPolygon = L.polygon(recurseArr(val.geometry.coordinates), {
          color: '#e2813b'
        }).addTo(this.map)
        // newPolygon.on('click', this.polyClick)
        //   this.countryNames.push({ name: c, bounds: await newPolygon.getBounds() })

        // this.allCountries.push(newPolygon)
        const bounds = await newPolygon.getBounds()
        const center = bounds.getCenter()

        this.map.fitBounds(bounds)
        this.map.setView(center, 8)

        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //   maxBounds: bounds,
        //   maxZoom: 15,
        //   minZoom: 10,
        //   attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        // }).addTo(this.map)
      }
    }
  },
  mounted () {
    this.map = L.map('mapId', {
      center: [26.46488727752, 46.425649305],
      zoom: 5,
      renderer: L.svg()
    })
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
    ).addTo(this.map)
  },
  methods: {}
}
</script>

<style>
#mapId {
  height: calc(100vh - 250px);
}
.leaflet-pane {
  position: relative !important;
  z-index: 0;
}
</style>
