<template>
    <Paginate
        :page-count="pageCount"
        :page-range="pageRange"
        :margin-pages="marginPages"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'">
    </Paginate>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
    components: {
        Paginate,
    },

    props: {
        pageCount: {
            Type: Number,
            default: 0
        },

        pageRange: {
            Type: Number,
            default: 0
        },

        marginPages: {
            Type: Number,
            default: 0
        },

        classPageItem: {
            Type: String,
            default: ''
        }
    },

    methods: {
        clickCallback(pageNum) {
            this.$emit("changePageCurent", pageNum);
        }
    },
}
</script>

<style lang="css">
.page-item {
    width: 40px !important;
    height: 40px !important;
    margin-right: 10px;
    margin-left: 10px;
    background-color: #e5e5e5;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    border-radius: 50%;
}

.page-item a {
    color: #000;
    font-size: 14px;
}

.active {
    background-color: rgb(149, 179, 245);
    color: #000;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
</style>