<template>
    <div class="loading">
        <div class="loading__content">
            <div class="dot-loader" style="background-color: rgba(255, 0, 0, 0.856);"></div>
            <div class="dot-loader" style="background-color: #faa039c9;"></div>
            <div class="dot-loader" style="background-color: rgba(212, 255, 0, 0.853);"></div>
            <div class="dot-loader" style="background-color: #0dd46de6;"></div>
            <div class="loading__text">Đang tải</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"MLoading",
    props:["hideLoading"],
}
</script>

<style scoped>
    @import url("../../styles/main.css");
</style>