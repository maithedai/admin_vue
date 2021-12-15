<template>
  <div class="topbar">
    <div class="left-content" @click="goto('/')">
      <img class="logo"  src="@/assets/icon/exam_icon.png" />
      <span class="admin">ADMIN PAGE</span>
    </div>

    <div class="right-content">

      <div class="user-form">
        <!-- avatar user nếu đã đăng nhập -->
        <div class="user-panel" v-if="!isGettingRouter" >  <!-- v-if="isLoggedIn" -->        
          <el-dropdown @command="handleClickDropdown" trigger="click">
            <div class="account">
              <img class="avatar" src="@/assets/icon/avatar-default.png" />
              <!-- <span>{{ user && user.FullName ? user.FullName : user.Email }}</span> -->
              <i class="el-icon-arrow-down fs-15p" />
            </div>
            <el-dropdown-menu class="" slot="dropdown">
              <el-dropdown-item command="userInfo"
                ><img src="@/assets/icon/users.png" class="mr-2"/> Thông tin tài
                khoản</el-dropdown-item
              >
              <el-dropdown-item command="logout"
                ><img src="@/assets/icon/icon-logout.png" class="mr-2"/> Đăng Xuất</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- nút đăng nhập/đăng kí -->
        <div class="login-panel" v-else>
          <button class="d-btn d-btn-outline btn-register ff-rm" @click="goto('/register')">Đăng ký</button>
          <button class="d-btn d-btn-outline-primary ff-rm" @click="goto('/login')">Đăng nhập</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GETTING_STARTED_ROUTER } from "@/enums/routerEnum.js";

export default {
  data() {
    return {
      user: null,
    }
  },

  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    },
  },

  components: {
  },

  methods: {
    handleClickDropdown(command) {
      switch (command) {
        case "userInfo":
          this.goto("/profile");
          break;
        case "logout":
          localStorage.removeItem('d_token');
          this.redirect("/")
          break;
      }
    },
  },
  created() {
    this.user = this.getUserInfo();
  },
  computed: {
        // check xem url hiện tại có phải trang user không
        isUserRouter() {
            var check = USER_ROUTER.findIndex(ele => ele.name == this.$route.name);
            return check != -1;
        },
        // check xem url hiện tại có phải luồng getting started không
        isGettingRouter() {
            var check = GETTING_STARTED_ROUTER.findIndex(ele => ele.name == this.$route.name);
            return check != -1;
        },
    },
  watch: {
    /**
     * watch biến kiểm tra đã đăng nhập chưa
     */
    isLoggedIn(val) {
      if(val) {
        this.user = this.getUserInfo();
      }
    },
  },
}
</script>

<style scoped>
.topbar {
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  cursor: pointer;
}

.admin {
  padding-left: 10px;
  color: blue;
  cursor: pointer;
}

.right-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.account .avatar {
  width: 36px;
  height: 36px;
}

.btn-register:hover {
  background-color: #fff;
}
</style>
