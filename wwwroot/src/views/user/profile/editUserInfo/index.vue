<template>
  <div class="container"
  >
      <div class="form-horizontal row">
        <div class="col-12">
          <div class="form-group row">
            <label class="col-2 control-label d-required">Tên đầy đủ:</label>
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                :class="$v.userInfo.FullName.$error ? 'invalid' : ''"
                v-model="userInfo.FullName"
              />
              <small class="text-danger" v-if="$v.userInfo.FullName.$error">Trường không được để trống</small>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-2 control-label">Ngày sinh: </label>
            <div class="col-6 date">
              <Datepicker
                v-model="userInfo.DateOfBirth"
                @select="selectDateOfBirth"
              >
              </Datepicker>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-2 control-label d-required">Giới tính:</label>
            <div class="col-6">
              <Dropdown
                :title="userInfo.Gender"
                :options="listGender"
                :labelName="'label'"
                :keyName="'key'"
                placeholder="Chọn giới tính"
                @select="selectGender"
              >
              </Dropdown>
              <small class="text-danger" v-if="$v.userInfo.Gender.$error">Trường không được để trống</small>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-2 control-label">Số điện thoại:</label>
            <div class="col-6">
              <input
                type="number"
                class="form-control"
                v-model="userInfo.PhoneNumber"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-2 control-label">Địa chỉ:</label>
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                v-model="userInfo.Address"
              />
            </div>
          </div>
        </div>
        <div class="col-10 text-center">
          <button class="d-btn d-btn-primary mr-2" @click="validateBeforeSave">Lưu thông tin</button>
        </div>
      </div>
  </div>
</template>

<script>
import UserMixin from "@/mixins/index.js";
import Datepicker from "@/components/datepicker";
import { required } from 'vuelidate/lib/validators';
import Dropdown from "@/components/dropdown";
import UserService from "@/services/user";
import authHelper from "@/helpers/authorize.js";

export default {
data() {
  return {
    userInfo: {
      FullName: null,
      DateOfBirth: null,
      Address: null,
      Gender: null,
      PhoneNumber: null
    },
    loading: false,
    userData: null,
    dataDefault: null,
  }
},

validations: {
  userInfo: {
    FullName: { required },
    Gender: { required },
  }
},

created() {
  this.loadData();
},

mixins: [UserMixin],

components: {
  Datepicker,
  Dropdown,
},

props: {

},

methods: {
  async loadData() {
    this.showLoading();
    var user = this.getUserInfo();
    if (user) {
      var res = await UserService.getUserById(user.UserID);
      if (res && res.data && res.data.Data) {
        this.userInfo = res.data.Data;
      }
    }

    this.hideLoading();
  },

  validateBeforeSave() {
    this.$v.userInfo.$touch();
    if (!this.$v.userInfo.$error) {
      this.saveData();
    } else {
      this.focusToFirstInput('invalid');
    }
  },

  /**
   * Hàm lưu data
   */
  saveData() {
    var dataSave = Object.assign({}, this.userInfo);
    var userInfo = this.getUserInfo();

    dataSave.UserID = userInfo.UserID;
    dataSave.DateOfBirth = this.convertToEnglandDateTime(dataSave.DateOfBirth);

    this.handleUpdate(dataSave);
  },

  /**
   * Xử lí cập nhật profile user
   */
  async handleUpdate(dataSave) {

    this.showLoading();
    var res = await UserService.updateUser(dataSave);
    this.hideLoading();
    
    if (res.data && res.data.Success) {
      this.$message.success("Cập nhật thành công!");
      this.handleAfterSave(res.data.Data);
    } else {
      this.$message.error("Cập nhật thất bại!");
    }

  },

  /**
   * Xử lí sau khi lưu
   */
  handleAfterSave(userInfo) {
    authHelper.setUserInfo(userInfo);
    this.redirect("/profile");
  },

  selectDateOfBirth(data) {
    this.userInfo.DateOfBirth = data;
  },

  selectGender(data) {
    this.userInfo.Gender = data.label;
  },
},

}
</script>

<style scoped>
.container {
  margin-top: 35px;
  padding: 0px 15px 15px 50px;
  display: inline-block;
  margin-left: 200px;
}

label {
  font-size: 120%;
}

input {
  font-size: 120%;
}

.gender {
  margin-left: 20px;
}
</style>
