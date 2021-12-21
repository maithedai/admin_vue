<template>
  <div class="subject">
    <div class="topbar">
      <div class="title">List Subject</div>
      <div class="top-action">
        <div class="nav-input-right">
          <SearchInput v-debounce:800="searchData" placeholder="Search Subject..." v-model="searchText"></SearchInput>
          <Dropdown
              class="pl-3 pr-3"
              :title="category.CategoryName"
              :options="listCategory"
              :keyName="'category'"
              :keyID="'id'"
              @required-data="getDataCategory"
              :labelName="category.CategoryName"
              placeholder="Chọn Category"
              @select="selectCategory"
              @clear-select="clearCategory"
          ></Dropdown>
          <Input fieldName="subject" placeholder="Subject..." v-model="subjectData.subject_name"/>
        </div>

        <div class="float-right">
          <button class="d-btn d-btn-icon d-btn-success" @click="saveData()">
            <i class="el-icon-plus" />
            Add
          </button>

        </div>
      </div>
    </div>

    <div class="content mt-3">
      <TableSubjectContent :nameList="'Subject'" :listData="listData" ref="TableSubjectContent" @handleDelete="handleDelete" @saveDataEdit="saveDataEdit"/>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/searchInput";
import TableSubjectContent from "../TableSubjectContent.vue";
import Input from "../../components/Input.vue"
import Paging from "../../components/Paging.vue"
import Dropdown from '@/components/dropdown'

export default {
  data() {
    return {
      //list category
        list: [],
        listData: {},
        subjectData: {
          subject_name: null
        },
        listCategory: null,
        category: {
          CategoryID: null,
          CategoryName: null
        },
        loading: false,
        searchText: null,
    }
  },

  created() {
    this.getDataSubject();
    this.getDataCategory();
  },

  components: {
    TableSubjectContent,
    SearchInput,
    Input,
    Paging,
    Dropdown
  },

   methods: {
        /**
         * load dữ liệu new để hiển thị
         */
        getDataSubject() {
          var me = this;
          this.axios.get('http://34.126.110.103:8080/uetshare/subject/search?index=1').then((response) => {
              if (response) {
                  me.listData = response.data.subjectDtoList;
              }
          }).catch((error) => {
              console.log(error);
          });
        },

        // Lấy list category
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
            this.category.CategoryName = data.category;
            this.category.CategoryID = data.id;
        },

        handleClickAdd() {
            this.goto('/add_subject');
        },

        /**
         * popup cảnh báo xóa
         */
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

        /**
         * xử lý sau khi lưu thành công
         */
        handleAfterSave() {
            this.loadData();
            this.goto('/subject');
        },

        saveData() {
          if(this.subjectData["subject_name"] != null && this.category.CategoryID != null) {
            let category_id = this.category.id;
            this.axios.post('http://34.126.110.103:8080/uetshare/subject', this.subjectData, category_id).then((response) => {
            if (response) {
              alert("Thêm thành công");
              this.getDataSubject();
            }
            }).catch((error) => {
                console.log(error);
            });
          }

        },

        /**
       * Hàm search list Data
       */
      searchData(val) {
        var me = this;
        if (val != ''){
          this.axios.get('http://34.126.110.103:8080/uetshare/subject/search?index=1&text=' + val).then((response) => {
          if (response) {
              me.listData = response.data.subjectDtoList;
          }
          }).catch((error) => {
              console.log(error);
          });
        }else {
          this.getDataSubject();
        }
      },

        // deleteData() {
        //   this.$refs.TableContent.deleteSubject();
        // },

        handleDelete(item, id) {
          this.axios.delete('http://34.126.110.103:8080/uetshare/subject/' + id, item).then((response) => {
              if (response.data.success == false) {
                alert("This subject is used!");
              } else {
                alert("Xóa thành công");
                this.getDataSubject();
              }
          }).catch((error) => {
              console.log(error);
          });
        },


        saveDataEdit(item, id) {
          this.axios.put('http://34.126.110.103:8080/uetshare/subject/' + id, item).then((response) => {
            if (response) {
              alert("Sửa thành công");
              this.getDataSubject();
            }
          }).catch((error) => {
              console.log(error);
          });
        },

        /**
         * clear trường category
         */
        clearCategory() {
          this.category.CategoryName = null;
          this.category.CategoryID = null;
        }

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

.nav-input-right {
    display: flex;
    min-width: 800px;
    justify-content: space-between;
}
</style>
