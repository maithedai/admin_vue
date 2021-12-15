<template>
  <div>
    <DxHtmlEditor
      :height="height"
      v-model="valueContent"
      :value="valueContent"
    >
      <DxMediaResizing :enabled="true" />
      <DxToolbar :multiline="isMultiline">
        <DxItem
          v-for="(item, index) in displayFeature"
          :key="index"
          :format-name="item"
          :format-values="getFormatValue(item)"
        >
        </DxItem>
      </DxToolbar>
    </DxHtmlEditor>
  </div>
</template>

<script>
import {
  DxHtmlEditor,
  DxToolbar,
  DxMediaResizing,
  DxItem,
} from "devextreme-vue/html-editor";
import $ from "jquery";

export default {
  data() {
    return {
      sizeValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"],
      fontValues: [
        "Arial",
        "Courier New",
        "Georgia",
        "Impact",
        "Lucida Console",
        "Tahoma",
        "Times New Roman",
        "Verdana",
      ],
      headerValues: [false, 1, 2, 3, 4, 5],
      defaultFeature: [
        "undo",
        "redo",
        "variable",
        "separator",
        "size",
        "font",
        "italic",
        "bold",
        "underline",
        "strike",
        "separator",
        "color",
        "background",
        "separator",
        "clear",
        "blockquote",
        "codeBlock",
        "separator",
        "link",
        "image",
        "separator",
        "alignLeft",
        "alignCenter",
        "alignRight",
        "alignJustify",
        "separator",
        "orderedList",
        "bulletList",
        "separator",
        "header",
        "separator",
        "subscript",
        "superscript",
        "increaseIndent",
        "decreaseIndent",
        "separator",
        "insertTable",
        "deleteTable",
        "insertRowAbove",
        "insertRowBelow",
        "deleteRow",
        "insertColumnLeft",
        "insertColumnRight",
        "deleteColumn",
      ],
      displayFeature: null,
      valueContent: "",
      isMultiline: true,
    };
  },

  props: {
    height: {
      type: String,
      default: "500px",
    },
    markup: {
      type: String,
      default: "",
    },
    isMultiline: {
      type: Boolean,
      default: true,
    },
    // các chức năng hiển thị
    feature: {
      type: Array,
      default: null,
    },
    fullFeature: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    DxHtmlEditor,
    DxMediaResizing,
    DxToolbar,
    DxItem,
  },

  created() {
    if (this.feature) {
      this.displayFeature = this.feature;
    } else {
      this.displayFeature = this.defaultFeature;
    }
  },

  methods: {
    getFormatValue(item) {
      if (item) {
        switch (item) {
          case "size":
            return this.sizeValues;
          case "font":
            return this.fontValues;
          case "header":
            return this.headerValues;
        }
      }
      return null;
    },
    emitData() {
      this.$emit("change-value", this.valueContent);
    },
  },

  watch: {
    valueContent: {
      handler() {
        this.emitData();
      },
    },
    markup: {
      handler(val) {
        this.valueContent = val;
      },
    },
  },
};
</script>
<style>
.dx-htmleditor-content img {
  vertical-align: middle;
  padding-right: 10px;
}

.dx-htmleditor-content table {
  width: 50%;
}

.options {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  margin-top: 20px;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
}
</style>
