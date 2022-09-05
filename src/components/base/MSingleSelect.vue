<template>
    <div class="dropdown" style="flex:1" 
    :style="{ width: width || '200px' }">
        <div @click="toggleOptions"  class="dropdown-select">
            <input tabindex="5" class="select" v-model="optionSelected[valueName]">
            <i class="fa-solid fa-angle-down" style="color: #999999; font-size: 15px"></i>
        </div>
        <div class="dropdown-list" id="drop-room__list" style="z-index: 2 ;"
            v-show="isShowOptions"
            >
            <div v-for="(item) in items" :key="item[idName]"
                class="row dropdown-list_item"
                ref="options" 
                @click="handleOptionClicked(item)"
                :id="item[idName]"
                :class="{'dropdown-list_item--selected': selectedItemID.includes(item[idName]) }">
                {{ item[valueName] }}
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: "MCombobox",
    props: ["idName", "valueName", "url", "width", "initialValue"],
    data() {
        return {
            isShowOptions: false,
            items: [],
            optionSelected:{},
            selectedItemID:[],
        }
    },
    created() {
        if (this.url) {
            this.getData();
            this.selectedItemID = [];
            this.optionSelected = this.initialValue ;
            this.selectedItemID.push(this.optionSelected[this.idName]);
            console.log(this.initialValue);
        }
    },
    watch: {
        initialValue() {
            this.optionSelected = this.initialValue ;
            this.selectedItemID.push(this.optionSelected[this.idName]);

        }
    },
    
    beforeUpdate() {
        // if (this.url) {
        //     // this.getData();
        //     this.selectedItemID = [];
        //     this.selectedItemID.push(this.optionSelected[this.idName]);
            // this.selectedItemID = [];
            // this.optionSelected = { ...this.initialValue };
            // this.selectedItemID.push(this.optionSelected[this.idName]);

        //     console.log({ ...this.initialValue });
        // }

    },

    methods: {
        getData() {
            fetch(this.url,{method:"GET"})
            .then(res=>res.json())
            .then(res=>{
                this.items = res;
            })
            .catch(res=>{
                console.log(res);
            })
        },
        handleFocusOut() {
            this.isShowOptions = false;
        },
        toggleOptions() {
            this.isShowOptions = !this.isShowOptions;
        },
        handleOptionClicked(item) {
            this.selectedItemID = [];
            this.$emit("getValue", item[this.idName], item[this.valueName], item);  
            this.optionSelected = item;
            this.isShowOptions = false;
            this.selectedItemID.push(this.optionSelected[this.idName]);
            console.log(this.optionSelected);
        }

    },
}
</script>

<style>
    @import url("../../styles/main.css");
    @import url("../../styles/base/combobox.css");
    .row.dropdown-list_item {
        height: 32px;
        margin: 0px;
        padding-top: 2px;
        padding-bottom: 0px;
        line-height: 32px;
    }
</style>