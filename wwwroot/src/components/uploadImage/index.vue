<template>
    <div class="upload-file" v-loading="loading">
        <el-upload
            list-type="picture-card"
            :before-upload="checkFileBeforeUpload"
            :auto-upload="autoUpload"
            :multiple="multiple"
            drag
            :limit="limitNumOfFile"
            :file-list="fileListDefault"
            :on-change="changeFileList"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            :on-progress="pendingRequest"
            :action="uploadURL"
            ref="upload"
        >
            <slot name="label">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Chọn file png, jpg, jepg và kích thước ≤ {{fileSizeLimit}}MB</div>
            </slot>

            <div slot="file" slot-scope="{file}">
                <i v-if="file.IsAvatar" class="el-icon-circle-check check-avatar"></i>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                
                <span class="el-upload-list__item-actions">
                    <!-- Nút đặt làm ảnh đại diện -->
                    <span v-if="!file.IsAvatar" v-permission="$roles.BUSINESS_MANAGER"
                        class="el-upload-list__item-delete"
                        @click="handleSetAvatar(file)"
                    >
                        <i class="el-icon-user"></i>
                    </span>

                    <!-- Nút xem trước -->
                    <span class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                    >
                        <i class="el-icon-zoom-in"></i>
                    </span>

                    <!-- Nút xóa -->
                    <span v-if="!disabled" v-permission="$roles.BUSINESS_MANAGER"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                    >
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible"
            width="600px"
        >
            <img class="preview-image pt-3" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import $ from "jquery";
export default {
    data() {
        return {
            fileListDefault: [],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            loading: false,
            limitNumOfFile: 5,
        }
    },

    props: {
        // danh sách file
        fileList: {
            type: Array,
            default: null
        },
        // các loại file
        fileType: {
            type: Array,
            default: null
        },
        // chọn nhiều 1 lúc
        multiple: {
            type: Boolean,
            default: true
        },
        // kích thước tối đa 1 file (MB)
        fileSizeLimit: {
            type: Number,
            default: 3
        },
        // loại file
        fileType: {
            type: String,
            default: null
        },
        // url của service upload
        uploadURL: {
            type: String,
            default: null
        },
        // tự động upload sử dụng service của biến uploadURL
        autoUpload: {
            type: Boolean,
            default: false
        },
    },

    created() {
        this.bindingData(this.fileList);
    },

    methods: {
        /**
         * hàm upload khi không sử dụng autoUpload
         * Cre: pqhuy 14/04/2021
         */
        submitUpload() {
            this.$refs.upload.submit();
        },
        /**
         * binding dữ liệu
         * Cre: pqhuy 12/04/2021
         */
        bindingData(data) {
            if(data) {
                this.fileListDefault = Object.assign([], data);
            }
        },
        /**
         * sự kiện khi thêm file vào danh sách
         * Cre: pqhuy 12/04/2021
         */
        changeFileList(file) {
            // kiểm tra file trước
            if(this.checkFileBeforeUpload(file, false)) {
                this.fileListDefault.push(file);
            }
        },
        /**
         * kiểm tra file hợp lệ
         * Cre: pqhuy 12/04/2021
         */
        checkFileBeforeUpload(file, isShowMessage = true) {
            if(file) {
                let isLessLimitSize = Math.ceil(file.size / 1024 / 1024 < this.fileSizeLimit);
                let duplicate = this.fileListDefault.findIndex(ele => ele.uid == file.uid);
                if(duplicate == -1) {
                    if(isLessLimitSize) {
                        return true;
                    }
                    // nếu không hợp lệ thì không thêm vào
                    else {
                        this.bindingData(this.fileListDefault);
                        if(isShowMessage) {
                            this.$message.warning(`File không được lớn hơn ${this.fileSizeLimit}MB.`);
                        }
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        },
        /**
         * xóa file khỏi danh sách
         * Cre: pqhuy 12/04/2021
         */
        handleRemove(file) {
            if(file) {
                var index = this.fileListDefault.findIndex(ele => ele.uid == file.uid);
                if(index != -1) {
                    this.fileListDefault.splice(index, 1);
                    this.$emit("delete", file);
                }
            }
        },
        /**
         * xem trước file ảnh
         * Cre: pqhuy 12/04/2021
         */
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        /**
         * xử lý đặt làm ảnh đại diện
         * Cre: pqhuy 12/04/2021
         */
        handleSetAvatar(file) {
            this.$_confirm("warning",
                "Xác nhận",
                "Bạn có muốn đặt ảnh này làm ảnh đại diện cho sản phẩm?",
                [
                    {
                        label: "Không",
                        class: "d-btn-outline"
                    },
                    {
                        label: "Có",
                        class: "d-btn-primary",
                        callback: () => {this.$emit("set-avatar", file);}
                    },
                ]
            )
        },
        /**
         * xử lý sau khi upload xong
         * Cre: pqhuy 14/04/2021
         */
        handleUploadSuccess(response, file, fileList) {
            this.loading = false;
            this.$emit("upload-done", response, file, fileList);
        },
        /**
         * thêm loading khi đang thực hiện upload
         * Cre: pqhuy 14/04/2021
         */
        pendingRequest() {
            this.loading = true;
        },
    },

    watch: {
        fileList: {
            handler() {
                this.bindingData(this.fileList);
            }
        }
    },

    mounted() {
        setTimeout(() => {
            $(".el-upload").removeClass("el-upload--picture-card");
        },500)
    },
}
</script>

<style scoped>
.guid-text {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.guid-text .note {
    position: absolute;
    text-overflow: ellipsis;
}
.check-avatar {
    color: #ff6900!important;
    position: absolute;
    right: 8px;
    bottom: 8px;
    font-size: 24px;
    font-weight: bold;
}
.preview-image{
    max-height: 100%;
    max-width: 100%;
}
</style>