<template>
    <div class="menu">
            <div class="menu-heading">
                <div class="menu-heading__icon">
                    <i class="fa-solid fa-user"></i>
                </div>
                <span class="title" >Cán bộ</span>
            </div>
            <div class="menu-list">
                <div class="menu-item menu-item__link" title="Tổng quan hệ thống">
                    <img class="menu-item__icon" src="../../assets/icon/ic_TongQuan.svg" alt="icon">
                    <div class="menu-item__text">Tổng quan</div> 
                </div>
                <router-link to="/employee" class="menu-item menu-item__link" title="Quản lý cán bộ, giáo viên">
                    <img class="menu-item__icon" src="../../assets/icon/ic_ThietBi.svg" alt="icon">
                    <div class="menu-item__text">Cán bộ, giáo viên</div>
                </router-link>
                <div class="menu-item menu-item__link" title="Quản lý báo các">
                    <img class="menu-item__icon" src="../../assets/icon/ic_BaoCao.svg" alt="icon">
                    <div class="menu-item__text">Báo cáo</div>
                </div>
                <router-link to="/student" class="menu-item menu-item__link" title="Quản lý học sinh">
                    <img class="menu-item__icon" src="../../assets/icon/ic_DeNghiMuaSam.svg" alt="icon">
                    <div class="menu-item__text">Danh mục học sinh</div>
                </router-link>
                <div class="menu-item menu-item__link" title="Quản lý việc mượn trả thiết bị">
                    <img class="menu-item__icon" src="../../assets/icon/ic_MuonTra.svg" alt="icon">
                    <div class="menu-item__text">Mượn trả </div>    
                </div>
                <div class="menu-item menu-item__link" title="Thiết lập tùy chỉnh cho hệ thống">
                    <img class="menu-item__icon" src="../../assets/icon/ic_HeThong.svg" alt="icon">
                    <div class="menu-item__text">Thiết lập hệ thống</div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    @import url("../../styles/layout/menu.css");
</style>