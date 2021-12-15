<template>
    <div class="datepicker">
        <el-date-picker
            v-if="!dateRange"
            v-model="selectedValue"
            type="date"
            :placeholder="placeholder"
            :clearable="clearable"
            format="dd/MM/yyyy"
            @change="handleChange"
        >
        </el-date-picker>

        <el-date-picker v-else
            type="daterange"
            v-model="selectedValue"
            range-separator="-"
            format="dd/MM/yyyy"
            :clearable="clearable"
            start-placeholder="Từ ngày"
            end-placeholder="Đến ngày"
            @change="handleChange"
        ></el-date-picker>
    </div>
</template>

<script>
export default {
    data() {
        return {
           
        }
    },

    props: {
        // placeholder
        placeholder: {
            type: String,
            default: "dd/MM/yyyy"
        },
        value: {
            default: '',
        },
        clearable: {
            type: Boolean,
            default: true
        },
        dateRange: {
            type: Boolean,
            default: false
        },
        selectedValue:{
            default: ''
        }
    },

    methods: {
        handleChange(date) {
            this.$emit("select", date);
        }
    },
    watch: {
        value: {
            handler(val) {
                this.selectedValue = val;
            }
        },
    }
}
</script>

<style>

</style>