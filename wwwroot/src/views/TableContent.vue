<template>
    <div class="table-content">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>{{ nameList }}</th>
                    <th>Time</th>
                    <th class="action-edit">Action</th>
                </tr>
            </thead>
            <tbody v-if="listData && listData.length > 0">
                <tr v-for="(item, index) in listData" :key="index" :class="{'item-active': item.id == idItem}" @click="selectedItem(item)">
                    <td> {{ item.id }} </td>
                    <td class="td-re"> 
                        {{ item.category }} 
                        <Input class="input-edit" v-if="isEdit && item.id == idItem" v-model="item.category"/>
                    </td>
                    <td> {{ item.time }} </td>
                    <td class="action-edit" style="background-color: #f9fafa;">
                        <button v-if="!isEdit || item.id != idItem" class="d-btn d-btn-icon d-btn-primary" @click="actionEdit">
                            <i class="el-icon-edit"></i>
                            Edit
                        </button>
                        <button v-if="isEdit && item.id == idItem" class="d-btn d-btn-icon d-btn-success" @click="actionSaveDateEdit">
                            <i class="el-icon-check"></i>
                            Save
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="tb-empty" v-if="!listData || listData.length == 0">
            <img src="https://actappg2.misacdn.net/img/bg_report_nodata.76e50bd8.svg" class="nodata-img">
            <div class="text-body-content">Không có dữ liệu</div>
        </div>
    </div>
</template>

<script>

import Input from "../components/Input.vue"

export default {
    components: {
        Input,
    },
    props: {
        listData: {
            Type: Object,
            default: {},
        },
        nameList: {
            Type: String,
            default: '',
        }
    },
    data() {
        return {
            idItem: 0,
            isEdit: false,
        }
    },

    created() {

    },

    mounted() {

    },

    methods: {
        actionEdit() {
            this.isEdit = true;
        },

        selectedItem(item) {
            this.idItem = item.id;
        },

        deleteCategory() {
            console.log(this.idItem);
        },
        
        actionSaveDateEdit() {
            var item = this.listData.find(x => x.id == this.idItem);
            this.$emit("saveDataEdit", item, this.idItem);
            this.isEdit = false;
        }
    },
}
</script>

<style scoped>
.table-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    border-bottom: 1px solid #ccc;
}

.table-content table {
    width: 100%;
}

thead th {
    position: sticky;
    top: 0;
    background-color: #eceef1;
    color: #000;
    text-align: center;
    border-right: 1px solid #ccc;
    padding: 0px;
    height: 34px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(134, 134, 134, 0.3);
  border-radius: 10px;
  background-color: #FFFFFF;
}

thead tr th {
    font-weight: 600;
    font-size: 16px
}

td {
  /* padding-left: 10px; */
  border-bottom: 1px solid #ccc;
  border-right: 1px dotted #ccc;
}

tr:hover {
  background-color: rgb(245, 245, 245);
}

td {
  padding: 10px;
}

.action-edit {
    width: 150px;
    text-align: center;
}

.item-active {
    background-color: #95b9e5 !important;
}

.tb-empty {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.td-re {
    position: relative;
}

.input-edit {
    position: absolute;
    top: 10px;
}

</style>