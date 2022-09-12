<template>
    <!-- Dialog Confirm Delete -->
    <div id="dialogConfirmDelete" class="dialog dialog--Confirm" >
        <div class="dialog__content">
            <div @click="btnCloseOnClick" class="dialog__button--close"></div>
            <div class="dialog__header title" style="padding:20px 0 12px 24px; color: var(--text-color) ;">Thông báo</div>
            <div class="dialog__body">
                <div class="dialog__msg-item">
                    Bạn có chắc chắn muốn xóa Cán bộ giáo viên đang chọn không? 
                </div>
            </div>
            <div class="dialog__footer">
                <button @click="agreeDelete" id="btnConfirmDelete" class="button" style="order:1">Đồng ý</button>
                <button @click="btnCloseOnClick" id="cancelConfirmDelete" class="button button-basic--white" style="order:2">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"MConfirmDialog",
    props:["confirmModeDelete"],
    methods: {
        /**
        * Xử lý sự kiện click đóng dialog
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        btnCloseOnClick() {
            try {
                this.$emit("cancelConfirmDelete");
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Xử lý sự kiện đồng ý xóa
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        agreeDelete() {
            try {
                if(this.confirmModeDelete == "multiple") {
                    this.$emit("agreeDeleteMultiRow");
                }
                else if (this.confirmModeDelete == "single") {
                    this.$emit("agreeDelete");
                }
            } catch (error) {
                console.log(error);
            }
        },


    },
}
</script>

<style>
    @import url("../../styles/layout/content.css");
</style>