<template>
  <div class="container">
    <ul id="userInfo">
      <li>
        <label class="fs-16p">Tên đăng nhập:</label>
        <span class="fs-16p ff-rm">{{ user ? user.Username : "---" }}</span>
      </li>
      <li>
        <label class="fs-16p">Email:</label>
        <span class="fs-16p ff-rm">{{ user ? user.Email : "---" }}</span>
      </li>
      <li>
        <label class="fs-16p">Tên đầy đủ:</label>
        <span class="fs-16p ff-rm">{{ user && user.FullName ? user.FullName : "---"}}</span>
      </li>
      <li>
        <label class="fs-16p">Ngày sinh:</label>
        <span class="fs-16p ff-rm">{{ user && user.DateOfBirth ? convertDate(user.DateOfBirth) : "---"}}</span>
      </li>
      <li>
        <label class="fs-16p">Giới tính:</label>
        <span class="fs-16p ff-rm">{{ user && user.Gender ? user.Gender : "---"}}</span>
      </li>
      <li>
        <label class="fs-16p">Địa chỉ:</label>
        <span class="fs-16p ff-rm">{{ user && user.Address ? user.Address : "---"}}</span>
      </li>
      <li>
        <label class="fs-16p">Số điện thoại:</label>
        <span class="fs-16p ff-rm">{{ user && user.PhoneNumber ? user.PhoneNumber : "---"}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import UserMixin from "@/mixins/index.js";
import UserService from "@/services/user";
import authHelper from "@/helpers/authorize.js";

export default {
  data() {
    return {
      user: null,
    }
  },

  mixins: [UserMixin],

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      this.showLoading();
      var user = this.getUserInfo();
      if (user) {
        var res = await UserService.getUserById(user.UserID);
        if (res && res.data && res.data.Data) {
          this.user = res.data.Data;
        }
      }
      this.hideLoading();
    },
  }
}
</script>

<style scoped>
.container #userInfo {
  margin-top: 35px;
  padding: 0px 15px;
  display: inline-block;
}
.container #userInfo > li {
  display: inline-block;
  width: 50%;
  padding: 8px 5px;
}

.container #userInfo > li label {
  width: 200px;
}

@media only screen and (max-width: 736px) {
  .container #userInfo > li {
    width: 100%;
  }
  .container #userInfo > li label {
    width: 135px;
  }
}
</style>
