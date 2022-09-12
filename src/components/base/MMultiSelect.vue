<template>
    <div @keypress.enter="toggleOptions" class="dropdown" style="flex:1" 
    :style="{ width: width || '200px' }" tabindex="6"
    >
    <!-- @focusout="handleFocusOut" -->
        <div class="dropdown-select" style="height: fit-content; box-sizing: border-box; min-height: 32px;"
            @click="toggleOptions"  
            @keypress.enter="toggleOptions"   
            >
            <div  class="select--multi" 
            style=" height: fit-content; width: 100%; "
            >
                <!-- v-model="optionSelected" -->
                <div v-if="(checkedItem.length == items.length)" style="box-sizing: border-box;" class="chip">                
                        <div class="chip__content">
                        Tất cả
                        <i @click="removeAllOption()" class="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div v-else style="box-sizing: border-box;" class="chip" v-for="(item) in checkedItem" :key="item[idName]">                
                        <div class="chip__content">
                        {{item[valueName]}}
                        <i :id="item[idName]" @click="removeOption(item)" class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="dropdown-list" id="drop-room__list" style="z-index: 2 ;"
            v-show="isShowOptions"
            >
            <div class="row dropdown-list_item" style="padding-bottom: 8px; padding-top: 6px; height: 40px; border-bottom: 1px solid #ccc;">
                <input type="checkbox" class="checkbox-item checkbox-item--all" style="margin-left: 2px;"
                ref="checkInputAll" 
                @change="checkboxChoseAllOnClick" 
                :checked="isCheckAll" > 
                Tất cả
            </div>
            <div v-for="(item) in items" :key="item[idName]"
                class="row dropdown-list_item"
                :id="item[idName]" 
                :ref="item[idName]" 
            >
                <!-- :class="{'dropdown-list_item--selected': checkedItem.includes(item[idName]) }"  -->
                <input
                class="checkbox-item" type="checkbox"  style="margin-left: 2px ;"
                :value="item" 
                :checked="checkedItem.includes(item)" 
                @change="handleOptionClicked"
                v-model="checkedItem" >
                {{ item[valueName] }}
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: "MMultiSelect ",
    props: ["idName", "valueName", "url", "width", "idValue","displayValue", "initialValue"],
    data() {
        return {
            isShowOptions: false,
            items: [],
            optionSelected:[],
            selectedItemID:[],
            checkedItem: [],
            isCheckAll: null,
        }
    },
    created() {
        if (this.url) {
            fetch(this.url,{method:"GET"})
            .then(res=>res.json())
            .then(res=>{
                this.items = res;
                this.checkedItem = this.initialValue;
                this.selectedItemID = this.checkedItem;
                console.log(this.initialValue.length);
                console.log(this.items.length);
                this.isCheckAll = (this.initialValue.length == this.items.length);
            })
            .catch(res=>{
                console.log(res);
            })
        }
        // this.checkedItem = this.initialValue;
        // this.selectedItemID = this.checkedItem;
        // console.log(this.initialValue.length);
        // console.log(this.items.length);
        // this.isCheckAll = (this.initialValue.length == this.items.length);
        // console.log(this.checkedItem);
        // console.log(this.isCheckAll);
        // console.log(this.selectedItemID);
    },
    watch: {
        // idValue() {
        //     this.selectedItemID = [];
        //     this.selectedItemID.push(this.idValue);
        //     console.log(this.selectedItemID);

        // },
        // displayValue() {
        //     this.optionSelected = [];
        //     this.optionSelected.push(this.displayValue) ;
        //     console.log(this.optionSelected);   
            
        // },
        checkedItem(value) {
            // console.log(this.$refs.checkInputAll); 
            if(this.checkedItem.length == this.items.length) {
                console.log(value);
                this.isCheckAll = true;
                // this.$emit("getValue", this.checkedItem);  


            }else {
                this.isCheckAll = false;
                // console.log(this.items);
                this.selectedItemID = value;
                this.optionSelected = [];
                // this.$emit("getValue", this.checkedItem);  
                
            }

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
                console.log(this.items.length);

            })
            .catch(res=>{
                console.log(res);
            })
        },
        removeAllOption() {
            this.isCheckAll = false;
            this.selectedItemID = [];
            this.checkedItem = [];
            this.$emit("getValue", this.checkedItem);  
        },
        handleFocusOut() {
            this.isShowOptions = false;
        },
        toggleOptions() {
            this.isShowOptions = !this.isShowOptions;
        },
        handleOptionClicked() {
            this.$emit("getValue", this.checkedItem);  

        },
        checkboxChoseAllOnClick() {
            try {
                this.checkedItem= [];
                if(!this.isCheckAll) {
                    this.items.forEach( (item) => {
                        this.checkedItem.push(item);
                        this.selectedItemID.push(item[this.idName])
                        this.$emit("getValue", this.checkedItem);  

                    }) 
                }else {
                    this.checkedItem= [];
                    this.selectedItemID = [];
                    this.$emit("getValue", this.checkedItem);  
                }
            } catch (error) {
                console.log(error);
            }
        },
        removeOption(option) {
            // this.checkedItem.pop(option);
            this.checkedItem= this.checkedItem.filter(item => item !== option);
            this.selectedItemID=this.selectedItemID.filter(i => i !== option[this.idName]);  
            this.$emit("getValue", this.checkedItem);  

        },

    },
}
</script>

<style scoped>
    @import url("../../styles/main.css");
    @import url("../../styles/base/combobox.css");
    .dropdown {
    position: relative;
    border-radius: 4px;
    min-width: 128px;
    }


    .dropdown-select {
        background-size: 28px 28px;
        background-repeat: no-repeat;
        background-position-y: center;
        background-position-x: calc(100% - 6px);
        background-image: url(../../assets/icon/ic_Chevron.png);
    }
    .chip {
        /* Center the content */
        align-items: center;
        display: inline-flex;
        /* display: inline-block; */
        justify-content: center;
        /* Background color */
        background-color: rgba(0, 0, 0, 0.1);
        /* Rounded border */
        border-radius: 8px;
        height: 28px;
        /* width: 100px; */
        /* Spacing */
        padding: 4px 8px;
        margin-right: 3px;
    }
        .chip__content {
            margin-right: 4px;
        }
</style>