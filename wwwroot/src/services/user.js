import axios from './baseaxios';

const services = axios.create(process.env.BASE_USER_URL + "User");

export default {
  /**
   * Cập nhật thông tin user
   */
  async updateUser(userData) {
    return await services.put("", userData);
  },

  async getUserById(userID) {
    return await services.get(`/${userID}`);
  },

  /**
   * Thay đổi mật khẩu user
   */
  async changePassword(password) {
    return await services.put("/change_password", password);
  },

}
