import axios from './baseaxios';

const services = axios.create(process.env.BASE_USER_URL + "Auth");

export default {
    async login(username, pass) {
        var res = await services.post("/login", {
            email: username,
            password: pass
        });
        return res;
    },

    async register(userInfo) {
        return await services.post("/register", userInfo);
    },
}