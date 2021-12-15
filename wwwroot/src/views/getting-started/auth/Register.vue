<template>
  <div id="app">
    <div class="auth-wrapper">
      <div class="auth-inner">
        <div v-if="!isLoggedIn" v-on:keyup.enter="handleRegister">
          <h3>Đăng kí</h3>

          <div class="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              ref="username"
              class="form-control"
              v-model="username"
              placeholder="Tên đăng nhập"
              @input="$v.username.$touch"
              :state="$v.username.$dirty ? !$v.username.$error : null"
              @blur="$v.username.$touch()"
            />
            <small class="text-danger" v-if="$v.username.$error">
              <span v-if="!$v.username.required"
                >Bạn chưa điền tên đăng nhập!</span
              >
              <span v-if="!$v.username.minLength"
                >Tên đăng nhập có ít nhất
                {{ $v.username.$params.minLength.min }} kí tự!</span
              >
            </small>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="Địa chỉ Email"
              @input="$v.email.$touch"
              @blur="$v.email.$touch()"
              :state="$v.email.$dirty ? !$v.email.$error : null"
            />
            <small class="text-danger" v-if="$v.email.$error">
              <span v-if="!$v.email.required"
                >Bạn chưa nhập địa chỉ email!</span
              >
              <span v-if="!$v.email.email"
                >Bạn cần nhập đúng định dạng email!</span
              >
            </small>
          </div>

          <div class="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Mật khẩu"
              @blur="$v.password.$touch()"
              @input="$v.password.$touch"
              :state="$v.password.$dirty ? !$v.password.$error : null"
            />
            <small class="text-danger" v-if="$v.password.$error">
              <span v-if="!$v.password.required">Bạn chưa nhập mật khẩu!</span>
              <span v-if="!$v.password.minLength"
                >Mật khẩu phải có ít nhất
                {{ $v.password.$params.minLength.min }} kí tự!</span
              >
              <span v-if="!$v.password.maxLength"
                >Mật khẩu có nhiều nhất
                {{ $v.password.$params.maxLength.max }} kí tự!</span
              >
            </small>
          </div>

          <div class="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              class="form-control"
              v-model="password_confirm"
              placeholder="Xác nhận mật khẩu"
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

          <button
            class="btn btn-primary btn-block"
            type="submit"
            @click="validateBeforeSave"
          >
            Đăng kí
          </button>

          <div class="authRegister p-4">
            <p>
              Bạn đã có tài khoản?  <router-link to="/login"> Đăng nhập</router-link>
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, beetween, email, sameAs } from 'vuelidate/lib/validators';
import AuthService from "@/services/auth.js";
import authHelper from "@/helpers/authorize.js";
import authMixins from "@/mixins/auth";

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
      // thông tin user sau khi đăng nhập
      userInfo: null,
    }
  },

  validations: {
    username: {
      required,
      minLength: minLength(3),
    },

    email: {
      required,
      email,
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

  mixins: [authMixins],

  created() {
    this.getUserInformation();
  },

  mounted() {
      this.$refs.username.focus();
  },

  methods: {
    /**
      * validate trước khi lưu dữ liệu
      */
    validateBeforeSave() {
      this.$v.$touch();
          if(!this.$v.$invalid) {
            this.handleRegister();
          }
          else {
            this.focusToFirstInput('invalid');
          }
    },

    async handleRegister() {
      var hasedPass = this.bcryptEncode(this.password);
      var userInfo = {
        Username: this.username,
        Password: hasedPass,
        Email: this.email,
      };

      this.showLoading();
      var res = await AuthService.register(userInfo);
      this.hideLoading();
      if (res.data && res.data.Success) {
        this.$message.success("Đăng kí thành công!");
        this.goto("/login");
      } else if(res.data && res.data.Code == 405) {
                this.$_confirm("error",
                    "Thông báo",
                    "Tên đăng nhập hoặc Email đã tồn tại!",
                    [{
                        label: "Đóng",
                        class: "d-btn-primary"
                    }]
                )
      } else {
        this.$message.error("Đăng kí thất bại!");
      }
    },

    /**
     * lấy thông tin user nếu đã đăng nhập
     */
    getUserInformation() {
      if(this.isLoggedIn) {
        this.userInfo = this.getUserInfo();
      }
    },
  },

  computed: {
    /**
     * kiểm tra xem đã đăng nhập chưa
     */
    isLoggedIn() {
      return authHelper.getToken();
    },
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

* {
  box-sizing: border-box;
}

#app {
  background-color: #d6e7f8 !important;
  display: flex;
  font-weight: 400;
  text-align: center;
  width: 100%;
  height: 100%;
}

.authRegister {
  text-align: center;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: columns;
  text-align: left;
  width: 100%;
  height: 100%;
}

.auth-inner {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.logged-in-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>