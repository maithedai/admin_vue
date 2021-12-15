<template>
  <div class="change-password">
    <div class="w-50">
      <div class="form-group row">
        <label class="col-5 control-label required d-required">
          Mật khẩu cũ: 
        </label>
        <div class="col-7">
          <input
            id="oldpassword"
            type="password"
            class="form-control"
            v-model="oldpassword"
            placeholder="Nhập mật khẩu cũ"
            @blur="$v.oldpassword.$touch()"
            @input="$v.oldpassword.$touch"
            :state="$v.oldpassword.$dirty ? !$v.oldpassword.$error : null"
          />
          <small class="text-danger" v-if="$v.oldpassword.$error">
            <span v-if="!$v.oldpassword.required"
              >Bạn chưa nhập mật khẩu cũ!</span
            >
          </small>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-5 control-label required d-required">
          Mật khẩu mới: 
        </label>
        <div class="col-7">
          <input
            id="password"
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Nhập mật khẩu mới"
            @blur="$v.password.$touch()"
            @input="$v.password.$touch"
            :state="$v.password.$dirty ? !$v.password.$error : null"
          />
         <small class="text-danger" v-if="$v.password.$error">
            <span v-if="!$v.password.required">Bạn chưa nhập mật khẩu mới!</span>
            <span v-if="!$v.password.minLength"
              >Mật khẩu mới phải có ít nhất
              {{ $v.password.$params.minLength.min }} kí tự!</span
            >
            <span v-if="!$v.password.maxLength"
              >Mật khẩu mới có nhiều nhất
              {{ $v.password.$params.maxLength.max }} kí tự!</span
            >
          </small>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-5 control-label required">
          Xác nhận mật khẩu mới: <span class="text-fail">*</span>
        </label>
        <div class="col-7">
          <input
            id="password_confirm"
            type="password"
            class="form-control"
            v-model="password_confirm"
            placeholder="Nhập xác nhận mật khẩu"
            @blur="$v.password_confirm.$touch()"
            @input="$v.password_confirm.$touch"
            :state="
              $v.password_confirm.$dirty ? !$v.password_confirm.$error : null
            "
          />
          <small class="text-danger" v-if="$v.password_confirm.$error">
            <span v-if="!$v.password_confirm.required"
              >Bạn chưa nhập xác nhận mật khẩu!</span
            >
            <span v-if="!$v.password_confirm.sameAsPassword"
              >Mật khẩu chưa trùng khớp!</span
            >
          </small>
        </div>
      </div>
      <div class="save-pass">
        <button class="btn btn-primary btn-block" type="submit" @click="validateBeforeSave"
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
import UserService from "@/services/user.js";
import authMixins from "@/mixins/auth";

export default {
  data() {
    return {
      oldpassword: '',
      password: '',
      password_confirm:'',
    }
  },

  mixins: [authMixins],

  validations: {
    oldpassword: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10),
    },
    password_confirm: {
      required,
      sameAsPassword: sameAs('password'),
    }
  },

  methods: {
    /**
      * validate trước khi lưu dữ liệu
      */
    validateBeforeSave() {
      this.$v.$touch();

      if(!this.$v.$invalid) {
        // huy: kiểm tra trùng mật khẩu cũ trước
        if (this.password == this.oldpassword) {
          this.$_confirm("error",
                          "Thông báo",
                          "Mật khẩu mới phải khác mật khẩu cũ!",
                          [{
                              label: "Đóng",
                              class: "d-btn-primary"
                          }]
                      )
        }
        else {
          this.handleChangePassword();
        }
      }
      else {
        this.focusToFirstInput('invalid');
      }
    },
    /**
     * Xử lí thay đổi mật khẩu
     */
    async handleChangePassword() {
      var hasedPass = this.bcryptEncode(this.password);
      var dataSave = {
        Password: hasedPass,
        OldPassword: this.oldpassword,
      }
      this.showLoading();
      var res = await UserService.changePassword(dataSave);
      this.hideLoading();
      
      if (res.data.Code == 400) {
        this.$_confirm("error",
                        "Thông báo",
                        "Mật khẩu cũ không chính xác. Hãy nhập lại!",
                        [{
                            label: "Đóng",
                            class: "d-btn-primary"
                        }]
                    )
      } else if (res.data && res.data.Success) {
        this.$message.success("Thay đổi mật khẩu thành công!");
        localStorage.removeItem('d_token');
        this.redirect('/login');
      } else {
        this.$message.error("Thay đổi mật khẩu thất bại!");
      }
    }
  },
}
</script>

<style scoped>
.change-password {
  margin-top: 35px;
  padding: 0px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

label {
  font-size: 120%;
}

input {
  font-size: 120%;
}

.save-pass {
  display: inline-flex;
  text-align: center;
  justify-content: center;
  margin-left: 315px;
}
</style>
