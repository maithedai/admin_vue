<template>
  <div class="category">
    <div class="topbar">
      <div class="title">List Category</div>
      <div class="top-action">
        <div class="nav-input-right">
          <SearchInput v-debounce:800="searchData" placeholder="Search Category..." v-model="searchText"></SearchInput>
          <Input fieldName="category" placeholder="Category..." v-model="categoryData.category"/>
        </div>
        <div class="float-right">
          <button class="d-btn d-btn-icon d-btn-success" @click="saveData()">
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
      <TableContent :nameList="'Category'" :listData="listData" ref="TableContent" @handleDelete="handleDelete" @saveDataEdit="saveDataEdit"/>
    </div>
    <div>
        <Paging style="margin-top:80px" :page-count="totalPage" :page-range="2" :margin-pages="2" @changePageCurent="changePageCurent"/>
    </div>
    
  </div>
</template>

<script>
  import SearchInput from "@/components/searchInput";
  import TableContent from "../TableContent.vue";
  import Input from "../../components/Input.vue"
  import Paging from "../../components/Paging.vue"

  export default {
    components: {
        TableContent,
        SearchInput,
        Input,
        Paging
    },
    data() {
      return {
        totalPage: 0,
        list: [],
        listData: {},
        categoryData: {
          category: null
        },

        loading: false,
        searchText: null,
      }
    },

    created() {
      this.getDataCategory();
    },

    methods: {
      /**
       * load dữ liệu new để hiển thị
       */
      getDataCategory() {
        var me = this;
        this.axios.get('http://34.126.110.103:8080/uetshare/category/pagination?index=1').then((response) => {
            if (response) {
              me.listData = response.data.categoryDtoList;
              me.totalPage = response.data.total_page;
            }
        }).catch((error) => {
            console.log(error);
        });
      },

      handleClickAdd() {
        this.goto('/add_category');
      },

      /**
       * popup cảnh báo xóa
       */
      popupWarningDeleteCategory(data) {
        this.$_confirm("warning",
          "Warning!",
          'Do you want to delete this category?',
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

      /**
       * xóa 1 category
       */
      // async handleDelete(data) {

      // },

      /**
       * xử lý sau khi lưu thành công
       */
      handleAfterSave() {
        this.loadData();
        this.goto('/category');
      },

      saveData() {
        if(this.categoryData["category"] != null) {
          this.axios.post('http://34.126.110.103:8080/uetshare/category/create', this.categoryData).then((response) => {
          if (response) {
            alert("Thêm thành công");
            this.getDataCategory();
          }
          }).catch((error) => {
              console.log(error);
          });
        }

      },

      deleteData() {
        this.$refs.TableContent.deleteCategory();
      },

      /**
       * Hàm search list Data
       */
      searchData(val) {
        var me = this;
        if (val != ''){
          this.axios.get('http://34.126.110.103:8080/uetshare/category/search?index=1&text=' + val).then((response) => {
          if (response) {
            me.listData = response.data.categoryDtoList;
            me.totalPage = response.data.total_page;
          }
          }).catch((error) => {
            console.log(error);
          });
        }else {
          this.getDataCategory();
        }
      },

       handleDelete(item, id) {
         
          this.axios.delete('http://34.126.110.103:8080/uetshare/category/' + id, item).then((response) => {
              if (response.data.success == false) {
                alert("Thể loại này đã được sử dụng!");
              } else {
                alert("Xóa thành công");
                this.getDataCategory();
              }
          }).catch((error) => {
              console.log(error);
          });
        },

      saveDataEdit(item, id) {
        this.axios.put('http://34.126.110.103:8080/uetshare/category/' + id, item).then((response) => {
          if (response) {
            alert("Sửa thành công");
            this.getDataCategory();
          }
        }).catch((error) => {
            console.log(error);
        });
      },

      changePageCurent(page) {
        var me = this;
        this.axios.get('http://34.126.110.103:8080/uetshare/category/pagination?index=' + page).then((response) => {
            if (response) {
              me.listData = response.data.categoryDtoList
            }
        }).catch((error) => {
            console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .category {
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

  .category .content {
    height: calc(100vh - 225px);
  }

  .nav-input-right {
    display: flex;
    min-width: 650px;
    justify-content: space-between;
  }
</style>
