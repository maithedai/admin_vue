<template>
    <div class="input-cp">
        <input :autofocus="autofocus" ref="combo" :class="cssClassRequireX" :fieldName="fieldName" v-model="valueX" :type="typeInput" :placeholder="placeholder" :style="styleCss" @blur="handleBlur">
        <div v-show="type == 'search'" class="icon-search"></div>
    </div>
</template>

<script>
export default {
    name: "baseinput",
    props:{
        type: {
            type: String,
            default: 'input'
        },
        value:{
            type: [String, Number],
            default: ''
        },
        placeholder:{
            type: String,
            default: ""
        },
        cssClassRequire:{
            type: String,
            default: ""
        },
        styleCss: {
            type: String,
            default: ""
        },
        typeInput: {
            type: String,
            default: 'text'
        },
        fieldName: {
            type: String,
            default: ''
        },
        isRequire: {
            Type: Boolean,
            default: false
        },
        require: {
            Type: Array,
            default: () => []
        },
        //tên combo
        name: {
            type: String,
            default: ""
        },
        autofocus: {
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            valueX: this.value,
            cssClassRequireX: this.cssClassRequire
        }
    },

    watch: {
        value: {
            handler(val){
                this.valueX = val;
            }

        }, 
        valueX: {
            handler(val){
                if(this.isRequire){
                    this.validateCombo(this,val);
                }
                this.$emit('input', val);
                this.$emit('onChange', val);
            }
        },
        
        cssClassRequire(val){
            this.cssClassRequireX = val;
        }
    },

    methods: {
        handleBlur(){
            if(this.isRequire){
                this.validateCombo(this,this.valueX);
            }
        },
        focus(){
            this.$refs.combo.focus();
        }
    },
}
</script>

<style scoped>

.input-cp {
    display: flex;
    height: 40px;
    padding: 0;
    align-items: center;
    position: relative;
    width: 50%;
}

input:focus {
    border: 1px solid #80bdff;
}
    
    input {
        width: 100%;
        height: 100%;
        margin: 0;
        background-color: #ffffff !important;
        outline: none !important;
        border: 1px solid #e0e0e0;
        border-radius: 2px;
        padding: 0 8px 0px 8px;        
    }

    input::placeholder{
            font-size: 12px;
            margin-left: 8px;
        }
    input:hover {
    
    }

    .icon-search {
        position: absolute;
        right: 4px;
        top: 8px;
    }      
</style>    