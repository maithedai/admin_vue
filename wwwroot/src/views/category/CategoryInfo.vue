<template>
  <div class="new-info">
    <div class="card content mt-2 ml-5 mr-5 mb-3">
      <div class="card-body">
        <div class="title">
          <h3>{{ editMode ? "Chỉnh sửa bài đăng, tin tức" : "Tạo bài đăng, tin tức" }}</h3>
          <hr />
        </div>

        <div class="row">
          <div class="formContent">
            <div class="form-group">
              <label class="d-required">Tiêu đề</label>
              <input
                class="form-control"
                v-model="newData.Title"
                placeholder="Nhập tiêu đề"
                :class="$v.newData.Title.$error ? 'invalid' : ''"
              />
              <small class="text-danger" v-if="$v.newData.Title.$error">
                Trường không được để trống
              </small>
            </div>

            <div class="form-group">
              <label class="d-required">Nội dung</label>
              <TextEditor
                :markup="newData.Content"
                :class="$v.newData.Content.$error ? 'invalid' : ''"
                @change-value="changeHtmlContent"
              />
              <small class="text-danger" v-if="$v.newData.Content.$error">
                Trường không được để trống
              </small>
            </div>

            <!-- <div class="row">
              <div class="col-12 col-lg-6 col-md-6 pr-4"> -->
                <UploadImage
                  :imageUrl="newData.ImageUrl"
                  :maxSize="5"
                  @select-file="getImage"
                  @remove-file="isRemoveImage = true"
                >
                  <template slot="label">
                    <img src="@/assets/icon/add-image.png" />
                    <div>Thêm hình ảnh</div>
                    <div class="fs-11p fs-i">File nhỏ hơn hoặc bằng 5MB</div>
                  </template>
                </UploadImage>
             
          </div>
        </div>

        <div class="addNew">
          <button class="d-btn d-btn-primary" @click="validateBeforeSave">
            {{ editMode ? "Lưu" : "Thêm mới" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DriveService from "@/services/drivecommon";
import { required } from "vuelidate/lib/validators";
import UploadImage from "@/components/uploadImage/UploadAvatar";
import TextEditor from "@/components/html-editor/index";
import UploadFile from "@/components/uploadFile/index";

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
    };
  },

  validations: {
    newData: {
      Title: { required },
      Content: { required },
    },
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
    UploadImage,
    TextEditor,
    UploadFile,
  },

  created() {
    this.bindingData();
  },

  methods: {
    /**
     * xử lý binding dữ liệu hiển thị
     */
    async bindingData() {
      var newsID = this.$route.params.newsId;
      console.log("newsID", newsID);
      if (newsID) {
        // gọi service
        var res = await NewService.getNewByID(newsID);
        console.log("res", res);
        if (res.data && res.data.Success) {
          this.newData = res.data.Data;
        }
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    },
    /**
     * validate trước khi lưu dữ liệu
     */
    validateBeforeSave() {
      this.$v.newData.$touch();
      console.log(this.newData.DriverID);
      if (!this.$v.newData.$invalid) {
        this.saveData();
      } else {
        this.focusToFirstInput("invalid");
      }
    },
    /**
     * thực hiện lưu dữ liệu
     */
    async saveData() {
      // xóa avatar cũ trên drive
      if (this.isRemoveImage) {
        this.deleteAvatarOnDrive();
      }
      // upload avatar mới lên drive
      if (this.image) {
        await this.uploadAvatarOnDrive();
      }

      var userInfo = this.getUserInfo();
      var dataSave = Object.assign({}, this.newData);
      // xử lý data trước khi lưu
      dataSave.UserID = userInfo.UserID;

      if (this.editMode) {
        dataSave.ModifiedBy = userInfo.FullName;
        dataSave.CreatedBy = userInfo.FullName;
        this.handleUpdate(dataSave);
      } else {
        dataSave.CreatedBy = userInfo.FullName;
        this.handleAdd(dataSave);
      }
    },
    /**
     * thực hiện cập nhật
     */
    async handleUpdate(dataSave) {
      var res = await NewService.updateNew(dataSave);
      if (res.data && res.data.Success) {
        this.$message.success("Cập nhật thành công.");
        this.goto("/news");
      } else {
        this.$message.error("Cập nhật thất bại.");
      }
    },
    /**
     * thực hiện thêm mới
     */
    async handleAdd(dataSave) {
      var res = await NewService.createNew(dataSave);
      if (res.data && res.data.Success) {
        this.$message.success("Thêm mới thành công.");
        this.goto("/news");
      } else {
        this.$message.error("Thêm mới thất bại.");
      }
    },

    /**
     * upload file lên drive
     */
    async uploadAvatarOnDrive() {
      if (this.image) {
        var file = this.convertFileToFormData(this.image, "file");
        var uploadRes = await DriveService.uploadFileOnDrive(file);
        if (uploadRes.data) {
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
      if (this.newData.DriverID) {
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
    changeHtmlContent(content) {
      console.log(content);
      this.newData.Content = content;
    },
  },
};
</script>

<style scoped>
.new-info {
  display: flex;
  width: 100%;
}

.title {
  text-align: center;
}
.formContent {
  flex-direction: columns;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

.content {
  width: 100%;
}

.addNew {
  text-align: center;
}

hr {
  width: 25%;
  text-align: center;
}
</style>