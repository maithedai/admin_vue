<template>
    <div class="layout">
        <!-- <topbarGetting v-if="!isLoggedIn"></topbarGetting> -->
        <topbar            
        ></topbar>

        <main>
            <sidebar v-if="!isUserRouter && !isGettingRouter"></sidebar>

            <!-- Nội dung chính -->
            <div class="main-container">
                <router-view :key="$route.path">
                </router-view>
            </div>
        </main>
    </div>
</template>

<script>
import sidebar from "./sidebar/index";
import topbar from "./topbar/index";
import topbarGetting from '@/layout/getting-started/topbar';
import { USER_ROUTER, GETTING_STARTED_ROUTER } from "@/enums/routerEnum.js";
import authHelper from "@/helpers/authorize.js";

export default {
    data() {
        return {
            // đã đăng nhập
            isLoggedIn: false,
            // thông tin user sau khi đăng nhập
            userInfo: null,
        }
    },

    components: {
        sidebar,
        topbar,
        topbarGetting
    },

    created() {
        this.checkToken();
        this.getUserInformation();
    },

    methods: {
        /**
         * kiểm tra đã đăng nhập chưa
         */
        checkToken(data) {
            if(data || authHelper.getToken()) {
                this.isLoggedIn = true;
            }
            else {
                this.isLoggedIn = false;
            }
        },

        /**
         * lấy thông tin user nếu đã đăng nhập
         */
        getUserInformation() {
          this.userInfo = this.getUserInfo();
        },
    },

    computed: {
        // check xem url hiện tại có phải trang user không
        isUserRouter() {
            var check = USER_ROUTER.findIndex(ele => ele.name == this.$route.name);
            return check != -1;
        },
        // check xem url hiện tại có phải luồng getting started không
        isGettingRouter() {
            var check = GETTING_STARTED_ROUTER.findIndex(ele => ele.name == this.$route.name);
            return check != -1;
        },
    },

    mounted() {
        this.$eventBus.$on("logged-in", this.checkToken);
    },

    destroyed() {
        this.$eventBus.$off("logged-in");
    },
}
</script>

<style scoped>
.layout {
    width: 100%;
    height: 100%;
    background-color: #F8F8F8;
}

main {
    height: calc(100% - 60px);
    display: flex;
}
.main-container {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: auto;
}
</style>
