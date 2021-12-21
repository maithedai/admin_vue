<template>
    <div class="table-content">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>{{ nameList }}</th>
                    <th>File</th>
                    <th>Type</th>
                    <th>Subject</th>
                    <th class="action-edit">Action</th>
                </tr>
            </thead>
            <tbody v-if="listData && listData.length > 0">
                <tr v-for="(item, index) in listData" :key="index" :class="{'item-active': item.id == idItem}" @click="selectedItem(item)">
                    <td> {{ item.id }} </td>
                    <td class="td-re">  
                        <div v-if="!isEdit || item.id != idItem"> {{ item.name }} </div>
                        <Input class="input-edit" v-if="isEdit && item.id == idItem" v-model="item.name"/>
                    </td>
                    <td class="td-re"> 
                        <a :href="'http://34.126.110.103:8080/uetshare/image' + item.link" target="_blank" style="cursor: pointer; color: #007bff !important;">
                            {{ item.file_name }}
                        </a>
                        <button v-if="isEdit && item.id == idItem" class="d-btn d-btn-icon d-btn-primary" @click="uploadFile(index)">
                            <i class="el-icon-upload"></i>
                            Upload
                        </button>
                        <input style="display: none;" type='file' ref="fileUpload"/>
                    </td>
                    <td class="td-re">
                        <div v-if="!isEdit || item.id != idItem"> {{ item.type }} </div>
                        <Dropdown
                            v-if="isEdit && item.id == idItem"
                            class="pl-3 pr-3"
                            :title="type.name"
                            :options="listType"
                            :keyName="'name'"
                            :keyID="'id'"
                            :labelName="type.name"
                            placeholder="Chọn Type"
                            @select="selectType">
                        </Dropdown>
                    </td>
                    <td class="td-re" > 
                        <div v-if="!isEdit || item.id != idItem"> {{ item.subjectDto.subject_name }} </div>
                        <!-- <Input style="width: 75%" class="input-edit" v-if="isEdit && item.id == idItem" v-model="item.subjectDto.subject_name"/> -->
                        <Dropdown
                            v-if="isEdit && item.id == idItem"
                            class="pl-3 pr-3"
                            :title="subject.subjectName"
                            :options="listSubject"
                            :keyName="'subject_name'"
                            :keyID="'id'"
                            @required-data="getDataSubject"
                            :labelName="subject.subjectName"
                            placeholder="Chọn Subject"
                            @select="selectSubject">
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
            listSubject: null,
            subject: {
                subjectID: null,
                subjectName: null
            },

            listType: [
                {name: "DOCUMENT", id: 1},
                {name: "EXAM", id: 2},
            ],
            type: {
                name: null,
                id: null,
            }
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
            this.listData[index].subject_id = this.subject.subjectID;
            var form = new FormData();
            if (this.$refs.fileUpload[index].files[0]) {
                form.append("file", this.$refs.fileUpload[index].files[0], this.$refs.fileUpload[index].files[0].name);
            }
            var x = this.listData[index];
            var obj = `{
                        "examDocumentType": " ` + this.type.name ? null: x.type + `",
                        "name": "` + x.name + `",
                        "account": {"id": 1},
                        "subject": {"id": ` + x.subject_id + `},
                    }`;
            form.append("ExamDocument", obj);
            this.$emit("editExamDocument", form, this.idItem);
        },

        uploadFile(index) {
            this.$refs.fileUpload[index].click();
        },

        getDataSubject() {
          var me = this;
          this.axios.get('http://34.126.110.103:8080/uetshare/subject?index=1').then((response) => {
            if (response) {
                me.listSubject = response.data.subjectDtoList;
            }
          }).catch((error) => {
              console.log(error);
          });
        },

        selectSubject(data) {
            this.subject.subjectName = data.subject_name;
            this.subject.subjectID = data.id;
        },
        
        selectType(data) {
            this.type.name = data.name;
            this.type.id = data.id;
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