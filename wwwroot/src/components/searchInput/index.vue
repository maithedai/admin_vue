<template>
    <div class="search-input">
        <el-popover
            placement="bottom-start"
            :visible-arrow="false"
            :disabled="!remoteSearch"
        >
            <div slot="reference">
                <i class="el-icon-search icon-search"/>
                <input class="form-control custom-input"
                    :id="inputID"
                    :placeholder="placeholder"
                    v-model="value"
                    @input="$emit('input', value)"
                    @keyup.enter="onEnter"
                />
            </div>

            <div class="option-wrap" v-if="!loading && options && options.length > 0">
                <div class="option-item"
                    v-for="(item, index) in options" :key="index"
                    @click="handleSelect(item)"
                >
                    <slot name="option-name"
                        :data="item"
                        :index="index"
                    >
                        {{ item[labelName] }}
                    </slot>
                </div>
            </div>
            <div v-else-if="loading">
                Đang tải...
            </div>
            <div v-else>
                Không tìm thấy dữ liệu
            </div>
        </el-popover>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: "",
            oldValue: "",
            inputID: null,
        }
    },

    props: {
        placeholder: {
            type: String,
            default: null,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        // cho phép gọi service lấy dữ liệu tìm kiếm
        remoteSearch: {
            type: Boolean,
            default: false,
        },
        // mảng các lựa chọn
        options: {
            type: Array,
            default: null
        },
        // tên property để hiển thị
        labelName: {
            type: String,
            default: "label"
        },
        loading: {
            type: Boolean,
            default: false
        },
    },

    created() {
        this.inputID = this.createUUID();
    },

    methods: {
        /**
         * focus vào input
         * Cre: pqhuy 08/04/2021
         */
        handleAutofocus() {
            if(this.autofocus) {
                let vm = this;
                setTimeout(() => {
                    window.$(`input#${vm.inputID}`).focus();
                }, 20)
            }
        },
        /**
         * xử lý chọn
         * Cre: pqhuy 09/04/2021
         */
        handleSelect(data) {
            this.$emit("select", data);
        },
        /**
         * xử lý ấn enter
         * Cre: pqhuy 19/04/2021
         */
        onEnter() {
            if(this.value != this.oldValue) {
                this.oldValue = this.value;
                this.$emit("enter-press");
            }
        },
    },

    mounted() {
        this.handleAutofocus();
    }
}
</script>

<style scoped>
.search-input {
    position: relative;
}
.custom-input {
    padding-left: 30px;
}
.icon-search {
    position: absolute;
    top: 13px;
    left: 11px;
    color: #A1A1A1;
}

.option-wrap {
    min-width: 300px;
    max-height: 270px;
    overflow: auto;
}
.option-item {
    cursor: pointer;
    border-radius: 4px;
    padding: 8px 8px;
    width: 100%;
}
.option-item:hover {
    background-color: #F5F5F5;
}
</style>