import Vue from "vue";
import Vuex from "vuex";
// import api from "../api/generic";

Vue.use(Vuex);

const state = {
  // [{name: "" id: ''}]
  lastReqTime: null,
  newGeo: null,
  newGeoNum: null,
  newMultiGeoNum: null,
  newMultiGeo: null
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
  goToGeo(state) {}
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
