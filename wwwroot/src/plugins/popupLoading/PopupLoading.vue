<template>
    <ModelLayout
        :width="'450px'"
    >
        <template slot="content">
            <div class="p-4">
                <Loading
                    :visible="true"
                    :message="message"
                ></Loading>
            </div>
        </template>
    </ModelLayout>
</template>

<script>
import ModelLayout from "@/components/model-layout";
import Loading from "@/components/loading";

export default {
    props: {
        message: {
            type: String,
            default: null,
        },
    },

    components: {
        ModelLayout,
        Loading,
    },

    methods: {
        popupLoading() {
            this.$loading({
                lock: true,
                text: this.message,
                spinner: 'el-icon-loading',
                background: '#fff'
            });
        }
    }
}
</script>

<style>

</style>