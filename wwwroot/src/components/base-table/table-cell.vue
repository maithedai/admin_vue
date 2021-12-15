<template>
    <span class="table-cell">
        <!-- các nội dung thường -->
        <span v-if="cellProperty ? checkType(cellProperty.type) : false">
            {{ getCellContent() }}
        </span>

        <!-- nội dung hình ảnh -->
        <span v-else-if="cellProperty && imageType.includes(cellProperty.type)">
            <el-popover placement="right" trigger="hover"
                :disabled="!row[cellProperty.propertyName]"
                :visible-arrow="false"
            >
                <img style="height:200px;" :src="row[cellProperty.propertyName]"/>
                <span slot="reference">
                    <img v-if="row[cellProperty.propertyName]" style="height:20px;" :src="row[cellProperty.propertyName]"/>
                    <span v-else>---</span>
                </span>
            </el-popover>
        </span>

        <!-- nội dung khác thì xử lý bằng slot -->
        <slot name="slot-cell" v-else>
        </slot>
    </span>
</template>

<script>
export default {
    data() {
        return {
            // các loại dữ liệu được xử lý mặc định
            dataType: ["", "string", "decimal", "date", 'time', 'datetime'],
            // nội dung hình ảnh
            imageType: ["image"],
        }
    },

    props: {
        cellProperty: {
            type: Object,
            default: null
        },
        row: {
            type: Object,
            default: null
        },
    },

    methods: {
        checkType(type) {
            return this.dataType.includes(type);
        },

        getCellContent() {
            let type = this.cellProperty.type;
            let value = this.row[this.cellProperty.propertyName];
            let result = "";

            if(!this.isNullOrUndefined(type) && this.checkType(type)) {
                switch(type) {
                    case "":
                    case "string":
                        result = this.getString(value);
                        break;

                    case "decimal":
                        result = this.getDecimal(value);
                        break;

                    case "date":
                        result = this.getDate(value);
                        break;

                    case "time":
                        result = this.getTime(value);
                        break;

                    case "datetime":
                        result = this.getDateTime(value);
                        break;
                }
            }
            return result;
        },

        // convert dữ liệu string
        getString(val) {
            return !this.isNullOrUndefined(val) ? val : "---";
        },

        // convert dữ liệu số thập phân
        getDecimal(val) {
            return !this.isNullOrUndefined(val) ? this.convertDecimal(val) : "---";
        },

        // convert dữ liệu ngày tháng
        getDate(val) {
            return !this.isNullOrUndefined(val) ? this.convertDate(val) : "---";
        },

        // convert dữ liệu giờ phút giây, ngày tháng năm
        getTime(val) {
          return !this.isNullOrUndefined(val) ? this.convertTime(val) : "---";
        },

        // convert dữ liệu giờ phút, ngày tháng năm hh:mm--dd/mm/yyyy
        getDateTime(val) {
          return !this.isNullOrUndefined(val) ? this.convertDateTime(val) : "---";
        }
    }
}
</script>

<style scoped>
</style>
