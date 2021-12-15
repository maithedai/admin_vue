<template>
    <div class="full-screen-loading d-none">
        <div class="full-screen-loader"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.full-screen-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999999999;
    background-color: rgba(0,0,0,.3);
    display: flex;
    align-items: center;
    justify-content: center;
}
.full-screen-loader,
.full-screen-loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.full-screen-loader {
  margin: 60px auto;
  font-size: 4px;
  position: relative;
  text-indent: -9999em;
  border-top: 3px solid rgba(255, 255, 255, 0.2);
  border-right: 3px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
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