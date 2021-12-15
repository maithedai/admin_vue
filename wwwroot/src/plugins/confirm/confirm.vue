<template>
    <ModelLayout
        v-if="visible"
        :width="'500px'"
    >
        <template slot="content">
            <div class="confirm-wrap">
                <div class="header">
                    <div class="title">{{ title }}</div>
                    <button class="d-btn d-btn-only-icon close-confirm-btn"
                        @click="onClose"
                    >
                        <i class="el-icon-close fs-20p"></i>
                    </button>
                </div>

                <div class="body">
                    <img class="icon mr-3" :src="require('@/assets/icon/' + getIconByType())"/>
                    <div class="message" v-html="message">
                    </div>
                </div>

                <div class="footer">
                    <button v-for="(btn, index) in buttons" :key="index"
                        class="d-btn"
                        :class="[btn.class,
                                index > 0 ? 'ml-3' : '']"
                        @click="onClick(btn.callback, btn.params)"
                    >
                        {{ btn.label }}
                    </button>
                </div>
            </div>
        </template>
    </ModelLayout>
</template>

<script>
import ModelLayout from "@/components/model-layout";
export default {
    data() {
        return {
            visible: true,
        }
    },

    props: {
        type: {
            type:String,
            default: null
        },
        title: {
            type:String,
            default: null
        },
        message: {
            type:String,
            default: null
        },
        buttons: {
            type: Array,
            default: null
        }
    },

    components: {
        ModelLayout
    },

    created() {
    },

    methods: {
        onClose() {
            this.visible = false;
        },

        onClick(callback, params) {
            if(callback != null && callback != undefined) {
                if(params != null && params != undefined && params.length > 0) {
                    switch (params.length) {
                        case 1:
                            callback(params[0]);
                            break;
                        case 2:
                            callback(params[0], params[1]);
                            break;
                        case 3:
                            callback(params[0], params[1], params[2]);
                            break;
                        case 4:
                            callback(params[0], params[1], params[2], params[3]);
                            break;
                        case 5:
                            callback(params[0], params[1], params[2], params[3], params[4]);
                            break;
                        case 6:
                            callback(params[0], params[1], params[2], params[3], params[4], params[5]);
                            break;
                    }
                }
                else {
                    callback();
                }
            }
            // đóng popup
            this.onClose();
        },

        getIconByType() {
            switch(this.type) {
                case "warning":
                default:
                    return "warning.png";

                case "error":
                    return "error.png";
            }
        }
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 24px 0 24px;
}
.header .title {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
}
.header .close-confirm-btn {
    border-color: #fff;
    border-radius: 8px;
}
.header .close-confirm-btn:hover {
    background-color: #e5e5e5;
}

.body {
    padding: 12px 24px 12px 24px;
    display: flex;
}
.body .icon {
    width: 40px;
    height: 40px;
}

.footer {
    height: 60px;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    border-radius: 0 0 8px 8px;
    justify-content: flex-end;
    padding: 0 24px;
}
</style>