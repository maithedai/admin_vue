<template>
  <div id="app">
    <div class="auth-wrapper">
      <div class="auth-inner">
        <!-- Chưa đăng nhập thì hiển thị form login -->
        <div v-if="!isLoggedIn" v-on:keyup.enter="handleLogin">
          <h3>Đăng nhập</h3>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              ref="email"
              class="form-control"
              v-model="email"
              placeholder="Địa chỉ Email"
              @input="$v.email.$touch"
              @blur="$v.email.$touch()"
              :state="$v.email.$dirty ? !$v.email.$error : null"
            />
            <small class="text-danger" v-if="$v.email.$error">
              <span v-if="!$v.email.required">Bạn chưa nhập địa chỉ email!</span>
              <span v-if="!$v.email.email">Bạn cần nhập đúng định dạng email!</span>
            </small>
          </div>

          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Mật khẩu"
              @input="$v.password.$touch"
              @blur="$v.password.$touch()"
              :state="$v.password.$dirty ? !$v.password.$error : null"
            />
            <small class="text-danger" v-if="$v.password.$error">
              <span v-if="!$v.password.required">Bạn chưa nhập mật khẩu!</span>
              <span v-if="!$v.password.minLength">Mật khẩu phải có ít nhất {{$v.password.$params.minLength.min}} kí tự!</span>
              <span v-if="!$v.password.maxLength">Mật khẩu có nhiều nhất {{$v.password.$params.maxLength.max}} kí tự!</span>
            </small>
          </div>

          <button
            class="btn btn-primary btn-block"
            type="submit"
            @click="validateBeforeSave"
          >
            Đăng nhập
          </button>

          <div class="authLogin p-4">
            <p>
              Bạn chưa có tài khoản? <router-link to="/register">Đăng kí</router-link>
            </p>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/auth.js';
import authHelper from "@/helpers/authorize.js";
import { required, minLength, maxLength, beetween, email } from 'vuelidate/lib/validators';
import authMixins from "@/mixins/auth";

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',

      // thông tin user sau khi đăng nhập
      userInfo: null,
    }
  },

  mixins: [authMixins],

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10),
    },
  },

  created() {
    this.getUserInformation();
  },

  mounted() {
      this.$refs.email.focus();
  },

  methods: {
    /**
      * validate trước khi lưu dữ liệu
      */
    validateBeforeSave() {
      this.$v.$touch();
          if(!this.$v.$invalid) {
            this.handleLogin();
          }
          else {
            this.focusToFirstInput('invalid');
          }
    },

    /**
     * Xử lý login
     */
    async handleLogin() {
      this.showLoading();
      // var hasedPass = this.bcryptEncode(this.password);
      var loginRes = await AuthService.login(this.email, this.password);
      this.hideLoading();

      // nếu đăng nhập thành công
      if(loginRes.data && loginRes.data.Success) {
        this.$message.success("Đăng nhập thành công.");
        this.handleAfterLoginSuccess(loginRes.data.Data);
      }
      else {
        this.$_confirm("error",
                        "Thông báo",
                        "Tên đăng nhập hoặc mật khẩu không đúng. Hãy thử lại!",
                        [{
                            label: "Đóng",
                            class: "d-btn-primary"
                        }]
                    )
      }
    },

    /**
     * hàm xử lý sau khi đăng nhập thành công
     */
    handleAfterLoginSuccess(data) {
      this.$eventBus.$emit("logged-in", true);
      // lưu token
      authHelper.setToken(data.AccessToken);
      // lưu thông tin user
      authHelper.setUserInfo(data.UserInfo);
      var userInfo = this.getUserInfo();

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
  },

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

.authLogin {
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
