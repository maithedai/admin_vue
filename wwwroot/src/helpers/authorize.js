import jwtDecode from "jwt-decode";
import claimType from "@/enums/claimType";

export default {
    /**
     * Lấy token từ storage
     */
    getToken() {
        return localStorage.d_token;
    },
    /**
     * decode token
     * @returns dạng object của token
     */
    decodeToken(bearerToken) {
        try {
            if(bearerToken) {
                const regex = /Bearer/i;
                var token = bearerToken.toString().replace(regex, "").trim();
                return jwtDecode(token).data;
            }
            else {
                return null;
            }
        }
        catch(err) {
            console.log(err);
        }
    },
    /**
     * lấy giá trị của claim trong token
     */
    getTokenClaim(claim) {
        try {
            var tokenObject = this.decodeToken(this.getToken());
            if(tokenObject) {
                return tokenObject[claim];
            }
        }
        catch(err) {
            console.log(err);
        }
    },
    /**
     * Lấy danh sách các role của user trong token
     */
    getRoles() {
        try {
            let roles = this.getTokenClaim(claimType.ROLE_CODE);
            if(roles != null && roles != "" && roles) {
                return roles.split(";");
            }
        }
        catch(err) {
            console.log(err);
        }
    },

    /**
     * set token vào storage
     */
    setToken(accessToken) {
        localStorage.d_token = accessToken
    },

    /**
     * set thông tin user vào storage
     */
    setUserInfo(userInfo) {
        var localUserData = {
            FullName: userInfo.FullName,
            UserID: userInfo.UserID,
            Username: userInfo.Username,
            RoleName: userInfo.RoleName,
            StockID: userInfo.StockID,
            StockName: userInfo.StockName,
            Email: userInfo.Email,
        }
        localStorage.user = JSON.stringify(localUserData);
    },

    /**
     * Lấy thông tin user
     */
    getUserInfo() {
        var userInfo = localStorage.user;
        if(userInfo) {
            return JSON.parse(userInfo);
        }
        else {
            return null;
        }
    },
}