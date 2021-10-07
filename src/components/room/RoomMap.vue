<template>
  <h3>{{ $t("pages.room.map") }}</h3>

  <div id="map">
    <div
      id="mapContainer"
      style="height: 600px; width: 100%"
      ref="hereMap"
    ></div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  props: {
    center: {
      type: Object,
      default: () => ({ lat: 11.9348182, lng: 108.4646493 }),
    },
  },

  setup(props) {
    let platform = ref(null);
    let apikey = ref(process.env.VUE_APP_MAP_APIKEY);
    let hereMap = ref(null);

    watchEffect(
      () => {
        if (hereMap.value) {
          initMap();
        }
      },
      {
        flush: "post",
      }
    );

    function initializeHereMap() {
      const mapContainer = hereMap.value;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = platform.value.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 10,
        center: props.center,
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, maptypes);

      // add marker
      var marker = new H.map.Marker(props.center);
      map.addObject(marker);
      // End rendering the initial map
    }

    function initMap() {
      const initPlatform = new window.H.service.Platform({
        apikey: apikey.value,
      });
      platform.value = initPlatform;
      initializeHereMap();
    }

    return {
      hereMap,
    };
  },
};
</script>