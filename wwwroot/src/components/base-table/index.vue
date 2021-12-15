<template>
    <div class="base-table"
        v-loading="loading"
        @mouseleave="hideHoverAction"
    >

        <el-table 
            :id="idTable"
            class="custom-table"
            :data="dataDisplay"
            :height="isHaveFooter ? 'calc(100% - 56px)' : '100%'"
            :border="bordered"
            :show-summary="showSummary"
            :summary-method="summaryMethod"
            :show-header="isHaveHeader"
            tooltip-effect="light"
            @cell-mouse-enter="handleCellMouseEnter"
            @row-dblclick="handleDbClick"
            @select="handleSelectRows"
            @select-all="handleSelectAll"
        >
            <template slot="empty">
                <slot name="empty-table">
                    <p>Không có dữ liệu</p>
                </slot>
            </template>

            <!-- Cột checkbox -->
            <el-table-column
                v-if="isCheckbox"
                type="selection"
                width="50"
                align="center"
            ></el-table-column>

            <!-- Cột index -->
            <el-table-column
                v-if="isHaveIndex"
                width="50"
                align="center"
            >
                <template slot="header">
                    <span class="text-dark ff-rb">#</span>
                </template>
                <template slot-scope="scope">
                    <span>{{ getIndex(scope.$index) }}</span>
                </template>
            </el-table-column>

            <!-- Cột nội dung chính -->
            <el-table-column
                v-for="(column, columnIndex) in listColumn" :key="columnIndex"
                :sortable="sortable"
                :sort-by="column.propertyName"
                :width="column.width"
                :align="column.align"
                :header-align="column.headerAlign ? column.headerAlign : column.align"
                :show-overflow-tooltip="showOverflowTooltip"
                :resizable="false"
                class-name="content"
            >
                <!-- header -->
                <template slot="header">
                    <el-tooltip placement="top" effect="light"
                        :content="getHeaderTooltip(column.label)"
                    >
                    <span class="fs-14p ff-rm text-dark">
                        {{ column.label }}
                    </span>
                    </el-tooltip>
                </template>

                <!-- body -->
                <template slot-scope="scope">
                    <table-cell
                        :cellProperty="column"
                        :row="scope.row"
                    >
                        <template slot="slot-cell">
                            <slot name="table-cell"
                                :row="scope.row"
                                :column="column"
                                :index="scope.$index"
                            ></slot>
                        </template>
                    </table-cell>
                </template>
            </el-table-column>


            <!-- Cột hover action -->
            <el-table-column
                fixed="right"
                width="1"
                class-name="hover-action"
                v-if="isHoverAction"
            >
                <template slot-scope="scope">
                    <div class="column-action"
                        v-if="scope.$index == indexHoverRow"
                    >
                        <slot name="column-action"
                            :row="scope.row"
                            :index="scope.$index"
                        >
                        </slot>
                    </div>
                </template>
            </el-table-column>

        </el-table>


        <table-footer
            v-if="isHaveFooter"
            :totalRecord="totalRecord"
            :isHavePagination="isHavePagination"
            @pagination="setPaginationInfo"
            v-on="$listeners"
        >
            <template slot="slot-footer">
                <slot name="table-footer">
                </slot>
            </template>
        </table-footer>
    </div>
</template>

<script>
import tableFooter from "./table-footer";
import $ from "jquery";
import TableCell from './table-cell.vue';
import { debounce } from "@/mixins/common.js";

