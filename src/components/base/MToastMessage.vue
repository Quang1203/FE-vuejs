<template>
  <div class="toast-box" hidden>
        <div class="toast-item toast-item--error">
            <div class="toast-icon toast-icon--error "><img src="../../assets/icon/ic_ToastMessage_Fail.png" alt=""></div>
            <div class="toast-text">Lỗi</div>
            <span>Error Message</span>
            <div class="toast-close"><i class="fa-solid fa-xmark"></i></div>
        </div>
    </div>
    <div class="toast-box" hidden>
        <div class="toast-item toast-item--warning" >
            <div class="toast-icon toast-icon--warning "><img src="../../assets/icon/ic_ToastMessage_Warning.png" alt=""></div>
            <div class="toast-text">Cảnh báo</div>
            <span>Warning Message</span>
            <div class="toast-close"><i class="fa-solid fa-xmark"></i></div>
        </div>

    </div>
    <div class="toast-box" hidden>
        <div class="toast-item toast-item--info">
            <div class="toast-icon toast-icon--info "><img src="../../assets/icon/ic_ToastMessage_Info.png" alt=""></div>
            <div class="toast-text">Thông báo</div>
            <span>Notification Message</span>
            <div class="toast-close"><i class="fa-solid fa-xmark"></i></div>
        </div>
    </div>
    <div class="toast-box">
        <div class="toast-item toast-item--success">
            <div class="toast-icon toast-icon--success "><img src="../../assets/icon/ic_ToastMessage_Success.png" alt=""></div>
            <div class="toast-text">Thành công</div>
            <span>Success Message</span>
            <div class="toast-close"><i class="fa-solid fa-xmark"></i></div>
        </div>
    </div>
</template>

<script>
export default {
    name:"MToastMessage",
    props:["hideToastMessage"],
}
</script>

<style>
    @import url("../../styles/base/toast.css");
</style>