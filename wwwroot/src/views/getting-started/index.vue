<template>
    <div class="getting-started">
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: null,
        }
    },

    created() {
        this.userInfo = this.getUserInfo();
    },

    computed: {
        /**
         * lấy url hiện tại để hiển thị active tab
         */
        getActiveUrl() {
            return this.$route.path;
        },
    }
}
</script>

<style scoped>
.getting-started {
    width: 100vw;
}

</style>
