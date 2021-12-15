<template>
    <div class="table-footer">
        <slot name="slot-footer">
            <div class="footer-table">
                <div>Tổng số: <span class="fw-b">{{ totalRecord ? totalRecord : 0 }} bản ghi</span></div>

                <div class="pagination-right" v-if="isHavePagination">
                    <!-- resize page -->
                    <div class="mr-2">Hiển thị</div>

                    <!-- thay đổi size -->
                    <el-select v-model="paginationInfo.limit"
                        class="col-2 px-0"
                    >
                        <el-option
                            v-for="item in pageSizes"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                    

                    <div class="ml-3 mr-2">
                        {{ firstIndex }} - {{ lastIndex }} bản ghi
                    </div>

                    <!-- pagination -->
                    <el-pagination
                        :current-page.sync="paginationInfo.page"
                        :page-size="paginationInfo.limit"
                        layout="total, prev, pager, next"
                        :pager-count="pagerCount"
                        :total="totalRecord"
                        @current-change="handleCurrentChange"
                    ></el-pagination>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
import resources from "@/resources/table";
export default {
    data() {
        return {
            // thông tin phân trang
            paginationInfo: {
                page: 1,
                limit: resources.PAGE_LIMIT,
            },
            pageSizes: resources.PAGE_SIZES,
            pagerCount: 5,
        }
    },

    props: {
        // tổng số bản ghi
        totalRecord: {
            type: Number,
            default: null
        },
        // có phân trang hay không
        isHavePagination: {
            type: Boolean,
            default: null,
        },
    },

    methods: {
        /**
         * Xử lý thay đổi số lượng hiển thị 1 trang
         * Cre: pqhuy 22/03/2021
         */
        handleSizeChange(val) {
            this.paginationInfo.limit = val;
            this.emitChange();
        },

        /**
         * Xử lý chuyển trang
         * Cre: pqhuy 22/03/2021
         */
        handleCurrentChange(val) {
            this.paginationInfo.page = val;
            this.emitChange();
        },

        emitChange() {
            this.$emit("pagination", this.paginationInfo);
        }
    },

    watch: {
        "paginationInfo.limit": {
            handler() {
                this.emitChange();
            }
        },
    },

    computed: {
        firstIndex() {
            return (this.paginationInfo.page - 1) * this.paginationInfo.limit + 1;
        },

        lastIndex() {
            if(this.paginationInfo.page * this.paginationInfo.limit >= this.totalRecord) {
                return this.totalRecord;
            }
            return this.paginationInfo.page * this.paginationInfo.limit;
        }
    },
}
</script>

<style scoped>
.table-footer {
    min-height: 56px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    border: 1px solid #e5e5e5;
    border-top: 0;
    border-radius: 0 0 4px 4px;
}
.table-footer .footer-table {
    padding: 0 12px;
    display: flex;
    align-items: center;
}
.pagination-right {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.pagination-size {
    min-height: 36px;
    width: 65px;
    border: 1px solid #CECECE;
    border-radius: 4px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    outline: none;
}
.custom-footer {
    height: 100%;
    width: 100%;
}
</style>