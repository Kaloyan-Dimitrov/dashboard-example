<template>
  <div id="app">
    <navigation v-on:saveDashboard="saveDashboard()"></navigation>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :minH="2"
      >
        Index: {{item.i}}
        <br />
        X: {{item.x}} Y: {{item.y}}
        <br />
        W: {{item.w}} H: {{item.h}}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import navigation from "./components/Navigation.vue";

export default {
  name: "App",
  // data: function() {
  //   return {
  //     layout: this.$store.state.layout
  //   };
  // },
  components: {
    navigation,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  methods: {
    layoutUpdatedEvent(newLayout) {
      this.$store.commit("layoutSave", newLayout);
    }
  },
  computed: {
    layout: function() {
      // if(this.$store.state.layout == null)
      return this.$store.state.layout;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.vue-grid-item {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  justify-content: center;
  align-items: center;
  display: flex;
  background: white;
  border: 2px solid black;
  cursor: grab;
}
</style>
