<template>
  <div class="profile">
    <header>
      <div class="menu border-bottom-0 border-right border-secondary pr-3">
        <a href="#">Tài khoản</a>
      </div>
      <div class="menu-item">
        <div
          class="item"
          v-for="(item, index) in tabList"
          :key="index"
          id="index"
          :class="activeComponent == item.component ? 'active' : ''"
          @click="changeTab(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </header>
    <main>
      <div class="main-container">
        <component :is="activeComponent"></component>
      </div>
    </main>
  </div>
</template>
<script>
import userInfo from './userInfo'
import editUserInfo from './editUserInfo'
import changePassword from './changePassword'

export default {
  data() {
    return {
      activeComponent: "userInfo",
      tabList: [
        {
          label: "Thông tin",
          component: "userInfo",
        },
        {
          label: "Sửa thông tin",
          component: "editUserInfo",
        },
        {
          label: "Đổi mật khẩu",
          component: "changePassword",
        },
      ]
    }
  },

  components: {
    userInfo,
    editUserInfo,
    changePassword,
  },

  methods: {
    changeTab(item) {
      if(item) {
        this.activeComponent = item.component;
      }
    },
  }
}
</script>
<style type="text/css" scoped>
.profile {
  height: 100%;
  background-color: rgb(238, 244, 248);
  border-radius: 4px;
  padding: 14px 18px;
}

main {
  height: calc(100% - 60px);
  display: flex;
}
.main-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
}

header {
  background-color: #ced7f1;
  padding: 10px;
  height: 60px;
  align-items: center;
  display: flex;
}

header .menu {
  color: #340263;
  padding: 10px 20px;
  position: relative;
  margin-right: 30px;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
}

header .menu a {
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  border-right: 1em;
  font-size: 120%;
}

header .menu-item {
  color: #3b08f5;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
}

header .menu-item .item {
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  font-size: 120%;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
}
header .menu-item #index {
  cursor: pointer;
}
header .menu-item #index.active,
header .menu-item #index:hover {
  background-color: rgb(243, 231, 245);
}
</style>
