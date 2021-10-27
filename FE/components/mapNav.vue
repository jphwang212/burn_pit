<template>
  <v-toolbar>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-select
      v-model="selectedYear"
      :items="years"
      label="Selected Year"
      item-text="name"
      return-object
      single-line
      class="c-select"
    />
    <v-spacer />
    <v-btn dark color="white" class="black--text" @click="clear">
      Clear
    </v-btn>
    <v-spacer />
    <v-select
      v-model="selectedCountry"
      :items="countries"
      label="Countries"
      item-text="name"
      return-object
      single-line
      class="c-select"
    />
    <div id="map" />
  </v-toolbar>
</template>
<script>
export default {
  components: {
  },
  props: ['myMap', 'countries'],
  data () {
    return {
      right: null,

      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500,
      selectedCountry: 'All',
      selectedYear: 'All'
      // https://tigerweb.geo.census.gov/arcgis/sdk/rest/index.html#/Query_Map_Service_Layer/02ss0000000r000000/
      // http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/40
    }
  },
  computed: {
    title () {
      return 'Burn Map'
    },
    years () {
      return this.$store.getters.years
    }
  },
  watch: {
    selectedCountry (val) {
      if (val && val !== 'All') {
        this.myMap.fitBounds(val.bounds)
      }
    },
    selectedYear (val) {
      this.$store.commit('selectedYear', val)
    }
  },
  mounted () {},
  methods: {
    handleNavClick (item) {
      this.myMap.fitBounds(item.bounds)
    },
    clear () {
      this.selectedYear = null
      this.$store.commit('selectedYear', null)
      this.selectedCountry = 'All'
    }
  }
}
</script>
<style>
#nav {
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-active {
  animation: go 2s;
}
.c-select{
  margin-top: 20px !important;
}
</style>
