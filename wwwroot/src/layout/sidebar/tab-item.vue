<template>
    <div class="tab-item-wrapper">
        <el-popover
            placement="right-start"
            trigger="hover"
            :title="tabItem.name"
            :open-delay="0"
            :close-delay="0"
            :disabled="isShowChild || !tabChildren"
            :visible-arrow="false"
            @show="isHover = true"
            @hide="isHover = false"
        >

            <!-- nội dung hover của tab cha -->
            <div class="child-item"
                v-for="(childItem, index) in tabChildren" :key="index"
                @click="handleSelectTab(childItem)"
            >
                {{ childItem.name }}
            </div>



            <!-- tab chính -->
            <div slot="reference"
                class="tab-item"
                :class="[!isShowChild && isActive(tabItem.url) ? 'active-tab' : '',
                        isShowChild ? 'tab-item-parent' : '',
                        isHover ? 'hover' : '']"
                @click="handleSelectTab(tabItem)"
            >
                <div class="block" 
                    :class="[!isShowChild && isActive(tabItem.url) ? 'active-block' : '',
                            isShowChild ? 'default-block' : '']"
                ></div>

                <!-- icon tab -->
                <el-tooltip placement="right" effect="light"
                    :content="tabItem.name"
                    :disabled="showLabel || tabChildren != null"
                >
                    <div class="tab-icon">
                        <img v-if="((!isShowChild && isActive(tabItem.url)) || isShowChild) && tabItem.iconActive"
                            :src="require('@/assets/icon/' + tabItem.iconActive)"/>
                        <img v-else-if="tabItem.icon"
                            :src="require('@/assets/icon/' + tabItem.icon)"/>
                    </div>
                </el-tooltip>

                <!-- tên tab -->
                <label v-if="showLabel">{{ tabItem.name }}</label>
            </div>



            <!-- tab con -->
            <span slot="reference"
                v-if="isShowChild"
            >
                <div class="tab-item tab-item-child"
                    v-for="(childItem, index) in tabChildren" :key="index"
                    :class="isActive(childItem.url) ? 'active-tab' : ''"
                    @click="handleSelectTab(childItem)"
                >
                    <div class="block" :class="isActive(childItem.url) ? 'active-block' : 'default-block'"></div>
                    
                    <!-- icon tab -->
                    <el-tooltip placement="right" effect="light"
                        :content="childItem.name"
                        :disabled="showLabel"
                    >
                        <div class="tab-icon">
                            <img v-if="isActive(childItem.url) && childItem.iconActive"
                                :src="require('@/assets/icon/' + childItem.iconActive)"/>
                            <img v-else-if="childItem.icon"
                                :src="require('@/assets/icon/' + childItem.icon)"/>
                        </div>
                    </el-tooltip>
                        
                    <!-- tên tab -->
                    <label v-if="showLabel">{{ childItem.name }}</label>
                </div>
            </span>
        </el-popover>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // đang hover vào tab nào đó
            isHover: false,
        }
    },

    props: {
        tabItem: {},
        tabChildren: {
            default: null
        },
        // chế độ hiển thị collapse hay không
        showLabel: {
            type: Boolean,
            default: false
        },
        // tab hiện tại cần active vào
        activeTab: {
            type: Object,
            default: false
        },
    },

    created() {
    },

    methods: {
        /**
         * Kiểm tra url hiện tại có phải thuộc tab active hay không
         */
        isActive(url) {
            return url == this.activeTab.url;
        },

        /**
         * xử lý chọn tab
         */
        handleSelectTab(item) {
            if(item.isPending) {
                this.$message.warning("Chức năng đang phát triển.");
            }
            else {
                if(item.url != this.$route.path){
                    this.$router.push(item.url);
                }
                this.isHover = false;

                this.$emit("change", item);
            }
        },
    },

    computed: {
        /**
         * kiểm tra xem có show tab con hay không
         */
        isShowChild() {
            return this.tabChildren && this.$route.path.includes(this.tabItem.baseUrl);
        },
    },
}
</script>

<style scoped>
.tab-item {
    height: 48px;
    display: flex;
    align-items: center;
    cursor: pointer;
    outline: none;
}
.tab-item label {
    margin: 0;
    color: #000;
}
.tab-item * {
    cursor: pointer;
}
.tab-item:hover, .tab-item.hover, .tab-item.active-tab {
    background-color: #CFCFCF;
}
.tab-item-child, .tab-item-parent {
    background-color: #DCDCDC;
}
.tab-item.active-tab label, .tab-item-parent label {
    font-weight: bold;
}

.child-item {
    height: 30px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 0 8px;
    cursor: pointer;
}
.child-item:hover {
    background-color: #F5F5F5;
}
.child-item:active {
    background-color: #DCDCDC;
}


.block {
    width: 4px;
    height: 100%;
    margin-right: 12px;
}
.active-block {
    background-color: #34A0CD;
}
.default-block {
    background-color: #B0B0B0;
}

.tab-icon {
    min-width: 30px;
    margin-right: 8px;
    background-repeat: no-repeat;
    color: transparent;
    background-position: center;
    outline: none;
}

.el-popover {
    margin: 0!important;
}
</style>