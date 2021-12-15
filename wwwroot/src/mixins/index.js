import $ from "jquery";
import authHelper from "@/helpers/authorize.js";
import {VMoney} from 'v-money';
import writtenNumber from "written-number";

export default {
    data() {
        return {
            // định dạng tiền
            money: {
                decimal: '.',
                thousands: ',',
                prefix: '',
                suffix: '',
                precision: 0,
                masked: false /* doesn't work with directive */
            }
        }
    },

    directives: {
        money: VMoney,
    },

    methods: {
        /**
         * Hàm chuyển router
         */
        goto(url) {
            if(this.$route.path != url) {
                this.$router.push(url);
            }
        },
        /**
         * Chuyển hướng đến trang (load lại toàn bộ app)
         */
        redirect(url) {
            if(this.$route.path != url) {
                window.location.href = url;
            }
        },

        /**
         * chuyển hướng về trang trước
         */
        goBack() {
            this.$router.go(-1);
        },
        /**
         * reload lại trang
         */
        reload() {
            this.$router.go();
        },
        /**
         * hàm lấy url của trang hiện tại
         */
        getCurrentUrl(){
            return this.$route.path;
        },
        /**
         * Lấy thông tin người dùng
         */
        getUserInfo() {
            return authHelper.getUserInfo();
        },
        isHaveToken() {
            var token = authHelper.getToken();
            return !this.isNullOrUndefined(token);
        },
        /**
         * focus vào ô input đầu tiên theo class
         */
        focusToFirstInput(className){
            if(className) {
                setTimeout(() => {
                    $(`input.${className}, textarea.${className}`).first().focus();
                }, 20);
            }
        },
        /**
         * hiện loading toàn màn hình
         */
        showLoading() {
            $(".full-screen-loading").removeClass("d-none");
        },
        /**
         * ẩn loading toàn màn hình
         */
        hideLoading() {
            $(".full-screen-loading").addClass("d-none");
        },
        /**
         * kiểm tra giá trị null hoặc undefined
         */
        isNullOrUndefined(val) {
            return val == null || val == undefined;
        },

        /**
         * chuyển định thời gian trong database thành hh:mm:ss dd/MM/yyyy
         */
         convertTime(value) {
          var date = new Date(value);
          var hour = date.getHours();
          var minute = date.getMinutes();
          var second = date.getSeconds();
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          // Chuyển đổi sang dạng 01, 02, 03
          hour = this.checkTime(hour);
          minute = this.checkTime(minute);
          second = this.checkTime(second);
          day = this.checkTime(day);
          month = this.checkTime(month);
          var result = hour + ":" + minute + ":" + second + " " + day + "/" + month + "/" + year;
          return result;
        },

        /**
         * Hàm chuyển những số bé hơn 10 thành dạng 01, 02, 03, ...
         */
        checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },

        /**
         * chuyển định thời gian trong database thành hh:mm dd/MM/yyyy
         */
         convertDateTime(value) {
          var date = new Date(value);
          var hour = date.getHours();
          var minute = date.getMinutes();
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          // Chuyển đổi sang dạng 01, 02, 03
          hour = this.checkTime(hour);
          minute = this.checkTime(minute);
          day = this.checkTime(day);
          month = this.checkTime(month);
          var result = hour + ":" + minute + "--" + day + "/" + month + "/" + year;
          return result;
        },

        /**
         * chuyển định dạng ngày từ database thành dd/MM/yyyy
         */
        convertDate(value) {
            var date = new Date(value);
            var dateInMonth = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return dateInMonth + "/" + month + "/" + year;
        },
        /**
         * convert định dạng ngày tháng sang england để lưu vào DB
         */
        convertToEnglandDateTime(value) {
            if(value) {
                var date = new Date(value);
                var dateInMonth = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                var result = year + "-" + month + "-" + dateInMonth;
                return result;
            }
            else {
                return null;
            }
        },
        /**
         * convert định dạng decimal
         */
        convertDecimal(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
        },
        /**
         * chuyển định dạng tiền thành số
         */
        convertMoneyToNumber(currency) {
            if(currency && currency != '') {
                var number = Number(currency.replace(/[^0-9.-]+/g,""));;
                return number;
            }
            else {
                return 0;
            }
        },
        /**
         * tạo uuid random
         */
        createUUID() {
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            uuid = uuid.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            return uuid;
        },
        showMessageError() {
            this.$message.error("Có lỗi xảy ra, vui lòng thử lại sau giây lát.");
        },
        /**
         * hàm chuyển các file thành dạng formdata
         * @param {*} represent : biến đại diện (giống tên biến trên service)
         */
        convertFileToFormData(files, represent = "files") {
            if(!files) return;
            var formData = new FormData();
            files.forEach(ele => {
                formData.append(represent, ele);
            });
            return formData;
        },
        /**
         * Tạo link download
         * @param {*} arrayBuffer : nội dung file dạng array buffer
         * @param {*} fileName : tên file
         * @param {*} contentType : mimeType của file
         */
        createLinkDownloadFile(arrayBuffer, fileName, contentType) {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            var blob = new Blob([arrayBuffer], {type: contentType}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        },
        /**
         * Tạo link xem file
         * @param {*} arrayBuffer : nội dung file dạng array buffer
         * @param {*} fileName : tên file
         * @param {*} contentType : mimeType của file
         */
        createLinkPreviewFile(arrayBuffer, fileName, contentType) {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.target = "_blank";
            var blob = new Blob([arrayBuffer], {type: contentType}),
                url = window.URL.createObjectURL(blob);
            a.download = fileName;
            window.open(url);
            a.remove();
        },
        /**
         * convert data base 64 sang array buffer
         * @param {*} base64 : data dạng base64 mà FileContentResult trả về
         */
        base64ToArrayBuffer(base64) {
            var binaryString = window.atob(base64);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++) {
                var ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            return bytes;
        },
        /**
         * convert dạng bit sang megabyte
         */
        convertBitToMegabyte(bitVal) {
            if(!bitVal) {
                return 0;
            }
            var mb = bitVal / 1024 / 1024;
            mb = this.roundUpTo2Decimal(mb);
            return mb;
        },
        /**
         * làm tròn đến chữ số thập phân thứ 2
         */
        roundUpTo2Decimal(numb) {
            if(!numb) {
                return 0;
            }
            var rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
            return rounded;
        },
        /**
         * convert số thành chữ
         */
        convertNumberToWord(num) {
            if(num) {
                var word = writtenNumber(parseInt(num), {lang: 'vi'}) + " đồng";
                word = word.charAt(0).toUpperCase() + word.slice(1);
                return word;
            }
            else {
                return null;
            }
        },
        /**
         * kiểm tra role của user so với role truyền vào
         * @param {*} requiredRoles : mảng role
         * @returns true nếu role của user có trong role truyền vào, false nếu không
         */
        hasPermission(requiredRoles) {
            if(requiredRoles) {
                var userRoles = authHelper.getRoles();
                const hasPermission = userRoles.some(role => {
                    return requiredRoles.includes(role);
                });
                return hasPermission;
            }
            else {
                return false;
            }
        },
        createBillCode() {
            var code = null;
            var date = new Date();
            var dateInMonth = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getYear();
            var minute = date.getMinutes();
            var hour = date.getHours();
            var random = Math.floor(Math.random() * 100);
            code = year.toString() + month.toString() + dateInMonth.toString() + hour.toString() + minute.toString() + random.toString();
            return code;
        },
    }
}
