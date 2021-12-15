<template>
  <div class="category">
    <div class="topbar">
      <div class="title">List Category</div>
      <div class="top-action">
        <div class="nav-input-right">
          <!-- <SearchInput placeholder="Search Category..." v-model="searchText"></SearchInput> -->
          <Input fieldName="category" placeholder="Category..." v-model="categoryData.category"/>
        </div>
        <div class="float-right">
          <button class="d-btn d-btn-icon d-btn-success" @click="saveData()">
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
      <!-- <datatable title="List Category" :columns="tableColumns1" :rows="tableRows1" /> -->
      <TableContent ref="TableContent"/>
    </div>
  </div>
</template>

<script>
  import SearchInput from "@/components/searchInput";
  // import 'materialize-css';
  // import 'materialize-css/dist/css/materialize.css';
  // import DataTable from "vue-materialize-datatable";
  import TableContent from "../TableContent.vue";
  import Input from "../../components/Input.vue"

  export default {
    components: {
        TableContent,
        SearchInput,
        Input,
    },
    data() {
      return {
        //list category
        list: [],
        categoryData: {
          category: null,
        },
        tableColumns1: [
          {
            label: "Character name",
            field: "charName",
            numeric: false,
            html: false
          },
          {
            label: "First appearance",
            field: "firstAppearance",
            numeric: false,
            html: false
          },
          {
            label: "Created by",
            field: "createdBy",
            numeric: false,
            html: false
          },
          {
            label: "Voiced by",
            field: "voicedBy",
            numeric: false,
            html: false
          }
        ],
        tableRows1: [
          {
            charName: "Abu",
            firstAppearance: "Alladin (1992)",
            createdBy: "Joe Grant",
            voicedBy: "Frank Welker"
          },
          {
            charName: "Magic Carpet",
            firstAppearance: "Peter (1994)",
            createdBy: "Randy Cartwright",
            voicedBy: "N/A"
          },
          {
            charName: "The Sultan",
            firstAppearance: "John (1995)",
            createdBy: "Navid Negahban",
            voicedBy: "Douglas Seale"
          }
        ],
        loading: false,
        searchText: null,
      }
    },

    created() {
      this.loadData();
    },

    methods: {
      /**
       * load dữ liệu new để hiển thị
       */
      async loadData() {

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
      async handleDelete(data) {

      },

      /**
       * xử lý sau khi lưu thành công
       */
      handleAfterSave() {
        this.loadData();
        this.goto('/category');
      },

      saveData() {
        console.log(this.categoryData)
        this.axios.post('http://34.126.110.103:8080/uetshare/category/create', this.categoryData).then((response) => {
            if (response) {
              alert("Thêm thành công");
              this.$refs.TableContent.getDataCategory();
            }
        }).catch((error) => {
            console.log(error);
        });
      },

      deleteData() {
        this.$refs.TableContent.deleteCategory();
      },
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
    height: calc(100% - 46px - 40px - 13px);
  }

  .nav-input-right {
    display: flex;
    width: 50%;
    justify-content: space-between;
  }
</style>