<template>
    <el-drawer
        :title="titleDraw"
        :visible="drawerVisible"
        :direction="'rtl'"
        :before-close="handleClose"
    >
        <div class="drawer-content">
            <slot name="content">

            </slot>
        </div>

        <div class="drawer-footer">
            <slot name="footer">

            </slot>
        </div>
    </el-drawer>
</template>

<script>
export default {
    props: {
        titleDraw: {
            type: String,
            default: "Đây là title"
        },
        drawerVisible: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        handleClose() {
            this.$emit("closeDrawer");
        }
    }
}
</script>

<style scoped>
.drawer-content {
    padding: 0 20px 20px;
}

.drawer-footer {
    width: 100%;
    min-height: 50px;
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid #e5e5e5;
}
</style>