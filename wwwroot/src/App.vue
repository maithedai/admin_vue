<template>
  <div id="app">
    <Loading />
    <layout />
  </div>
</template>

<script>
  import layout from "@/layout";
  import Loading from "@/components/loading/FullScreenLoading";

  export default {
    name: 'App',
    components: {
      layout,
      Loading,
    },

    data() {
      return {
      }
    },

    created() {

    },

    methods: {

    },
  }
</script>

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100vh;
  }

  * {
    font-family: RobotoRegular;
    font-size: 13px;
    font-weight: 400;
  }
</style>