<template>
    <Dialog
        titleDialog="Tạo bài đăng, tin tức"
        :dialogVisible="dialogVisible"
        :width="'800px'"
        @closeDialog="handleCloseDialog"
    >
        <template slot="content">
            <div class="row mx-0">
                <div class="col-lg-5 col-md-4 pl-0">
                    <UploadImage
                        :imageUrl="newData.ImageUrl"
                        :maxSize="3"
                        @select-file="getImage"
                        @remove-file="isRemoveImage = true"
                    >
                        <template slot="label">
                            <img src="@/assets/icon/add-image.png"/>
                            <div>Thêm hình ảnh</div>
                            <div class="fs-11p fs-i">File nhỏ hơn hoặc bằng 3MB</div>
                        </template>
                    </UploadImage>
                </div>

                <div class="col-lg-7 col-md-4 px-0">

                    <div class="form-group">
                        <label class="d-required">Tiêu đề</label>
                        <input class="form-control"
                            v-model="newData.Title"
                            placeholder="Nhập tiêu đề"
                            :class="$v.newData.Title.$error ? 'invalid' : ''"
                        />
                        <small class="text-danger" v-if="$v.newData.Title.$error">
                            Trường không được để trống
                        </small>
                    </div>

                    <div class="form-group">
                        <label>Nội dung</label>
                        <textarea class="form-control"
                            placeholder="Nhập nội dung..."
                            v-model="newData.Content"
                            :class="$v.newData.Content.$error ? 'invalid' : ''"
                        />
                        <small class="text-danger" v-if="$v.newData.Content.$error">
                            Trường không được để trống
                        </small>
                    </div>
                </div>
            </div>
        </template>

        <template slot="footer">
            <button class="d-btn d-btn-outline mr-3" @click="handleCloseDialog">Đóng</button>
            <button class="d-btn d-btn-primary" @click="validateBeforeSave">{{ editMode ? 'Lưu' : 'Thêm mới' }}</button>
        </template>
    </Dialog>
</template>

<script>
import DriveService from "@/services/drivecommon";
import { required } from 'vuelidate/lib/validators';
import Dialog from "@/components/dialog/index";
import UploadImage from "@/components/uploadImage/UploadAvatar";

export default {
    data() {
        return {
            // dữ liệu hiển thị
            newData: {
                Title: null,
                Content: null,
                DriverID: null,
                ImageUrl: null,
            },
            // file ảnh
            image: null,
            // trạng thái xóa ảnh khi lưu
            isRemoveImage: false,

            editMode: false,
        }
    },
    validations: {
        newData: {
            Title: { required },
            Content: { required },
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
        },
        // dữ liệu nếu là chỉnh sửa
        newEdit: {
            type: Object,
            default: null,
        },
    },
    components: {
        Dialog,
        UploadImage,
    },

    created() {
        this.bindingData(this.newEdit);
    },

    methods: {
        /**
         * xử lý binding dữ liệu hiển thị
         */
        bindingData(data) {
            if(data) {
                this.newData = Object.assign({}, data);
                this.editMode = true;
            }
            else {
                this.editMode = false;
            }
        },
        /**
         * validate trước khi lưu dữ liệu
         */
        validateBeforeSave() {
            this.$v.newData.$touch();
            console.log(this.newData.DriverID);
            if(!this.$v.newData.$invalid) {
                this.saveData();
            }
            else {
                this.focusToFirstInput('invalid');
            }
        },
        /**
         * thực hiện lưu dữ liệu
         */
        async saveData() {
            // xóa avatar cũ trên drive
            if(this.isRemoveImage) {
                this.deleteAvatarOnDrive();
            }
            // upload avatar mới lên drive
            if(this.image) {
                await this.uploadAvatarOnDrive();
            }

            var userInfo = this.getUserInfo();
            var dataSave = Object.assign({}, this.newData);
            // xử lý data trước khi lưu
            dataSave.UserID = userInfo.UserID;

            if(this.editMode) {
                dataSave.ModifiedBy = userInfo.FullName;
                this.handleUpdate(dataSave);
            }
            else {
                dataSave.CreatedBy = userInfo.FullName;
                this.handleAdd(dataSave);
            }
        },
        /**
         * thực hiện cập nhật
         */
        async handleUpdate(dataSave) {
            var res = await NewService.updateNew(dataSave);
            if(res.data && res.data.Success) {
                this.$message.success("Cập nhật thành công.");
                this.$emit("save-data");
            } else {
                this.$message.error("Cập nhật thất bại.");
            }
        },
        /**
         * thực hiện thêm mới
         */
        async handleAdd(dataSave) {
            var res = await NewService.createNew(dataSave);
            if(res.data && res.data.Success) {
                this.$message.success("Thêm mới thành công.");
                this.$emit("save-data");
            } else {
                this.$message.error("Thêm mới thất bại.");
            }
        },

        handleCloseDialog() {
            this.$emit("closeDialog");
        },

        /**
         * upload file lên drive
         */
        async uploadAvatarOnDrive() {
            if(this.image) {
                var file = this.convertFileToFormData(this.image, "file");
                var uploadRes = await DriveService.uploadFileOnDrive(file);
                if(uploadRes.data) {
                    this.newData.ImageName = uploadRes.data.FileName;
                    this.newData.DriverID = uploadRes.data.FileID;
                    this.newData.ImageUrl = uploadRes.data.PreviewUrl;
                }
            }
        },
        /**
         * xóa file trên drive
         */
        async deleteAvatarOnDrive() {
            if(this.newData.DriverID) {
                await DriveService.deleteFileOnDrive(this.newData.DriverID);
                this.newData.ImageName = null;
                this.newData.DriverID = null;
                this.newData.ImageUrl = null;
            }
        },
        /**
         * lấy file ảnh từ component
         */
        getImage(file) {
            this.image = file;
        },
    }
}
</script>

<style scoped>
  textarea {
    height: 300px;
  }
</style>