export default {
    data() {
        return {
            dataDisplay: null,
            showOverflowTooltip: true,
            // thông tin phân trang
            paginationInfo: {
                page: 1,
                limit: 15,
            },
            indexHoverRow: null,
            idTable: null,
        }
    },

    props: {
        // dữ liệu table
        dataTable: {
            default: null
        },
        // list các cột và thuộc tính
        listColumn: {
            default: null
        },
        // có sắp xếp hay không
        sortable: {
            type: Boolean,
            default: true
        },
        // có checkbox hay không
        isCheckbox: {
            type: Boolean,
            default: false
        },
        // có index hay không
        isHaveIndex: {
            type: Boolean,
            default: false
        },
        // có border hay không
        bordered: {
            type: Boolean,
            default: false
        },
        // tổng số bản ghi
        totalRecord: {
            type: Number,
            default: null
        },
        // có hiển thị action hover không
        isHoverAction: {
            type: Boolean,
            default: false
        },
        // có đang loading không
        loading: {
            type: Boolean,
            default: false
        },
        // có header không
        isHaveHeader: {
            type: Boolean,
            default: true,
        },
        // có footer không
        isHaveFooter: {
            type: Boolean,
            default: true,
        },
        // có phân trang hay không
        isHavePagination: {
            type: Boolean,
            default: false,
        },
        // có phân trang hay không
        showSummary: {
            type: Boolean,
            default: false,
        },
        summaryMethod: {
            type: Function,
            default: null,
        },
        // text tìm kiếm
        searchText: {
            type: String,
            default: null,
        },
        // tên trường để tìm kiếm theo
        searchField: {
            type: Array,
            default: null,
        },
    },

    components: {
        tableFooter,
        TableCell,
    },

    created() {
        this.setDataDisplay(this.dataTable);
        this.idTable = this.createUUID();
    },

    methods: {
        /**
         * Xử lý click đúp vào dòng
         * Cre: pqhuy 22/03/2021
         */
        handleDbClick(row) {
            this.$emit("db-click", row);
        },

        /**
         * set lại thông tin phân trang
         * Cre: pqhuy 22/03/2021
         */
        setPaginationInfo(val) {
            this.paginationInfo = val;
        },

        /**
         * index của dòng
         * Cre: pqhuy 22/03/2021
         */
        getIndex(val) {
            return (this.paginationInfo.page - 1) * this.paginationInfo.limit + val + 1;
        },

        /**
         * xử lý check vào dòng
         * Cre: pqhuy 22/03/2021
         */
        handleSelectRows(rows) {
            this.$emit("select-rows", rows);
        },

        /**
         * Xử lý check tất cả
         * Cre: pqhuy 22/03/2021
         */
        handleSelectAll(rows) {
            this.$emit("select-all", rows);
        },

        /**
         * set dữ liệu hiển thị
         * Cre: pqhuy 24/03/2021
         */
        setDataDisplay(data) {
            if(data) {
                this.dataDisplay = Object.assign([], data);
            }
        },

        /**
         * set index hover row
         * Cre: pqhuy 27/03/2021
         */
        handleCellMouseEnter(row, column, cell) {
            var $row = $(cell).parents(".el-table__row");
            this.setHoverColumnStyle();
            this.indexHoverRow = $($row).index();
        },

        /**
         * style cho hover action
         * Cre: pqhuy 11/04/2021
         */
        setHoverColumnStyle(){
            $('.el-table__row .hover-action').removeClass('is-hidden');
            var $row = $('.el-table__row .hover-action').closest("tr");
            if($row.length > 0) {
                var height = $($row[0]).height();
                $('.el-table__row .hover-action').css("height", height + "px");
            }
        },

        /**
         * ẩn hết hover action
         * Cre: pqhuy 11/04/2021
         */
        hideHoverAction() {
            this.indexHoverRow = null;
        },

        /**
         * get nội dung tooltip với các chữ viết tắt
         * Cre: pqhuy 11/04/2021
         */
        getHeaderTooltip(val) {
            var tooltip = val.replace(/SP/i, "sản phẩm");
            tooltip = val.replace(/XNK/i, "xuất nhập kho");
            return tooltip;
        },

        /**
         * xử lý lọc dữ liệu trên bảng
         * Cre: pqhuy 28/04/2021
         */
        handleFilter: debounce(function() {
            if(this.searchText && this.searchField && this.searchField.length > 0) {
                var filtered = Object.assign([], this.dataTable);
                filtered = filtered.filter(row => {
                    var isFound = false;
                    for(var index = 0; index < this.searchField.length; index++) {
                        var field = this.searchField[index];
                        if(row[field]) {
                            isFound = row[field].toLowerCase().includes(this.searchText.toLowerCase());
                        }
                        if(isFound) {
                            break;
                        }
                    }
                    return isFound;
                });
                this.setDataDisplay(filtered);
            }
            else {
                this.setDataDisplay(this.dataTable);
            }
        }, 500),
    },

    watch: {
        dataTable(value) {
            this.setDataDisplay(value);
        },
        searchText: {
            handler() {
                this.handleFilter();
            }
        },
    },

    mounted() {
        let vm = this;
        setTimeout(() => {
            $('.el-table__body').mouseleave(() => {
                vm.hideHoverAction();
            });
        }, 20);

        $(".el-table__body-wrapper").scroll(() => {
            var scrollLeft = $(".el-table__body-wrapper").scrollLeft();
            $(".hover-action").css("right", (0 - scrollLeft));
        });
    }
}
</script>

<style scoped>
.base-table {
    height: 100%;
    position: relative;
    border-radius: 4px;
    box-shadow: 0px 1px 12px rgb(0 0 0 / 11%);
}
.custom-table {
    border: 1px solid #e5e5e5;
    border-radius: 4px 4px 0 0;
}
.column-action {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    height: 100%;
}

</style>