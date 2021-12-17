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
            <TableContentExam :nameList="'Name'" :listData="listData"/>
        </div>
        <Paging :page-count="20" :page-range="2" :margin-pages="2"/>
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
        this.axios.get('http://34.126.110.103:8080/uetshare/exam-document/subject/1?type=DOCUMENT&index=1').then((response) => {
            if (response) {
              me.listData = response.data.examDocumentDtoList
            }
        }).catch((error) => {
            console.log(error);
        });
      }, 

      searchData(val) {
        var me = this;
        if (val != ''){
          this.axios.get('http://34.126.110.103:8080/uetshare/exam-document/subject/1?type=DOCUMENT&index=1&text' + val).then((response) => {
          if (response) {
            console.log(response.data.examDocumentDtoList);
            me.listData = response.data.examDocumentDtoList;
          }
          }).catch((error) => {
            console.log(error);
          });
        }else {
          this.getDataCategory();
        }
      },
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