import axios from './baseaxios';

const servicesCommon = axios.create(process.env.BASE_COMMON_URL + "File");

export default {
    /**
     * thực hiện upload 1 file lên db
     */
    async uploadFileOnDrive(file) {
        return await servicesCommon.post("/UploadV2", file);
    },
    /**
     * xóa file trên drive theo id
     */
    async deleteFileOnDrive(fileID) {
        return await servicesCommon.delete(`?fileId=${fileID}`);
    },
}