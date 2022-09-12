<template>
    <div class="dialog dialog--warning">
        <div class="dialog__content">
            <div class="dialog__button--close" @click="hideNotice"></div>
            <div class="dialog__header title" style="padding:20px 0 12px 24px; color: var(--text-color) ;">Thông báo</div>
            <div class="dialog__body" v-for="(item) in validates" :key="item">
                <div class="dialog__msg-item">
                    {{item}} 
                </div>
            </div>
            <div class="dialog__footer">
                <button @click="hideNotice" id="btnOk" class="button" style="order:1">Đồng ý</button>
                <button @click="hideNotice" class="button button-basic--white" style="order:2">Đóng</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url(../../styles/base/dialog.css);
</style>

<script>

export default ({
    name:"MMessage",
    props:[ "validateString"],
    data() {
        return {
            validates: [],
        }
    },
    created() {
        this.validates = this.validateString;
    },

    methods: {
        /**
        * Hàm ẩn thông báo
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        hideNotice() {
            this.$emit("hideNotice");
        },
    },
})
</script>