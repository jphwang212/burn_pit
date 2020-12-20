import Vue from "vue";
import Vuex from "vuex";
// import api from "../api/generic";

import axios from "axios";

Vue.use(Vuex);

const state = {
  // [{name: "" id: ''}]
  lastReqTime: null,
  newGeo: null,
  newGeoNum: null,
  newMultiGeoNum: null,
  newMultiGeo: null,
  bases: null,
  countries: null
};

const getters = {
  newGeo: state => {
    return state.newGeo;
  },
  newGeoNum: state => {
    return state.newGeo;
  },
  newMultiGeo: state => {
    return state.newMultiGeo;
  },
  getCountries: state => {
    return state.countries;
  },
  getBases: state => {
    return state.bases;
  }
};

const actions = {
  setTime(state, mutations) {
    if (!state.lastReqTime) {
      state.lastReqTime = Date.now();
      return;
    }
    if (state.lastReqTime && state.lastReqTime + 3600000 >= Date.now()) {
      // api.getCreds();
      state.lastReqTime = Date.now();
    } else {
      console.log("within time for archGis");
    }
  },
  getBases({ state, commit }) {
    const query = `query Base {
        base {
            name
            country
            latLong
        }
    }`;
    const variables = {};
    return axios
      .post("http://localhost:3002/graphql", {
        variables,
        query
      })
      .then(resp => {
        if (resp && resp.data) {
          console.log(resp.data.data.base);
          commit("setBases", resp.data.data.base);

          const countries = {};

          resp.data.data.base.forEach(b => {
            countries[b.country.toLowerCase()] = 1;
          });
          commit("setCountries", countries);
        }
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  setGeoForMap(state, geo) {
    state.newGeoNum = Math.random();
    state.newGeo = geo;
  },
  setMultipleGeoForMap(state, geos) {
    state.newMultiGeoNum = Math.random();
    state.newMultiGeo = geos;
  },
  setCountries(state, countries) {
    state.countries = countries;
  },
  setBases(state, bases) {
    state.bases = bases;
  }
};

const createStore = () =>
  new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  });
export default createStore;
