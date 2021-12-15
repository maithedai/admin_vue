<template>
  <div class="topbar">
    <div class="left-content">
      <img class="logo" @click="goto('/home')" src="@/assets/icon/exam_icon.png" title="Trang chủ"/>
    </div>

    <div class="right-content">

      <nav class="navbar navbar-expand navbar-light">
        <div class="container">
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <router-link to="/login" class="nav-link"><span class="ff-rb">Đăng nhập</span></router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link"><span class="ff-rb">Đăng kí</span></router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },

  props: {
    // biến hiển thị nút quay về trang chính
    isShowMenuButton: {
      type: Boolean,
      default: false
    },
  },

  components: {
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

.left-content {
  margin-left: 80px;
}

.right-content {
  position: absolute;
  right: 60px;
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
