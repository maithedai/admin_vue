<template>
  <div class="category">
    <div class="topbar">
      <div class="title">List Category</div>
      <div class="top-action">
        <div class="col-lg-5 col-md-4 pl-0">
          <SearchInput placeholder="Search Category..." v-model="searchText"></SearchInput>
        </div>

        <div class="float-right">
          <button class="d-btn d-btn-icon d-btn-primary" @click="goto('/add_category')">
            <i class="el-icon-plus" />
            Add Category
          </button>
        </div>
      </div>
    </div>

    <div class="content mt-3">
      <!-- <datatable title="List Category" :columns="tableColumns1" :rows="tableRows1" /> -->
    </div>
  </div>
</template>

<script>
  import SearchInput from "@/components/searchInput";
  // import 'materialize-css';
  // import 'materialize-css/dist/css/materialize.css';
  // import DataTable from "vue-materialize-datatable";

  export default {
    data() {
      return {
        //list category
        list: [],
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

    components: {
      SearchInput,
      // "datatable": DataTable,
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
</style>