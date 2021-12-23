<template>
    <div class="table-content">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>{{ nameList }}</th>
                    <th>Category</th>
                    <th class="action-edit">Action</th>
                </tr>
            </thead>
            <tbody v-if="listData && listData.length > 0">
                <tr v-for="(item, index) in listData" :key="index" :class="{'item-active': item.id == idItem}" @click="selectedItem(item)">
                    <td> {{ item.id }} </td>
                    <td class="td-re">
                        {{ item.subject_name }}
                        <Input class="input-edit" v-if="isEdit && item.id == idItem" v-model="item.subject_name"/>
                    </td>
                    <!-- <td> {{ item.categoryDto.category }} </td> -->
                    <td class="td-re" > 
                        <div v-if="!isEdit || item.id != idItem"> {{ item.categoryDto.category }} </div>
                        <!-- <Input style="width: 75%" class="input-edit" v-if="isEdit && item.id == idItem" v-model="item.subjectDto.subject_name"/> -->
                        <Dropdown
                            v-if="isEdit && item.id == idItem"
                            class="pl-3 pr-3"
                            :title="category.categoryName"
                            :options="listCategory"
                            :keyName="'category'"
                            :keyID="'id'"
                            @required-data="getDataCategory"
                            :labelName="category.categoryName"
                            placeholder="Chọn Category"
                            @select="selectCategory"
                            @clear-select="clearCategory">
                        </Dropdown>
                        
                    </td>
                    <td class="action-edit" style="background-color: #f9fafa;">
                        <button v-if="!isEdit || item.id != idItem" class="d-btn d-btn-icon d-btn-primary" @click="actionEdit">
                            <i class="el-icon-edit"></i>
                            Edit
                        </button>
                        <button v-if="isEdit && item.id == idItem" class="d-btn d-btn-icon d-btn-success" @click="actionSaveDateEdit(index)">
                            <i class="el-icon-check"></i>
                            Save
                        </button>
                        <button class="d-btn d-btn-icon d-btn-danger pl-2" onClick="return confirm('Bạn có chắc muốn xóa bản ghi này?');" @click="deleteSubject(item)">
                          <i class="el-icon-delete" />
                          Delete
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
import Dropdown from '@/components/dropdown'

export default {
    components: {
        Input,
        Dropdown
    },
    props: {
        listData: {
            Type: Object,
            default: {},
        },
        nameList: {
            Type: String,
            default: '',
        },
        
    },
    data() {
        return {
            idItem: 0,
            isEdit: false,
            listCategory: null,
            category: {
                categoryID: null,
                categoryName: null
            },
            subjectData: {
                subject_name: null,
                category: {
                    id: null
                }
            },
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


        actionSaveDateEdit(index) {
            this.isEdit = false;
            // this.subjectData.subject_name = this.listData[index].subject_name
            this.subjectData.category.id = this.category.categoryID;
            this.$emit("saveDataEdit", this.subjectData, this.idItem);
            this.isEdit = false;
        },

        deleteSubject(item) {

            var item = this.listData.find(x => x.id == item.id);
            this.$emit("handleDelete", item, item.id);
        },

        getDataCategory() {
          var me = this;
          this.axios.get('http://34.126.110.103:8080/uetshare/category').then((response) => {
            if (response) {
                me.listCategory = response.data.categoryDtoList;
            }
          }).catch((error) => {
              console.log(error);
          });
        },

        selectCategory(data) {
            this.category.categoryName = data.category;
            this.category.categoryID = data.id;
        },

         clearCategory() {
            this.category.categoryName = null;
            this.category.categoryID = null;
        },
    },
}
</script>

<style scoped>
.table-content {
    width: 100%;
    height: auto;
    overflow: auto;
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
    width: 250px;
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
