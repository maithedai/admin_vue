<template>
    <div class="upload-avatar p-2">
        <form>
            <label class="avatar-preview"
                for="upload-avatar-input"
            >
                <!-- nếu không có ảnh sẵn thì show form chọn ảnh -->
                <span v-if="!isSelectedFile" class="default-avatar">
                    <slot name="label">
                        <img src="@/assets/icon/add-image.png"/>
                        {{ label }}
                    </slot>
                </span>

                <img v-else class="preview-avatar" :src="imageUrl"/>
            </label>

            <input class="d-none"
                id="upload-avatar-input"
                type='file' 
                ref="fileInput"
                :disabled="isSelectedFile"
                :accept="acceptType"
                @change="uploadFile"
            />
        </form>

        <div class="upload-avatar-action">
            <div v-if="isSelectedFile">
                <i class="el-icon-delete" @click="resetInput"></i>
            </div>
        </div>

    </div>
</template>

<script>
import $ from "jquery";
export default {
    data() {
        return {
            isSelectedFile: false,
            listFiles: null,
            // info file đã chọn
            selectFile: {
                name: null,
                size: null,
                type: null,
            },
        }
    },

    props: {
        label: {
            type: String,
            default: null,
        },
        imageUrl: {
            type: String,
            default: null,
        },
        // size tối đa của file (MB)
        maxSize: {
            type: Number,
            default: null,
        },
        // loại file chấp nhận
        acceptType: {
            type: String,
            default: ".png, .jpg, .jpeg, .gif",
        },
    },

    created() {
        this.handlePreview(this.imageUrl, "url");
    },

    methods: {
        /**
         * xử lý chọn ảnh
         * Cre: pqhuy 21/04/2021
         */
        uploadFile(event) {
            if(event && event.target.files) {
                var files = Array.from(event.target.files);
                var newFile = files[0];
                
                if(this.validateFile(newFile)) {
                    this.selectFile.name = newFile.name;
                    this.selectFile.size = newFile.size;
                    this.handlePreview(newFile, "file");

                    if(!this.listFiles) {
                        this.listFiles = [];
                    }
                    this.listFiles.push(newFile);
                }

                this.$emit("select-file", this.listFiles);
            }
        },
        /**
         * kiểm tra file
         * Cre: pqhuy 21/04/2021
         */
        validateFile(file) {
            var charIndex = file.name.lastIndexOf(".");
            var type = file.name.substring(charIndex + 1);
            var isAccept = this.acceptType.includes(type);
            if(!isAccept) {
                this.$message.warning("Chỉ chọn các file định dạng " + this.acceptType);
                return false;
            }
            
            var size = this.convertBitToMegabyte(file.size);
            if(size > this.maxSize) {
                this.$message.warning("File không được lớn hơn " + this.maxSize + "MB");
                return false;
            }
            
            return true;
        },
        /**
         * xử lý hiển thị ảnh vừa chọn
         * Cre: pqhuy 21/04/2021
         */
        handlePreview(image, type = "file") {
            if(image) {
                this.isSelectedFile = true;
                switch(type) {
                    case "file":
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $('.avatar-preview .preview-avatar').attr('src', e.target.result);
                        };
                        reader.readAsDataURL(image);
                        break;

                    case "url":
                        $('.avatar-preview .preview-avatar').attr('src', image);
                        break;
                }
            }
        },
        /**
         * reset form
         * Cre: pqhuy 21/04/2021
         */
        resetInput() {
            this.isSelectedFile = false;
            this.listFiles = null;
            this.$refs.fileInput.value = null;
            this.$emit("remove-file");
        },
    },
}
</script>

<style scoped>
.avatar-preview {
    width: 250px;
    height: 250px;
    margin: 0;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    cursor: pointer;
}
.avatar-preview .default-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #A1A1A1;
}
.avatar-preview .default-avatar i {
    font-size: 80px;
}
.avatar-preview .preview-avatar {
    max-width: 100%;
    max-height: 100%;
}

.upload-avatar-action {
    width: 250px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.upload-avatar-action i {
    cursor: pointer;
}
</style>