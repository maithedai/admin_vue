<template>
    <div class="exam">
        <div class="topbar">
        <div class="title">List Exam Document</div>
        <div class="top-action">
            <div class="nav-input-right">
            <SearchInput v-debounce:800="searchData" placeholder="Search Exam..."></SearchInput>
            <Input fieldName="category" placeholder="Exam..."/>
            </div>
            <div class="float-right">
            <button class="d-btn d-btn-icon d-btn-success" @click="addData()">
                <i class="el-icon-plus" />
                Add
            </button>
            <button class="d-btn d-btn-icon d-btn-danger" @click="deleteData()">
                <i class="el-icon-delete" />
                Delete
            </button>
            </div>
        </div>
        </div>

        <div class="content mt-3">
            <TableContentExam :nameList="'Name'" :listData="listData" @editExamDocument="editExamDocument"/>
        </div>
        <Paging :page-count="totalPage" :page-range="2" :margin-pages="2"/>
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

export default {
    components: {
      TableContentExam,
      SearchInput,
      Input,
      Paging
    },
    data() {
      return {
        listData: {},
        totalPage: 0,
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
    min-width: 650px;
    justify-content: space-between;
  }
</style>