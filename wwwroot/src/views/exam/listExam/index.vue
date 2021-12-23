<template>
    <div class="exam">
        <div class="topbar">
        <div class="title">List Exam Document</div>
        <div class="top-action">
            <div class="nav-input-right">
              <SearchInput style="width: 15%" v-debounce:800="searchData" placeholder="Search Exam..."></SearchInput>
              <Input style="width: 15%" fieldName="category" placeholder="Exam..." v-model="nameExam"/>
              <div class="upload">
                 <button class="d-btn d-btn-icon d-btn-primary" @click="uploadFile">
                    <i class="el-icon-upload"></i>
                    Upload
                </button>
                <input style="display: none;" type='file' ref="fileCreateUpload" @change="selectFile"/>
                <div class="file-select"> {{ nameFileUpload }}</div>
              </div>
              <Dropdown
                  class="pl-3 pr-3"
                  :title="type.name"
                  :options="listType"
                  :keyName="'name'"
                  :keyID="'id'"
                  :labelName="type.name"
                  placeholder="Chọn Type"
                  @select="selectType"
                  @clear-select="clearType">
              </Dropdown>
              <Dropdown
                  class="pl-3 pr-3"
                  :title="subject.subjectName"
                  :options="listSubject"
                  :keyName="'subject_name'"
                  :keyID="'id'"
                  @required-data="getDataSubject"
                  :labelName="subject.subjectName"
                  placeholder="Chọn Subject"
                  @select="selectSubject"
                  @clear-select="clearSubject">
              </Dropdown>
            </div>
            <div class="float-right">
            <button class="d-btn d-btn-icon d-btn-success" @click="addData()">
                <i class="el-icon-plus" />
                Add
            </button>
            <!-- <button class="d-btn d-btn-icon d-btn-danger" @click="deleteData()">
                <i class="el-icon-delete" />
                Delete
            </button> -->
            </div>
        </div>
        </div>

        <div class="content mt-3">
            <TableContentExam :nameList="'Name'" :listData="listData" @handleDelete="handleDelete" @editExamDocument="editExamDocument"/>
        </div>
        <div>
            <Paging style="margin-top:80px" :page-count="totalPage" :page-range="2" :margin-pages="2" @changePageCurent="changePageCurent"/>
        </div>
        
    </div>
</template>

<script>

  import SearchInput from "@/components/searchInput";
  // import 'materialize-css';
  // import 'materialize-css/dist/css/materialize.css';
  // import DataTable from "vue-materialize-datatable";
  import Input from "../../../components/Input.vue"
  import Paging from "../../../components/Paging.vue"
  import TableContentExam from "../../TableContentExam.vue"
  import Dropdown from '@/components/dropdown'

export default {
    components: {
      TableContentExam,
      SearchInput,
      Input,
      Paging,
      Dropdown
    },
    data() {
      return {
        listData: {},
        totalPage: 0,
        nameFileUpload: null,
        nameExam: null,
        subject_id: 0,
        listType: [
          {name: "DOCUMENT", id: 1},
          {name: "EXAM", id: 2},
        ],
        type: {
          name: null,
          id: null,
        },
        listSubject: null,
        subject: {
            subjectID: null,
            subjectName: null
        },
      }
    },
    
    created() {
      this.getDataList()
    },

     methods: {
      /**
       * load dữ liệu new để hiển thị
       */
      getDataList() {
        var me = this;
        this.axios.get('http://34.126.110.103:8080/uetshare/exam-document/search?index=1').then((response) => {
            if (response) {
              me.listData = response.data.examDocumentDtoList;
              me.totalPage = response.data.total_page;
            }
        }).catch((error) => {
            console.log(error);
        });
      }, 

      searchData(val) {
        var me = this;
        if (val != ''){
          this.axios.get('http://34.126.110.103:8080/uetshare/exam-document/search?index=1&text=' + val).then((response) => {
          if (response) {
            me.listData = response.data.examDocumentDtoList;
            me.totalPage = response.data.total_page;
          }
          }).catch((error) => {
            console.log(error);
          });
        }else {
          this.getDataList();
        }
      },

      editExamDocument(form, id) {
        this.axios.put('http://34.126.110.103:8080/uetshare/exam-document/' + id, form).then((response) => {
        if (response) {
          alert("sửa thành công!");
          this.getDataList();
        }
        }).catch((error) => {
          console.log(error);
        });
      },

      uploadFile() {
        this.$refs.fileCreateUpload.click();
      },

      selectFile() {
        this.nameFileUpload = this.$refs.fileCreateUpload.files[0].name;
        if (this.nameFileUpload.length > 20) {
          this.nameFileUpload = this.nameFileUpload.substring(0, 16) + "...";
        }
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

      addData() {
        var form = new FormData();
        if (this.$refs.fileCreateUpload.files[0]) {
          form.append("file", this.$refs.fileCreateUpload.files[0], this.$refs.fileCreateUpload.files[0].name);
        }
        var obj = `{
                    "examDocumentType": " ` + this.type.name + `",
                    "name": "` + this.nameExam + `",
                    "account": {"id": 1},
                    "subject": {"id": ` + this.subject.subjectID + `}
                  }`;

        form.append("ExamDocument", obj);
        console.log(form)
        this.axios.post('http://34.126.110.103:8080/uetshare/exam-document', form).then((response) => {
          if (response) {
              alert("Thêm thành công");
              this.getDataList();
          }
        }).catch((error) => {
            console.log(error);
        });
      },

      clearType() {
        this.type.name = null;
        this.type.id = null;
      },

      clearSubject() {
        this.subject.subjectName = null;
        this.subject.subjectID = null;
      },

      popupWarningDeleteCategory(data) {
            this.$_confirm("warning",
                "Warning!",
                'Do you want to delete this subject??',
                [
                    {
                        label: "Cancel",
                        class: "d-btn-outline",
                    },
                    {
                        label: "Delete",
                        class: "d-btn-danger",
                        callback: this.handleDelete,
                        params: [data]
                    }
                ]
            );
        },

      handleDelete(item, id) {
        console.log('id: ', id)
        this.axios.delete('http://34.126.110.103:8080/uetshare/exam-document/' + id, item).then((response) => {
            
          alert("Xóa thành công");
          this.getDataList();
            
        }).catch((error) => {
            console.log(error);
        });
        },
      
       changePageCurent(page) {
          var me = this;
          this.axios.get('http://34.126.110.103:8080/uetshare/exam-document/search?index=' + page).then((response) => {
              if (response) {
                me.listData = response.data.examDocumentDtoList
              }
          }).catch((error) => {
              console.log(error);
          });
        }

    }
}
</script>

<style scoped>
  .exam {
    padding: 0 24px 24px 24px;
    background-color: rgb(249, 250, 250);
    height: 100%;
  }

  .topbar .title {
    display: flex;
    font-size: 20px;
    height: 46px;
    font-weight: bold;
    align-items: center;
  }

  .topbar .top-action {
    justify-content: space-between;
    display: flex;
  }

  .exam .content {
    height: calc(100% - 146px);
  }

  .nav-input-right {
    display: flex;
    min-width: 70%;
    justify-content: space-between;
  }

  .upload {
    display: flex;
    width: auto;
  }

  .file-select {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-left: 4px;
  }
</style>