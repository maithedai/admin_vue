<template>
    <div class="sidebar"
        :class="!isFullSize ? 'move-left' : (moveRight ? 'move-right' : '')"
        :style="{ 'min-width': isFullSize ? '230px' : '60px' }"
    >

        <div class="tab-wrap">
            <tab-item
                v-for="(tab, index) in tabList" :key="index"
                :tabItem="tab"
                :tabChildren="tab.children"
                :showLabel="showTabLabel"
                :activeTab="currentTab"
                @change="setCurrentTab"
            >
            </tab-item>
        </div>

        <div class="sidebar-collapse">
            <div class="button-collapse" type="button"
                @click="handleCollapse"
            >
                <img v-if="!isFullSize" src="@/assets/icon/arrow-right-double.png"/>
                <img v-else src="@/assets/icon/arrow-left-double.png"/>
            </div>
        </div>
    </div>
</template>

<script>
import TabItem from './tab-item.vue';
export default {
    data() {
        return {
            isFullSize: true,
            showTabLabel: true,
            moveRight: false,
            // tab hiện tại cần active vào
            currentTab: null,

            // danh sách tab
            tabList: [
                {
                  name: "Category",
                  baseUrl: "/category",
                  url: "/category",
                  // icon: "",
                  // iconActive: "",
                },
                {
                  name: "Subject",
                  baseUrl: "/subject",
                  url: "/subject",
                  // icon: "",
                  // iconActive: "",
                },
                {
                  name: "Exam document",
                  baseUrl: "/exam",
                  url: "/exam",
                  // icon: "",
                  // iconActive: "",
                },
            ]
        }
    },

    components: {
        TabItem,
    },

    created() {
        var userInfo = this.getUserInfo();
        
        this.setCurrentTab();
        // lấy trạng thái từ storage
        this.handleCollapse(true);
    },

    methods: {
        /**
         * Xử lý collapse
         */
        handleCollapse(fromStorage) {
            // nếu lấy trạng thái từ storage
            if(fromStorage == true) {
                this.isFullSize = localStorage.showFullSideBar == 1 ? true : false;
            }
            // không thì bắt sự kiện click
            else {
                this.isFullSize = !this.isFullSize;
                this.moveRight = true;
            }
            // lưu vào storage
            localStorage.showFullSideBar = this.isFullSize ? 1 : 0;

            if(this.isFullSize) {
                setTimeout(() => {
                    this.showTabLabel = this.isFullSize;
                }, 100)
            }
            else {
                this.showTabLabel = this.isFullSize;
            }
        },

        /**
         * set tab hiện tại theo url hoặc khi emit
         */
        setCurrentTab(itemTab) {
            // nếu tải lại trang
            if(!itemTab) {
                var currentUrl = this.$route.path.slice();

                var lastIndex = currentUrl.length;
                while (!this.currentTab && lastIndex != -1) {
                    this.tabList.forEach(parent => {
                        // kiểm tra tab cha trước
                        if(parent.url == currentUrl) {
                            this.currentTab = parent;
                        }
                        // kiểm tra tab con sau
                        if(!this.currentTab && parent.children) {
                            this.currentTab = parent.children.find(child => child.url == currentUrl);
                        }
                    })

                    lastIndex = currentUrl.lastIndexOf("/");
                    currentUrl = currentUrl.substring(0, lastIndex);
                }
            }
            // nếu là set lại khi emit
            else {
                this.currentTab = itemTab;
            }
        },
    }
}
</script>

<style scoped>
.sidebar {
    height: 100%;
    min-width: 280px;
    background-color: #EAEAEA;
    border: 1px solid #e6e6e6;
    border-top: 0;
    position: relative;
}

.sidebar-collapse {
    height: 60px;
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    border-top: 1px solid #CECECE;
}
.button-collapse {
    position: absolute;
    right: 16px;
}

.move-left {
    animation-name: move-left;
    animation-duration: .3s;
}
@keyframes move-left {
    from { min-width: 230px; }
    to { min-width: 60px; }
}
.move-right {
    animation-name: move-right;
    animation-duration: .3s;
}
@keyframes move-right {
    from { min-width: 60px; }
    to { min-width: 230px; }
}
</style>
