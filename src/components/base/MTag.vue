<template>
  <div
    @keydown="handleKeyCommand"
    tabindex="1"
    :style="{ width: width || '200px' }"
    class="tag"
    v-click-outside="handleClickOutside"
  >
    <div class="tag__select">
      <div class="tag__selected-items">
        <div
          v-for="selectedOption in selectedOptions"
          class="tag__selected-item"
          :key="selectedOption[idName]"
        >
          <div class="selected-item__text">{{ selectedOption[valueName] }}</div>
          <svg
            @click="removeOption(selectedOption)"
            class="svg-inline--fa fa-xmark selected-item__icon"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="xmark"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
            ></path>
          </svg>
        </div>
      </div>
      <img
        @click="toggleOptions"
        class="tag__arrow-down"
        src="../../assets/Icons/ic_Chevron.png"
        alt=""
      />
    </div>
    <div
      v-show="isExpanded"
      :style="{ width: width || '200px' }"
      class="tag__options"
    >
      <div
        @click="handleOptionClicked(optionAll)"
        class="option__title"
        :class="[
          'tag__value-wrapper',
          {
            'tag__value-wrapper--selected': selectedOptions
              .map((item) => item[this.idName])
              .includes(optionAll[this.idName]),
            'tag__value-wrapper--hover': hoveredOptionIndex === -1,
          },
        ]"
      >
        <BaseCheckbox
          class="tag__input-checkbox"
          :checkedProp="
            selectedOptions
              .map((item) => item[this.idName])
              .includes(optionAll[this.idName])
          "
        >
          <template #checkmark>
            <div class="input-checkbox__checkmark"></div>
          </template>
          <template #label> <span class="option__value">Tất cả</span></template>
        </BaseCheckbox>
      </div>
      <div class="option__values">
        <div
          ref="options"
          @click="handleOptionClicked(option)"
          v-for="(option, index) in options"
          :key="option[idName]"
          :class="[
            'tag__value-wrapper',
            {
              'tag__value-wrapper--selected': selectedOptions
                .map((item) => item[this.idName])
                .includes(option[this.idName]),
              'tag__value-wrapper--hover': hoveredOptionIndex === index,
            },
          ]"
          class="option__value-wrapper"
        >
          <BaseCheckbox
            class="tag__input-checkbox"
            :checkedProp="
              selectedOptions
                .map((item) => item[this.idName])
                .includes(option[this.idName]) ||
              selectedOptions
                .map((item) => item[this.idName])
                .includes(optionAll[this.idName])
            "
          >
            <template #checkmark>
              <div class="input-checkbox__checkmark"></div>
            </template>
            <template #label>
              <span class="option__value">
                {{ option[valueName] }}
              </span></template
            >
          </BaseCheckbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Enumeration from "../../js/common/Enumeration";
export default {
  name: "BaseTag",
  props: ["idName", "valueName", "url", "width", "initialValues"],
  data() {
    return {
      isExpanded: false,
      selectedOptions: [],
      options: [],
      hoveredOptionIndex: -1,
      optionAll: {
        [this.idName]: "All",
        [this.valueName]: "Tất cả",
      },
    };
  },
  created() {
    if (this.url) {
      this.getData();
    }
    this.selectedOptions = [...this.initialValues];
  },
  methods: {
    /**
     * Xử lý khi thao tác ra khỏi phần tử
     * Author:NPTINH (14/08/2022)
     */
    handleClickOutside() {
      this.isExpanded = false;
    },
    /**
     * Xử lý khi dùng bàn phím
     * Author: NPTINH (10/08/2022)
     */
    handleKeyCommand() {
      let keyCode = event.keyCode;
      switch (keyCode) {
        case Enumeration.KeyCode.Enter:
          if (this.isExpanded === true) {
            if (this.hoveredOptionIndex === -1) {
              this.handleOptionSelected(this.optionAll);
            } else {
              this.handleOptionSelected(this.options[this.hoveredOptionIndex]);
            }
          }
          this.toggleOptions();
          break;
        case Enumeration.KeyCode.ArrowDown:
          if (this.hoveredOptionIndex < this.options.length - 1) {
            this.hoveredOptionIndex++;
            this.scrollToElement();
          }
          break;
        case Enumeration.KeyCode.ArrowUp:
          if (this.hoveredOptionIndex >= 0) {
            this.hoveredOptionIndex--;
            if (this.hoveredOptionIndex >= 0) this.scrollToElement();
          }
          break;
        case (event.shiftKey && Enumeration.KeyCode.Tab) ||
          Enumeration.KeyCode.Tab:
          this.isExpanded = false;
          break;
        default:
          break;
      }
    },
    /**
     * Cuộn đến phần tử được hover
     * Author: NPTINH (10/08/2022)
     */
    scrollToElement() {
      if (this.$refs.options[this.hoveredOptionIndex]) {
        this.$refs.options[this.hoveredOptionIndex].scrollIntoView();
      }
    },
    /**
     * Xử lý khi option được click
     * Author: NPTINH (10/08/2022)
     */
    handleOptionClicked(option) {
      this.handleOptionSelected(option);
    },
    /**
     * Xử lý khi option được chọn
     * Author: NPTINH (10/08/2022)
     */
    handleOptionSelected(option) {
      let selectedOptionIDs = this.selectedOptions.map(
        (item) => item[this.idName]
      );
      // Nếu option ID được chọn không chứa trong selectedOptionIDs
      if (!selectedOptionIDs.includes(option[this.idName])) {
        // Nếu selectedOptions chứa lựa chọn Tất cả thì thực hiện
        // thêm tất cả các option và bỏ chọn option được chọn
        if (selectedOptionIDs.includes(this.optionAll[this.idName])) {
          this.selectedOptions = [...this.options];
          this.selectedOptions = this.selectedOptions.filter(
            (item) => item !== option
          );
        }
        // Nếu option được chọn là Tất cả
        else if (option === this.optionAll) {
          this.selectedOptions = [this.optionAll];
        } else {
          this.selectedOptions.push(option);
          // Nếu selectedOptionIDs chứa tất cả các options thì chuyển thành option Tất cả
          if (this.selectedOptions.length === this.options.length) {
            this.selectedOptions = [this.optionAll];
          }
        }
      }
      // Nếu option được chọn chứa trong selectedOptionIDs
      // thì thực hiện xóa option đó khỏi danh sách
      else {
        this.removeOption(option);
      }
      this.getValue(this.selectedOptions);
    },
    /**
     * Xóa option ra khỏi danh sách
     * Author: NPTINH (10/08/2022)
     */
    removeOption(option) {
      this.selectedOptions = this.selectedOptions.filter(
        (item) => item[this.idName] !== option[this.idName]
      );
    },
    /**
     * Get data cho options của combobox từ server
     * Author: NPTINH (10/08/2022)
     */
    getData() {
      this.$http.get(this.url).then((response) => {
        this.options = response.data;
      });
    },
    /**
     * Lấy option được chọn
     * Author: NPTINH (10/08/2022)
     * @param {*} id id của option được chọn
     * @param {*} value giá trị của option được chọn
     * @param {*} option option được chọn
     */
    getValue(options) {
      this.$emit("getValue", options);
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
@import url("../../css/base/tag.css");
</style>