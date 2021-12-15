<template>
    <div class="loading-custom" v-if="visible">
        <div class="loader" 
            :style=" { 'color': loadingColor }"
        ></div>

        <div class="mt-2">{{ message }}</div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        message: {
            type: String,
            default: null,
        },
        loadingColor: {
            type: String,
            default: "#0DC5C1",
        },
    },
}
</script>

<style scoped>
.loading-custom {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 25px auto;
  font-size: 5px;
  position: relative;
  text-indent: -9999em;
  border-top: 3px solid rgba(0, 117, 255, 0.2);
  border-right: 3px solid rgba(0, 117, 255, 0.2);
  border-bottom: 3px solid rgba(0, 117, 255, 0.2);
  border-left: 3px solid #0075ff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>