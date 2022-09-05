<template>
    <div class="dropdown" style="flex:1" 
    :style="{ width: width || '200px' }" tabindex="6">
        <div @click="toggleOptions"  class="dropdown-select" style="height: fit-content; box-sizing: border-box; min-height: 32px;" >
            <div  class="select--multi" 
            style=" height: fit-content; width: 100%; "
            >
                <!-- v-model="optionSelected" -->
                <div style="box-sizing: border-box;" class="chip" v-for="(item) in checkedItem" :key="item[idName]">                
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
                :checked="checkedItem.includes(item[idName])" 
                v-model="checkedItem" >
                {{ item[valueName] }}
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: "MMultiSelect ",
    props: ["idName", "valueName", "url", "width", "idValue","displayValue"],
    data() {
        return {
            isShowOptions: false,
            items: [],
            optionSelected:[],
            nameOptionSelected:[],
            idOptionSelected:[],
            selectedItemID:[],
            checkedItem: [],
            isCheckAll: false,
        }
    },
    created() {
        if (this.url) {
            this.getData();
            // this.optionSelected = this.initialValue ;
            // this.selectedItemID.push(this.optionSelected[this.idName]);
            // console.log(this.initialValue);
        }
    },
    watch: {
        idValue() {
            this.selectedItemID = [];
            this.selectedItemID.push(this.idValue);
            console.log(this.selectedItemID);

        },
        displayValue() {
            this.optionSelected = [];
            this.optionSelected.push(this.displayValue) ;
            console.log(this.optionSelected);   
            
        },
        checkedItem(value) {
            // console.log(this.$refs.checkInputAll); 
            if(this.checkedItem.length == this.items.length) {
                console.log(value);
                this.isCheckAll = true;
                this.optionSelected = [];
                this.optionSelected = ["Tất cả"];

            }else {
                this.isCheckAll = false;
                // console.log(this.items);
                this.selectedItemID = value;
                console.log(this.selectedItemID);
                this.optionSelected = [];
                for(var j = 0 ; j<this.checkedItem.length ; j++) {
                    this.optionSelected.push(value[j][this.valueName]);
                    console.log(value[j][this.valueName]);

                }
                
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
            // this.selectedItemID = [];
            // this.$emit("getValue", item);  
            this.optionSelected.push(item[this.valueName]);
            // this.isShowOptions = false;
            this.selectedItemID.push(item[this.idName]);
            console.log(this.optionSelected);
            console.log(this.optionSelected);
        },
        checkboxChoseAllOnClick() {
            try {
                this.checkedItem= [];
                if(!this.isCheckAll) {
                    this.items.forEach( (item) => {
                        this.checkedItem.push(item);
                    }) 
                }
            } catch (error) {
                console.log(error);
            }
        },
        removeOption(option) {
            // this.checkedItem.pop(option);
            this.checkedItem= this.checkedItem.filter(item => item !== option);
            this.selectedItemID=this.selectedItemID.filter(i => i !== option[this.idName]);  
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
    /* box-sizing: border-box; */
    /* height: 32px; */
    min-width: 128px;
    }

    /* .select--multi {
        background-size: 28px 28px;
        background-repeat: no-repeat;
        background-position-y: center;
        background-position-x: 102%;
        background-image: url(../../assets/icon/ic_Chevron.png);
    } */

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