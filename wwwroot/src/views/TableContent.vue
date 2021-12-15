<template>
    <div class="table-content">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Time</th>
                    <th class="action-edit">Action</th>
                </tr>
            </thead>
            <tbody v-if="categoryData && categoryData.length > 0">
                <tr v-for="(item, index) in categoryData" :key="index" :class="{'item-active': item.id == idItem}" @click="selectedItem(item)">
                    <td> {{ item.id }} </td>
                    <td> {{ item.category }} </td>
                    <td> {{ item.time }} </td>
                    <td class="action-edit">
                        <button class="d-btn d-btn-icon d-btn-primary" @click="actionEdit">
                            <i class="el-icon-edit"></i>
                            Edit
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    data() {
        return {
            categoryData: [],
            idItem: 0,
        }
    },

    created() {
        this.getDataCategory();
    },

    methods: {
        actionEdit() {

        },

        getDataCategory() {
            var me = this;
            this.axios.get('http://34.126.110.103:8080/uetshare/category').then((response) => {
                if (response) {
                    me.categoryData = response.data.categoryDtoList
                }
            }).catch((error) => {
                console.log(error);
            });
        }, 
        selectedItem(item) {
            this.idItem = item.id;
        },

        deleteCategory() {
            console.log(this.idItem);
        }
    },
}
</script>

<style scoped>
.table-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    border-bottom: 1px solid #ccc;
}

.table-content table {
    width: 100%;
}

thead th {
    position: sticky;
    top: 0;
    background-color: #eceef1;
    color: #000;
    text-align: center;
    border-right: 1px solid #ccc;
    padding: 0px;
    height: 34px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(134, 134, 134, 0.3);
  border-radius: 10px;
  background-color: #FFFFFF;
}

thead tr th {
    font-weight: 600;
    font-size: 16px
}

td {
  /* padding-left: 10px; */
  border-bottom: 1px solid #ccc;
  border-right: 1px dotted #ccc;
}

tr:hover {
  background-color: rgb(245, 245, 245);
}

td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.action-edit {
    width: 150px;
    text-align: center;
}

.item-active {
    background-color: #95b9e5 !important;
}
</style>