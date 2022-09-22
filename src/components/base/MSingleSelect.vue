<template>
    <div class="dropdown" style="flex:1; display: flex;" 
    :style="{ width: width || '200px' }"
    @keyup.tab="handleFocusOut"
    @keyup.down="focusOptionNext"
    >
        <div @click="toggleOptions"  class="dropdown-select" >
            <input ref="input" tabindex="5" class="select" v-model="optionSelected[valueName]"
            @keypress.enter="toggleOptions"
            @keyup.tab="handleFocusOut"
            @keyup.down="handleOptionClicked(items[i++])"
            >
            <i class="fa-solid fa-angle-down" style="color: #999999; font-size: 15px"></i>
            <div ref="dropdown" @click="toggleOptions" v-show="isShowOptions" class="dropdown-list" id="drop-room__list" style="z-index: 2 ;"
            >
                <div v-for="(item, index) in items" :key="item[idName]"
                    class="row dropdown-list_item"
                    ref="item" 
                    @click="handleOptionClicked(item)"
                    @keyup.enter="handleOptionClicked(item)"
                    @keyup.esc="focusOptionNext(index)"
                    :id="item[idName]"
                    :class="{'dropdown-list_item--selected': selectedItemID.includes(item[idName]) }">
                    {{ item[valueName] }}
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import RESOURCE from "../../script/resource.js"

export default {
    name: "MCombobox",
    props: ["idName", "valueName", "url", "width", "initialValue"],
    data() {
        return {
            isShowOptions: false,
            items: [],
            optionSelected:{},
            selectedItemID:[],
            hideListSelect : true,
            hoveredOptionIndex: 0,
            i:0,
        }
    },

    created() {
        /**
        * Gọi API để lấy dữ liệu cho combobox
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        if (this.url) {
            this.getData();
            this.selectedItemID = [];
            this.optionSelected = this.initialValue ;
            this.selectedItemID.push(this.optionSelected[this.idName]);
            // console.log(this.initialValue);
        }
    },

    watch: {
        initialValue() {
            this.optionSelected = this.initialValue ;
            this.selectedItemID.push(this.optionSelected[this.idName]);
            
        },
        i(val) {
            if(val == 5 ) {
                this.i = 0;
            }
        }
    },

    methods: {
        /**
        * Gọi API để lấy dữ liệu
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        getData() {
            try {
                fetch(this.url,{method:RESOURCE.METHOD.Get})
                .then(res=>res.json())
                .then(res=>{
                    this.items = res;
                })
                .catch(res=>{
                    console.log(res);
                })
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Hàm bỏ Focus
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        handleFocusOut() {
            try {
                this.isShowOptions = false;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Hàm ẩn hiện dropdown
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        toggleOptions() {
            try {
                this.isShowOptions = !this.isShowOptions;
                console.log(this.$refs.item[0]);
                this.$refs.item[0].focus();
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Hàm chọn 1 lựa chọn
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        handleOptionClicked(item) {
            try {
                this.selectedItemID = [];
                this.$emit("getValue", item[this.idName], item[this.valueName], item);  
                this.optionSelected = item;
                this.selectedItemID.push(this.optionSelected[this.idName]);
                this.isShowOptions = false;
                console.log(this.isShowOptions);
                console.dir(this.$refs.item[0]);
            } catch (error) {
                console.log(error);
            }
        },


        /**
        * Hàm focus vào lựa chọn tiếp theo
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        focusOptionNext() {
            try {
                this.isShowOptions = true;
                this.$refs.dropdown.focus();
                console.log(this.$refs.dropdown);
                const opres = this.$refs.item[0] ;
                opres.focus();
                console.log(this.$refs.item[0]);
            } catch (error) {
                console.log(error);
            }
        },

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
    .dropdown-select {
        position: relative;
    }
</style>