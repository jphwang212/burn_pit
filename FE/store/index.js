import Vue from 'vue'
import Vuex from 'vuex'
// import api from "../api/generic";

import axios from 'axios'
import { json } from '../countries'
import { recurseArr } from '../utils'

Vue.use(Vuex)

const state = {
  // [{name: "" id: ''}]
  lastReqTime: null,
  newGeo: null,
  newGeoNum: null,
  newMultiGeoNum: null,
  newMultiGeo: null,
  bases: null,
  countries: null,
  selectedYear: null
}

const getters = {
  newGeo: (state) => {
    return state.newGeo
  },
  newGeoNum: (state) => {
    return state.newGeo
  },
  newMultiGeo: (state) => {
    return state.newMultiGeo
  },
  getCountries: (state) => {
    return state.countries
  },
  getBases: (state) => {
    return state.bases
  },

  shownCountries: (state, getters) => {
    if (getters.shownBases) {
      const countries = {}
      getters.shownBases.forEach((base) => {
        countries[base.country] = { name: base.country, cords: state.countries[base.country.toLowerCase()] }
      })
      return Object.keys(countries).map((countryKey) => {
        return countries[countryKey]
      })
    } else {
      return null
    }
  },
  shownBases: (state) => {
    if (state.selectedYear) {
      const filteredBases = state.bases.filter((base) => {
        const start = base.startDate.split('/')[2] <= state.selectedYear
        const stop = state.selectedYear <= base.stopDate.split('/')[2]
        if (start && stop) {
          return base
        }
      })
      return filteredBases
    } else {
      return state.bases
    }
  },
  years: (state) => {
    if (state.bases) {
      let max, min
      state.bases.forEach((base) => {
        const lmin = base.startDate.split('/')[2]
        const lmax = base.stopDate.split('/')[2]
        if (!min || min > lmin) {
          min = lmin
        }
        if (!max || max < lmax) {
          max = lmax
        }
      })
      const years = []
      const count = max - min
      for (let i = 0; i < count; i++) {
        years.push(parseInt(min, 10) + i)
      }
      return years
    } else {
      return []
    }
  }
}

const actions = {
  setTime (state) {
    if (!state.lastReqTime) {
      state.lastReqTime = Date.now()
      return
    }
    if (state.lastReqTime && state.lastReqTime + 3600000 >= Date.now()) {
      // api.getCreds();
      state.lastReqTime = Date.now()
    } else {
      console.log('within time for archGis')
    }
  },
  getBases ({ commit }) {
    const query = `query Base {
        base {
            name
            country
            latLong
            startDate
            stopDate
            source
            sourceUrl
        }
    }`
    const variables = {}
    return axios
      .post(`${process.env.BE_URL}/graphql`, {
        variables,
        query
      })
      .then((resp) => {
        if (resp && resp.data) {
          commit('setBases', resp.data.data.base)

          const countries = {}

          resp.data.data.base.forEach((b) => {
            countries[b.country.toLowerCase()] = 1
          })

          json.features.forEach((g) => {
            if (typeof g.properties.name === 'string') {
              if (countries[g.properties.name.toLowerCase()]) {
                countries[g.properties.name.toLowerCase()] = recurseArr(
                  g.geometry.coordinates
                )
              }
            } else {
              g.properties.name.forEach((name) => {
                if (countries[name.toLowerCase()]) {
                  countries[name.toLowerCase()] = recurseArr(
                    g.geometry.coordinates
                  )
                }
              })
            }
          })
          commit('setCountries', countries)
        }
      })
  }
}

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  setGeoForMap (state, geo) {
    state.newGeoNum = Math.random()
    state.newGeo = geo
  },
  setMultipleGeoForMap (state, geos) {
    state.newMultiGeoNum = Math.random()
    state.newMultiGeo = geos
  },
  setCountries (state, countries) {
    state.countries = countries
  },
  setBases (state, bases) {
    state.bases = bases
  },
  selectedYear (state, year) {
    state.selectedYear = year
  }
}

const createStore = () =>
  new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
export default createStore
