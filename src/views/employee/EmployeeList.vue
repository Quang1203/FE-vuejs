<template>
    <EmployeeEmpty
    v-if = "employeeEmpty"
    />
    <div v-else class="content" >
        <div class="page__header">
            <div class="page__header--left">
                <input type="text" class="input input__icon input__icon--search" title="Ấn Enter để tìm kiếm" placeholder="Tìm kiếm theo Mã hoặc Tên hoặc SĐT" style="width : 300px"
                @keyup.enter="search"
                v-model="inputSearch"
                ref="firstFocus" 
                >
            </div>
            <div class="page__header--right">
                <button @click="btnAddOnClick"  id="btnAdd" class="button" title="Thêm cán bộ, giáo viên">Thêm</button> 
                <button @click="exportFile" class="button button-basic--white" title="Xuất file excel">Xuất khẩu</button> 
                <button @click="showDeleteChose" id="btnShowDelete" class="button-small btn-selectDelete" title="Chọn chức năng"><i class="fa-solid fa-ellipsis"></i></button>
                <div v-if="isShowDeleteChose" class="showDeleteChose">
                    <button @click="deleteMultiRowOnClick" id="btnDeleteChose" class="button-small btnDeleteChose" title="Xóa các nhân viên được chọn"><i class="fa-solid fa-trash-can"></i></button>
                    <label for="">Xóa</label>
                </div>
            </div>
        </div>
        <div class="page__table">
            <div class="table__content">
                <table id="tbEmployeeList" class="table" border="0">
                    <thead>
                        <tr>
                            <th class="text-align--center" style="width:40px"><input title="Chọn tất cả cán bộ, giáo viên" ref="checkInputAll" @change="checkboxChoseAllOnClick" :checked="isCheckAll" type="checkbox" class="checkbox-item checkbox-item--all"></th>
                            <th class="text-align--center" style="width:100px" title="Số hiệu cán bộ"><b>Số hiệu cán bộ</b></th>
                            <th class="text-align--center" style="width:250px" title="Họ và tên"><b>Họ và tên</b> </th>
                            <th class="text-align--center" style="width:100px" title="Số điện thoại"><b>Số điện thoại</b> </th>
                            <th class="text-align--center" style="width:175px" title="Tổ chuyên môn"><b>Tổ chuyên môn</b> </th>
                            <th class="text-align--center" style="width:100px" title="Môn học đang quản lý"><b>QL theo môn</b> </th>
                            <th class="text-align--center" style="width:200px" title="Kho, phòng đang quản lý"><b>QL theo kho, phòng</b> </th>
                            <th class="text-align--center" style="width:120px" title="Trình độ nghiệp vụ quản lý thiết bị"><b>Đào tạo QLTB</b> </th>
                            <th class="text-align--center" style="width:120px" title="Trình trạng làm việc"><b>Đang làm việc</b> </th>
                            <th class="text-align--right" style="width:100px"></th>
                        </tr>
                    </thead>
                    <tbody v-for="(item) in employeeDetails" :key="item.employee.EmployeeID" @dblclick="rowOnDblClick(item)" >
                        <tr :id="item.employee.EmployeeID" :ref="item.employee.EmployeeID" :class="{'row--selected': checkedItemID.includes(item.employee.EmployeeID) }">
                            <td class="text-align--center" style="width:40px"><input :value="item.employee.EmployeeID" :checked="checkedItemID.includes(item.employee.EmployeeID) " v-model="checkedItemID" type="checkbox" class="checkbox-item" title="Chọn cán bộ, giáo viên"></td>
                            <td class="text-align--left" style="width:100px">{{item.employee.EmployeeCode}}</td>
                            <td @click="rowOnDblClick(item)" class="text-align--left text-long" style="max-width:150px; color: var(--main-color);" title="Click để chỉnh sửa">{{item.employee.EmployeeName}}</td>
                            <td class="text-align--left" style="width:100px">{{item.employee.TelNumber}}</td>
                            <td class="text-align--left text-long" style="max-width:175px">{{item.employee.GroupName}}</td>
                            <td class="text-align--left text-long" style="max-width:150px">
                                <!-- <span v-for="(i) in item.ListSubject" :key="i.SubjectID">{{i.SubjectName}} &nbsp;</span>  -->
                                {{ displayList(item.ListSubject, "SubjectName") }}
                            </td>
                            <td class="text-align--left text-long" style="max-width:250px">
                                <!-- <span v-for="(i) in item.ListStorageRoom" :key="i.StorageRoomID">{{i.StorageRoomName}} &nbsp;</span>  -->
                                {{ displayList(item.ListStorageRoom, "StorageRoomName") }}
                            </td>
                            <td :class="{'icon-checked' : (item.employee.EMT == 1)}" class="text-align--center" style="width:120px"></td>
                            <td :class="{'icon-checked' : (item.employee.WorkStatus == 1)}" class="text-align--center" style="width:120px"></td>
                            <td class="text-align--center" style="width:100px">
                                <button @click="rowOnDblClick(item)" title="Chỉnh sửa cán, giáo viên" class="button-small text-align--center"><i class="fa-solid fa-pen"></i></button>
                                <button @click="deleteRowClick(item.employee.EmployeeID)" title="Xóa cán, giáo viên" class="button-small text-align--center"><i class="fa-solid fa-trash-can" style="color: var(--text-color);"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table__paging">
                <div class="table__paging--first">
                    <button :class="{'button--disable': (currentPage === 1)}" @click="firstPage" class="paging__button paging__button--first" title="Về trang đầu"></button>
                    <button :class="{'button--disable': (currentPage === 1)}" @click="prevPage" class="paging__button paging__button--prev" title="Về trang trước"></button>
                    <div class="paging__input--group">
                        <input type="text" class="paging__number-page text-align--center"  title="Nhập trang cần tìm"
                        v-model="currentPage"
                        @keyup.enter="changePage">
                    </div>
                    <button :class="{'button--disable': (currentPage === totalPage)}" @click="nextPage" class="paging__button paging__button--next" title="Sang trang tiếp"></button>
                    <button :class="{'button--disable': (currentPage === totalPage)}" @click="lastPage" class="paging__button paging__button--last" title="Sang trang cuối"></button>
                </div>
                <div class="table__paging--second">
                    <span>{{currentPage}}/{{totalPage}} trang</span>({{itemPerPage}} giáo viên)
                </div>
            </div>
        </div>
    </div>

    <EmployeeDetail v-if="isShowDetail" 
    :employeeDetail="employeeSelected" 
    @closeButtonOnClick="showDialog" 
    @saveButtonOnClick="saveButtonOnClick"
    :showDialogFunction="showDialog"
    :formMode="formMode"/>

    <MLoading v-show="isLoading" />

    <MToastMessage v-if="isToastMessage" />

    <MConfirmDialog v-if="isShowConfirmDialog"
    @cancelConfirmDelete="cancelConfirmDelete"
    @agreeDelete = "agreeDelete"
    @agreeDeleteMultiRow = "agreeDeleteMultiRow"
    :confirmModeDelete = "confirmModeDelete"
    
    />
    
