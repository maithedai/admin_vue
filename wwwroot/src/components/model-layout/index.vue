<template>
    <div class="model">
        <div class="model-layout"
            :style="{ 'width': width }"
        >
            <slot name="content">

            </slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        width: {}
    }
}
</script>

<style scoped>
.model {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999999999;
    background-color: rgba(0,0,0,.3);
}
.model-layout {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 300px;
    min-height: 100px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    background-color: #fff;
}

</style>