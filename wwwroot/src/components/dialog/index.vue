<template>
    <el-dialog
        :title="titleDialog"
        :visible="dialogVisible"
        :width="width"
        :fullscreen="fullscreen"
        :close-on-click-modal="false"
        @close="closeDialog"
    >
        <div class="dialog-content">
            <slot name="content">
                Nội dung
            </slot>
        </div>

        <span slot="footer" class="dialog-footer">
            <slot name="footer">
                footer
            </slot>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
        }
    },

    props: {
        // tiêu đề
        titleDialog: {
            type: String,
            default: "Title"
        },
        // có đang hiển thị hay ko
        dialogVisible: {
            type: Boolean,
            default: false
        },
        // width của dialog
        width: {
            type: String,
            default: null
        },
        fullscreen: {
            type: Boolean,
            default: false
        },
    },

    methods: {
        closeDialog() {
            this.$emit("closeDialog");
        }
    }
}
</script>

<style scoped>
.dialog-content {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 77vh;
}
</style>