<template>
    <div class="dropdown">
        <el-select 
            :value="title" 
            :filterable="filterable"
            :placeholder="placeholder"
            :loading="loading"
            :clearable="clearable"
            :class="invalid ? 'invalid' : ''"
            @change="handleSelect"
            @visible-change="openDropdown"
            @clear="clearSelect"
        >
            <el-option
                v-for="item in options"
                :key="item[keyID]"
                :label="item[keyName]"
                :value="item[keyID]"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // key của option đang được chọn
            keySelected: null,
            // đã yêu cầu gọi dữ liệu từ db hay chưa
            isRequiredData: false,
        }
    },

    props: {
        // mảng các lựa chọn
        options: {
            type: Array,
            default: null
        },
        // giá trị hiển thị
        title: {
            type: String,
            default: null
        },
        // tên property để hiển thị
        labelName: {
            type: String,
            default: "label"
        },
        // tên của khóa chính để làm key
        keyName: {
            type: String,
            default: "value"
        },
        keyID: {
            type: String,
            default: null
        },
        // cho phép nhập để filter
        filterable: {
            type: Boolean,
            default: true
        },
        // hiển thị loading
        loading: {
            type: Boolean,
            default: false
        },
        // placeholder
        placeholder: {
            type: String,
            default: "Chọn một lựa chọn"
        },
        // mặc định chọn option đầu tiên nếu chưa chọn
        autoSelectFirst: {
            type: Boolean,
            default: false
        },
        // có đang chọn giá trị invalid không
        invalid: {
            type: Boolean,
            default: false
        },
        // có thể xóa
        clearable: {
            type: Boolean,
            default: true
        },
    },

    created() {
        this.setSelectByTitle(this.title);
    },

    methods: {
        /**
         * Xử lý ấn chọn
         * Cre: pqhuy 27/03/2021
         */
        handleSelect(optionKey){
            if(optionKey) {
                var option = this.options.find(ele => ele[this.keyID] == optionKey);
                this.$emit("select", option);
            }
        },

        /**
         * Xử lý tự chọn vào option theo title
         * Cre: pqhuy 01/04/2021
         */
        setSelectByTitle(title){
            if(this.options && title) {
                // tìm option mặc định theo title
                var defaultOption = this.options.find(ele => ele[this.labelName] == title);
                
                // nếu không tìm thấy option nào thì mặc định chọn cái đầu tiên
                var isEmitFirstTime = false;
                if(!defaultOption && this.autoSelectFirst) {
                    defaultOption = this.options[0];
                    isEmitFirstTime = true;
                }
                // gán giá trị
                if(defaultOption) {
                    this.keySelected = defaultOption[this.keyName];
                }
                // emit nếu là lần đầu
                if(isEmitFirstTime) {
                    this.handleSelect(this.keySelected);
                }
            }  
        },

        openDropdown(isOpen) {
            // nếu chưa có dữ liệu và mở dropdown lần đầu thì emit yêu cầu dữ liệu
            if(isOpen && !this.options && !this.isRequiredData) {
                this.$emit("required-data");
                this.isRequiredData = true;
            }
        },

        /**
         * emit xóa lựa chọn
         * Cre: pqhuy 11/04/2021
         */
        clearSelect() {
            this.$emit("clear-select");
        },
    },

    watch: {
        title(val) {
            if(val) {
                this.setSelectByTitle(val);
            }
        },
    }
}
</script>

<style>

</style>