</template>

<script>

import EmployeeDetail from  "./EmployeeDetail.vue";
import MLoading from "../../components/base/MLoading.vue";
import MToastMessage from "../../components/base/MToastMessage.vue"
import MConfirmDialog from "../../components/base/MConfirmDialog.vue"
import EmployeeEmpty from  "./EmployeeEmpty.vue";
import RESOURCE from "../../script/resource.js";
import ENUM from "../../script/enum.js"

export default {
    name: "EmployeeList",
    components:{EmployeeDetail,MLoading, MToastMessage, MConfirmDialog,EmployeeEmpty},
    data() {
        return {
            employeeDetails: [
            ],
            employeeSelected: {},
            isShowDetail: false,
            formMode : ENUM.FORM_MODE.Add,
            isLoading: false,
            isToastMessage: false,
            isShowDeleteChose: false,
            employeeIdDelete: [],
            employeeDelete:[],
            checkedItemID: [],
            isCheckAll: false,
            isShowConfirmDialog: false,
            idRowDelete: "",
            confirmModeDelete: "",
            inputSearch: "",
            currentPage: 1,
            itemPerPage: 100,
            totalPage: 1,
            employeeEmpty: false,
        }
    },
    
    watch: {
        checkedItemID(value) {
            console.log(this.$refs.checkInputAll); 
            if(this.checkedItemID.length == this.employeeDetails.length) {
                console.log(value);
                this.isCheckAll = true;
            }else {
                this.isCheckAll = false;
            }

        },
        employeeEmpty(value) {
            if(value) {
                this.isLoading = false;
            }
        }
    },

    /**
        * Sự kiện focus vào ô tìm kiếm
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
    mounted(){
        try {
            this.$refs.firstFocus.focus();
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        /**
         * Ẩn hiện form chi tiết
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        btnAddOnClick(){
            try {
                this.employeeSelected = {};
                this.employeeSelected.employee = {};
                this.employeeSelected.ListSubject = [];
                this.employeeSelected.ListStorageRoom = [];
                this.showDialog(true);
                this.formMode = ENUM.FORM_MODE.Add;
                console.log(this.formMode);

            } catch (error) {
                console.log(error);
            }
            
        },

        /**
         * Click vào ô checkbox tất cả
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        checkboxChoseAllOnClick() {
            try {
                this.checkedItemID= [];
                console.log(this.checkedItemID);
                if(!this.isCheckAll) {
                    this.employeeDetails.forEach( (employeeDetail) => {
                        this.checkedItemID.push(employeeDetail.employee.EmployeeID);
                    }) 
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Hiện ô chọn xóa nhiều
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        showDeleteChose() {
            try {
                this.isShowDeleteChose = !this.isShowDeleteChose;
                
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Click vào nút save
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        saveButtonOnClick() {
            var me = this;
            var emp = me.employeeSelected;
            var option ;
            
            // Form thêm
            if (me.formMode == ENUM.FORM_MODE.Add) {
                option = {
                    method: RESOURCE.METHOD.Post,
                    headers: {
                        'Content-Type': RESOURCE.HEADERS_METHOD.ContentType
                    },
                    body: JSON.stringify(emp)
                }
                me.isLoading = true;
                try {
                    fetch(RESOURCE.API.EmployeeDetails, option)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function() {
                        me.employeeDetails.push(emp);
                        me.isLoading = false;
                        me.isToastMessage = true;
                        setTimeout(() => {
                            me.isToastMessage = false;
                        },2000)
                        
                    })
                    .then(function() {
                        me.getData();
                    })
                    .catch((error) => {
                        console.log(error);
                        me.isLoading = false;
                    }) 
                } catch (error) {
                    console.log(error);
                }
                
            } else {
                //Form sửa
                option = {
                    method: RESOURCE.METHOD.Put,
                    headers: {
                        'Content-Type': RESOURCE.HEADERS_METHOD.ContentType
                    },
                    body: JSON.stringify(emp)
                }
                console.log(emp);
                me.isLoading = true;
                try {
                    fetch(RESOURCE.API.EmployeeDetails + '/' + me.employeeSelected.employee.EmployeeID, option)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function() {
                        me.isLoading = false;
                        me.isToastMessage = true;
                        setTimeout(() => {
                            me.isToastMessage = false;
                        },2000)
                    })
                    .then(function() {
                        me.getData();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        me.isLoading = false;
                    }) 
                } catch (error) {
                    console.log(error);
                }
            }
            me.showDialog(false);
            
        },

        /**
         * Đóng form ConfirmDelete
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        cancelConfirmDelete() {
            try {
            this.isShowConfirmDialog = false;
            } catch (error) {
                console.log(error);
            }
        },
        
        /**
         * Click chọn 1 hàng
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        rowOnDblClick(emp) {
            try {
                this.isShowDetail = true;
                this.employeeSelected = emp;
                this.formMode = RESOURCE.METHOD.Put;
                console.log(emp);
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Xử lý ẩn hiện form chi tiết
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        showDialog(isShow){
            this.isShowDetail = isShow;
        },

        /**
         * Hàm in danh sách hiển thị list lên table
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        displayList(list, name) {
            try {
                return list.map((item) => item[name]).join(",  ");
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Xử lý sự kiện click nút xóa 1 hàng
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        deleteRowClick(idRowDelete) {
            try {
                this.isShowConfirmDialog = true;
                this.idRowDelete = idRowDelete;
                this.confirmModeDelete = ENUM.FORM_MODE.DeleteOne;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Xử lý sự kiện click nút đồng ý xóa 
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        agreeDelete() {
            try {
                this.isShowConfirmDialog = false;

                var me = this;
                var option = {
                    method: RESOURCE.METHOD.Delete,
                    headers: {
                        'Content-Type': RESOURCE.HEADERS_METHOD.ContentType
                    }
                }
                me.isLoading = true;
                try {
                    fetch(RESOURCE.API.Employees + '/' + me.idRowDelete, option)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function() {
                        var row_item = document.getElementById(`${me.idRowDelete}`);
                        if(row_item) {
                            row_item.remove();
                            me.isLoading = false;
                            me.isToastMessage = true;
                            setTimeout(() => {
                                me.isToastMessage = false;
                            },2000)
                        }
                    })
                    .catch(res=>{
                        console.log(res);
                        me.isLoading = false;
    
                    })
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Xử lý sự kiện click nút xóa nhiều dòng
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        deleteMultiRowOnClick() {
            try {
                this.isShowConfirmDialog = true;
                this.confirmModeDelete = ENUM.FORM_MODE.DeleteMultiple;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Xử lý sự kiện click nút đồng ý xóa nhiều dòng 
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        agreeDeleteMultiRow() {
            try {
                var me = this;
                me.isShowConfirmDialog = false;
                me.isShowDeleteChose = false;
                var option = {
                    method: RESOURCE.METHOD.Delete,
                    headers: {
                        'Content-Type': RESOURCE.HEADERS_METHOD.ContentType
                    }
                }

                me.isLoading = true;
                for(var i=0; i < me.checkedItemID.length; i++) {
                    try {
                        fetch(RESOURCE.API.Employees + '/' + me.checkedItemID[i], option)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function() {
                            try {
                            me.isToastMessage = true;
                            fetch(RESOURCE.API.EmployeesFilter + "?pageSize=100",{method:RESOURCE.METHOD.Get})
                            .then(res=>res.json())
                            .then(res=>{
                                console.log(res.Data);
                                me.employeeDetails = res.Data;
                                
                            })
                            .catch(res=>{
                                console.log(res);
                                this.isLoading = false;

                            })
                            } catch (error) {
                                console.log(error);
                            }
                        })
                        .catch(res=>{
                            console.log(res);
                            me.isLoading = false;
                            me.isToastMessage = false;
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }
                me.isLoading = false;
                me.isToastMessage = true;
                setTimeout(() => {
                    me.isToastMessage = false;
                },2000)
                me.isToastMessage = false;

            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Xử lý sự kiện tìm kiếm nhân viên
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        search() {
            try {
                this.currentPage = 1;
                this.getData();
                this.isCheckAll = false;
                this.checkedItemID = [];
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Xử lý sự kiện click nút nextPage
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        nextPage() {
            try {
                if(this.totalPage > this.currentPage) {
                this.currentPage ++;
                this.getData();
                this.isCheckAll = false;
                this.checkedItemID = [];
                }
            } catch (error) {
                console.log(error);
            }
            
        },

        /**
         * Xử lý sự kiện click nút prevPage
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        prevPage() {
            try {
                if(this.currentPage > 1) {
                this.currentPage --;
                this.getData();
                this.isCheckAll = false;
                this.checkedItemID = [];
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Xử lý sự kiện click nút firstPage
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        firstPage() {
            try {
                this.currentPage = 1;
                this.getData();
                this.isCheckAll = false;
                this.checkedItemID = [];
            } catch (error) {
                console.log(error);
            }
        },
        
        /**
         * Xử lý sự kiện click nút lastPage
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        lastPage() {
            try {
                this.currentPage = this.totalPage;
                this.getData();
                this.isCheckAll = false;
                this.checkedItemID = [];
            } catch (error) {
                console.log(error);
            }
            
        },

        /**
         * Hàm gọi API để lấy dữ liệu
         * Nguyễn Đăng Quang (04/08/2022)
         */ 
        getData() {
            try {
                this.isLoading = true;
                fetch(RESOURCE.API.EmployeesFilter +"?keyword=" + this.inputSearch + "&pageNumber=" + this.currentPage ,{method:RESOURCE.METHOD.Get})
                .then(res=>res.json())
                .then(res=>{
                    console.log(res.Data);
                    if(res.TotalCount > 0 ) {
                        this.employeeDetails = res.Data;
                        this.totalPage = Math.ceil((res.TotalCount) /100);
                        this.itemPerPage = this.employeeDetails.length;
                    }
                    this.isLoading = false;
                    console.log(res.TotalCount);
                })
                .catch(res=>{
                    console.log(res);
                    this.isLoading = false;
                })
            } catch (error) {
                console.log(error);
            }
        },
        
        /**
         * Hàm xuất file excel
         * Nguyễn Đăng Quang (12/09/2022)
         */ 
        exportFile() {
            try {
                location.assign(RESOURCE.API.EmployeesExportFile + "?keyword=" + this.inputSearch + "&pageNumber=" + this.currentPage);
            } catch (error) {
                console.log(error);
            }
            
        },

        /**
         * Hàm chuyển trang theo ô input 
         * Nguyễn Đăng Quang (12/09/2022)
         */ 
        changePage() {
            if(this.totalPage >= this.currentPage && this.currentPage > 0) {
                this.getData();
                this.isCheckAll = false;
                this.checkedItemID = [];
            }
        },  
    },
    
    created() {
        /**
         * Gọi API để lấy dữ liệu
         * Nguyễn Đăng Quang (12/09/2022)
         */ 
        this.getData();

    },
}
</script>

<style scoped>
    @import url("../../styles/layout/content.css");

    .text-long {
        /* overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        height: 40px; */
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

</style>

