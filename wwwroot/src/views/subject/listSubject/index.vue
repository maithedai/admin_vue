<template>
  <div class="subject">
    <div class="topbar">
      <div class="title">List Subject</div>
      <div class="top-action">
        <div class="col-lg-5 col-md-4 pl-0">
          <SearchInput
            placeholder="Search Subject..."
            v-model="searchText"
          ></SearchInput>
        </div>

        <div class="float-right">
          <button
            class="d-btn d-btn-icon d-btn-primary"
            @click="goto('/add_subject')"
          >
            <i class="el-icon-plus" />
            Add Subject
          </button>
        </div>
      </div>
    </div>

    <div class="content mt-3">
     
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/searchInput";

export default {
  data() {
    return {
      //danh sach news
      listSubject: null,
      listColumn: [
                {
                    type: "",
                    propertyName: "ID",
                    label: "ID",
                    width: "50",
                    align: "left",
                },
                {
                    type: "",
                    propertyName: "Subject",
                    label: "Subject",
                    width: "300",
                    align: "left",
                },
                {
                    type: "",
                    propertyName: "Action",
                    label: "Action",
                    width: "400",
                    align: "left",
                },
      ],
      loading: false,
      subjectEditData: null,
      searchText: null,
    }
  },

  created() {
    this.loadData();
  },

  components: {
    SearchInput,
  },

   methods: {
        /**
         * load dữ liệu new để hiển thị
         */
        async loadData() {
            
        },

        handleClickAdd() {
            this.goto('/add_subject');
        },

        /**
         * popup cảnh báo xóa
         */
        popupWarningDeleteCategory(data) {
            this.$_confirm("warning",
                "Cảnh báo",
                'Bạn có chắc chắn muốn xóa subject này?',
                [
                    {
                        label: "Hủy",
                        class: "d-btn-outline",
                    },
                    {
                        label: "Xóa",
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
            this.goto('/subject');
        },

   }
}
</script>

<style scoped>
.subject {
  padding: 0 24px 24px 24px;
  background-color: rgb(249, 250, 250);
  height: 100%;
}

.topbar .title{
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

.subject .content {
  height: calc(100% - 46px - 40px - 13px);
}
</style>
