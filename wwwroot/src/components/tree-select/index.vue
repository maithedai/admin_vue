<template>
    <el-tree 
        :data="treeData" 
        :props="treeProps"
        :default-expand-all="expandAll"
        :show-checkbox="isHaveCheckbox"
        :indent="indent"
    >
        <template slot-scope="{ node, data }">
            <slot name="node-label"
                :node="node"
                :data="data"
            ></slot>
        </template>
    </el-tree>
</template>

<script>
export default {
    data() {
        return {
            treeProps: {
                children: 'children',
                label: 'label'
            },
        }
    },

    props: {
        treeData: {
            type: Array,
            default: null,
        },
        childrenName: {
            type: String,
            default: "children",
        },
        labelName: {
            type: String,
            default: "label",
        },
        indent: {
            type: Number,
            default: 32,
        },
        expandAll: {
            type: Boolean,
            default: false
        },
        isHaveCheckbox: {
            type: Boolean,
            default: false
        },
    },

    created() {
        this.setProps();
    },

    methods: {
        setProps() {
            this.treeProps.children = this.childrenName;
            this.treeProps.label = this.labelName;
        },
    },
}
</script>

<style>

</style>