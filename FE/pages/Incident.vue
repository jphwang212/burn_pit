<template>
  <div>
    <v-form>
      <v-container>
        <v-text-field
          class="incidentName"
          label="Incident Name"
        />
        <v-row>
          <v-col cols="12" lg="6">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="start"
                  label="Start"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="date" no-title @input="menu1 = false" />
            </v-menu>
          </v-col>

          <v-col cols="12" lg="6">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="end"
                  label="End"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="date" no-title @input="menu2 = false" />
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
      <!--
          Start<month-picker @change="start" />
      <month-picker-input :no-default="true" />

      End<month-picker @change="end" />
      <month-picker-input :no-default="true" />
      -->
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
  components: {},
  data () {
    return {
      selectedCountry: '',
      map: null,
      currentPolygon: null,
      start: '',
      end: '',
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false
    }
  },
  computed: {
    countries () {
      return json.features
    }
    // computedDateFormatted () {
    //   return this.formatDate(this.date)
    // }
  },
  watch: {
    async selectedCountry (val) {
      if (val) {
        if (this.map.hasLayer(this.currentPolygon)) {
          this.map.removeLayer(this.currentPolygon)
        }
        this.currentPolygon = L.polygon(recurseArr(val.geometry.coordinates), {
          color: '#e2813b'
        })
        this.currentPolygon.on('click', this.polyClick)
        this.currentPolygon.addTo(this.map)

        const bounds = await this.currentPolygon.getBounds()
        this.map.fitBounds(bounds)
        this.map.setMaxBounds(bounds)
        setTimeout(() => {
          const zoom = this.map.getZoom()
          this.map.setMinZoom(zoom)
        }, 1000)
      }
    },
    date (val) {
      this.dateFormatted = this.formatDate(val)
    },
    start (e) {
      console.log(e)
    },
    end (e) {
      console.log(e)
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
  methods: {
    polyClick (e) {
      console.log(e)
      console.log(e.latlng)
    },
    formatDate (date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) {
        return null
      }

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
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

.incidentName{
    width: 500px;
}
</style>
