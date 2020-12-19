<template>
  <v-toolbar>
    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <transition-group
      name="expand"
      group
      tag="v-toolbar-items"
      appear
      appear-active-class="fade-enter-active"
      :css="false"
      :before-enter="beforeEnter"
      :enter="enter"
      :leave="leave"
    >
      <v-toolbar-items
        class="hidden-sm-and-down"
        v-for="item in itemz"
        :key="item.title"
        @click="handleNavClick(item.title)"
      >
        <v-btn text>{{ item.title }}</v-btn>
      </v-toolbar-items>
    </transition-group>
  </v-toolbar>
</template>
<script>
export default {
  props: ["myMap"],
  components: {
    // searchBar
  },
  data() {
    return {
      items: [
        { title: "Map", icon: "map" },
        //   { title: 'About', icon: 'question_answer' },
        { title: "Reston", icon: "home", type: "map" },
        { title: "Mike's House", icon: "home", type: "map" },
        { title: "My House", icon: "home", type: "map" },
        { title: "Colorado Square", icon: "map", type: "map" }
      ],
      right: null,

      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500
      // https://tigerweb.geo.census.gov/arcgis/sdk/rest/index.html#/Query_Map_Service_Layer/02ss0000000r000000/
      // http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/40
    };
  },
  methods: {
    handleNavClick(title) {
      switch (title) {
        case "Map":
          this.$router.push("/map");
          break;
        case "Reston":
          this.handleReston();
          break;
        case "Mike's House":
          this.handleMike();
          break;
        case "My House":
          this.handleMyHouse();
          break;
        case "Colorado Square":
          this.handleColorado();
          break;
        default:
          alert("dont know that one chief");
      }
    },
    recurseArr(newArr) {
      newArr.forEach(item => {
        if (item.length == 2) {
          return item.reverse();
        } else {
          this.recurseArr(item);
        }
      });
    },
    handleMike() {
      // {lat: 39.135652755862196, lng: -76.64625871421225}
      this.myMap.panTo({ lon: -76.64625871421225, lat: 39.135652755862196 });
      this.myMap.zoomIn(11, { animate: true });
    },
    handleMyHouse() {
      // LatLng {lat: 39.02720626044225, lng: -77.1525790916042}
      this.myMap.panTo({ lon: -77.1525790916042, lat: 39.02720626044225 });
      this.myMap.zoomIn(11, { animate: true });
    },
    handleReston() {
      // {lat: 38.95885734141066, lng: -77.35224982404915}
      this.myMap.panTo({ lon: -77.35224982404915, lat: 38.95885734141066 });
      this.myMap.zoomIn(11, { animate: true });
    },
    handleColorado() {
      // create a red polygon from an array of LatLng points
      var latlngs = [
        [37, -109.05],
        [41, -109.03],
        [41, -102.05],
        [37, -102.04]
      ];
      var polygon = L.polygon(latlngs, { color: "red" }).addTo(this.myMap);
      // zoom the map to the polygon
      this.myMap.fitBounds(polygon.getBounds());
    },

    beforeEnter: function(el) {
      el.style.opacity = 0;
    },
    enter: function(el, done) {
      var vm = this;
      Velocity(
        el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: function() {
            done();
            if (!vm.stop) vm.show = false;
          }
        }
      );
    },
    leave: function(el, done) {
      var vm = this;
      Velocity(
        el,
        { opacity: 0 },
        {
          duration: this.fadeOutDuration,
          complete: function() {
            done();
            vm.show = true;
          }
        }
      );
    }
  },
  computed: {
    itemz() {
      let itemzz = this.items.filter(item => {
        if (
          (item.type !== "map" && !this.myMap) ||
          (item.type == "map" && this.myMap)
        )
          return item;
      });
      return itemzz;
      //if="(item.type !== 'map' && !myMap) || (item.type == 'map' && myMap)"
    },
    title() {
      if (this.myMap) {
        return "Burn Map";
      }
    }
  }
};
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
</style>
