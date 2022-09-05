<template>
    <div class="content content--empty">
            <img src="../../assets/icon/ic_Alert.png" alt="" class="alert">
            <div class="notice title">Chưa có giáo viên</div>
            <p class="notice-message">Vui lòng chọn Thêm mới từng giáo viên hoặc Nhập khẩu để lấy danh sách hiện có tại trường</p>
            <div class="redirect-button">
                <button class="button">Thêm mới</button> 
                <button class="button">Nhập khẩu</button> 
            </div>
    </div>
</template>

<script>
export default {
    name: "EmployeeEmpty",

}
</script>

<style>
    .content.content--empty {
    display: flex;
    justify-content: center;
    align-items: center;
    }

    .alert {
        width: 130px;
        height: 130px;
        margin: 24px;
    }

    .notice-message {
        margin: 20px;
    }

    .redirect-button button {
        margin: 0 2px;
    }
</style>