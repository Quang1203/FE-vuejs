<template>
  <div
    tabindex="1"
    @focusout="handleFocusOut"
    @keydown="handleKeyCommand"
    :style="{ width: width || '200px' }"
    class="combobox"
  >
    <div @click="toggleOptions" class="combobox__select">
      <div>{{ selectedOption[valueName] }}</div>
      <img
        class="combobox__arrow-down"
        src="../../assets/icon/ic_Chevron.png"
        alt=""
      />
    </div>
    <div
      v-show="isExpanded"
      :style="{ width: width || '200px' }"
      class="combobox__options"
    >
      <div class="combobox__values">
        <div
            ref="options"
            @click="handleOptionClicked(option)"
            v-for="(option, index) in options"
            :key="option[idName]"
            :class="[
                'combobox__value-wrapper',
                {
                'combobox__value-wrapper--selected':
                    option[idName] == selectedOption[idName],
                'combobox__value-wrapper--hover': hoveredOptionIndex === index,
                },
            ]"
        >
            <span class="combobox__value">
                {{ option[valueName] }}
            </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Enumeration from "../../js/common/Enumeration";
export default {
  name: "BaseSelect",
  props: ["idName", "valueName", "url", "width", "initialValue"],
  data() {
    return {
      isExpanded: false,
      selectedOption: {},
      options: [],
      hoveredOptionIndex: 0,
    };
  },
  created() {
    if (this.url) {
      this.getData();
      this.selectedOption = { ...this.initialValue };
    }
  },
  methods: {
    /**
     * Xử lý khi click ra khỏi phần tử
     * Author:NPTINH (14/08/2022)
     */
    handleFocusOut() {
      this.isExpanded = false;
    },
    /**
     * Xử lý khi dùng bàn phím
     * Author: NPTINH (10/08/2022)
     */
    // handleKeyCommand() {
    //   let keyCode = event.keyCode;
    //   switch (keyCode) {
    //     case Enumeration.KeyCode.Enter:
    //       if (this.hoveredOptionIndex >= 0 && this.isExpanded === true) {
    //         this.handleOptionSelected(this.options[this.hoveredOptionIndex]);
    //       }
    //       this.toggleOptions();
    //       break;
    //     case Enumeration.KeyCode.ArrowDown:
    //       if (this.hoveredOptionIndex < this.options.length - 1) {
    //         this.hoveredOptionIndex++;
    //         this.scrollToElement();
    //       }
    //       break;
    //     case Enumeration.KeyCode.ArrowUp:
    //       if (this.hoveredOptionIndex > 0) {
    //         this.hoveredOptionIndex--;
    //         this.scrollToElement();
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    // },
    /**
     * Cuộn đến phần tử được hover
     * Author: NPTINH (10/08/2022)
     */
    scrollToElement() {
      this.$refs.options[this.hoveredOptionIndex].scrollIntoView();
    },
    /**
     * Xử lý khi option được click
     * Author: NPTINH (10/08/2022)
     */
    handleOptionClicked(option) {
      this.handleOptionSelected(option);
      this.isExpanded = false;
    },
    /**
     * Xử lý khi option được chọn
     * Author: NPTINH (10/08/2022)
     */
    handleOptionSelected(option) {
      this.selectedOption = option;
      this.getValue(option[this.idName], option[this.valueName], option);
    },
    /**
     * Get data cho options của combobox từ server
     * Author: NPTINH (10/08/2022)
     */
    getData() {
      
      fetch(this.url,{method:"GET"})
        .then(res=>res.json())
        .then(res=>{
            this.options = res;
            // console.log(this.options);
            // console.log(res);
        })
        .catch(res=>{
            console.log(res);
        })
    },
    /**
     * Lấy option được chọn
     * Author: NPTINH (10/08/2022)
     * @param {*} id id của option được chọn
     * @param {*} value giá trị của option được chọn
     * @param {*} option option được chọn
     */
    getValue(id, value, option) {
      this.$emit("getValue", id, value, option);
    },
    /**
     * Ẩn/hiện danh sách options
     * Author: NPTINH (10/08/2022)
     */
    toggleOptions() {
      this.isExpanded = !this.isExpanded;
      this.hoveredOptionIndex = 0;
      this.scrollToElement();
    },
  },
};
</script>
<style scoped>
.combobox:focus {
  border-radius: 4px;
  outline: 1px solid #0dd469;
}
.combobox__options {
  position: absolute;
  width: 100%;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px;
  margin-top: 8px;
  background-color: white;
  z-index: 2;
}
.combobox__select {
  border: 1px solid #cccccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  min-height: 32px;
  padding-left: 16px;
}

.combobox__arrow-down {
  width: 32px;
  height: 32px;
}
.combobox__values::-webkit-scrollbar {
  /* height: 5px; */
  width: 5px;
}
.combobox__values::-webkit-scrollbar-thumb {
  background: #cccccc;
  border-radius: 4px;
}
.combobox__values::-webkit-scrollbar-thumb:hover {
  background: #8f8f8f;
}
.combobox__value-wrapper:hover {
  background-color: #73fdb484;
}
.combobox__value-wrapper {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 6px 16px;
}
.combobox__values {
  overflow: auto;
  height: 100px;
}
.combobox__value-wrapper--hover {
  background-color: #73fdb484;
}

.combobox__value-wrapper--selected {
  background-color: #0dd469;
}
</style>