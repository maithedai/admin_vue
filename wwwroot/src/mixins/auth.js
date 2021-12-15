import bcrypt from "bcryptjs";

export default {
  methods: {
    /**
     * mã hóa text sử dụng bcrypt
     * @param {*} text 
     * @returns 
     */
    bcryptEncode(text) {
      const salt = bcrypt.genSaltSync(10);
      const passHashed = bcrypt.hashSync(text, salt);
      return passHashed;
    },
  },
}