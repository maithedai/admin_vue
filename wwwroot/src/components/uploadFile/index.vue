<template>
    <div class="upload-file">
        <form class="upload-wrap"
            v-if="!isSelectedFile"
            @dragover.prevent
            @drop.stop.prevent="uploadByDrop"
        >
            <label class="label"
                for="file-upload-input"
            >
                <slot name="label">
                    <img src="@/assets/icon/icon-file.png"/>
                    Chọn hoặc kéo thả file vào đây
                </slot>
            </label>

            <input class="d-none"
                id="file-upload-input"
                type="file"
                ref="fileInput"
                :disabled="showFileSelected"
                :accept="acceptType"
                @change="uploadNormal"
                @click="$refs.fileInput.value = null"
            />
        </form>

        <div class="upload-wrap"
            v-if="showFileSelected"
        >
            <span class="file-info">
                <img src="@/assets/icon/icon-excel.png"/>
                {{ selectFile.name }}
                <i class="el-icon-circle-close clear-file-btn" @click="resetInput"></i>
            </span>
        </div>
    </div>
</template>

<script>
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
            // các loại file chấp nhận
            acceptType: null,
        }
    },

    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
        // loại file chấp nhận
        fileType: {
            type: Array,
            default: null,
        },
    },

    created() {
        this.setAcceptType(this.fileType);
    },

    methods: {
        uploadByDrop(event) {
            console.log(event);
        },
        /**
         * set accept file type
         * Cre: pqhuy 21/04/2021
         */
        setAcceptType(listFileType) {
            if(listFileType && listFileType.length > 0) {
                this.acceptType = "";
                listFileType.forEach((ele, index) => {
                    this.acceptType += "." + ele;
                    if(index < listFileType.length - 1) {
                        this.acceptType += ", ";
                    }
                });
            }
        },
        /**
         * bắt sự kiện chọn file
         * Cre: pqhuy 17/04/2021
         */
        uploadNormal(event) {
            if(event && event.target.files) {
                var files = Array.from(event.target.files);
                var newFile = files[0];
                
                if(this.validateFile(newFile)) {
                    this.isSelectedFile = true;
                    this.selectFile.name = newFile.name;
                    this.selectFile.size = newFile.size;

                    if(!this.listFiles) {
                        this.listFiles = [];
                    }
                    this.listFiles.push(newFile);
                }

                this.emitUpload();
            }
        },
        /**
         * kiểm tra file
         * Cre: pqhuy 21/04/2021
         */
        validateFile(file) {
            var charIndex = file.name.lastIndexOf(".");
            var type = file.name.substring(charIndex + 1);
            var isAccept = this.acceptType ? this.acceptType.includes(type) : true;

            if(!isAccept) {
                this.$message.warning("Chỉ chọn các file định dạng " + this.acceptType);
                return false;
            }
            
            return true;
        },
        /**
         * reset chọn lại
         * Cre: pqhuy 17/04/2021
         */
        resetInput() {
            if(!this.showFileSelected) {
                this.$refs.fileInput.value = null;
            }
            this.isSelectedFile = false;
            this.selectFile.name = null;
            this.listFiles = null;
            this.$emit("reset");
        },
        /**
         * emit data
         * Cre: pqhuy 17/04/2021
         */
        emitUpload() {
            this.$emit("upload", this.listFiles);
        },
    },

    computed: {
        showFileSelected() {
            return !this.multiple && this.isSelectedFile;
        },
    },
}
</script>

<style scoped>
.upload-file {
    margin: auto;
}
.upload-wrap {
    background-color: #fff;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #b9bbb9;
    border-radius: 8px;
}
.upload-wrap .label {
    height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.upload-wrap .label img {
    height: 24px;
    width: 24px;
}
.file-info {
    position: relative;
    padding-right: 30px;
}
.clear-file-btn {
    position: absolute;
    right: 0;
    top: 4px;
    cursor: pointer;
    font-size: 16px;
}
.clear-file-btn:hover {
    color: orangered;
}
</style>