<template>
    <EmployeeEmpty
    v-if = "employeeEmpty"
    />
    <div v-else class="content" >
        <div class="page__header">
            <div class="page__header--left">
                <input type="text" class="input input__icon input__icon--search" placeholder="Tìm kiếm theo Mã hoặc Tên hoặc SĐT" style="width : 300px"
                @keyup.enter="search"
                v-model="inputSearch"
                ref="firstFocus" 
                >
            </div>
            <div class="page__header--right">
                <button @click="btnAddOnClick"  id="btnAdd" class="button">Thêm</button> 
                <button @click="exportFile" class="button button-basic--white">Xuất khẩu</button> 
                <button @click="showDeleteChose" id="btnShowDelete" class="button-small btn-selectDelete"><i class="fa-solid fa-ellipsis"></i></button>
                <div v-if="isShowDeleteChose" class="showDeleteChose">
                    <button @click="deleteMultiRowOnClick" id="btnDeleteChose" class="button-small btnDeleteChose"><i class="fa-solid fa-trash-can"></i></button>
                    <label for="">Xóa</label>
                </div>
            </div>
        </div>
        <div class="page__table">
            <div class="table__content">
                <table id="tbEmployeeList" class="table" border="0">
                    <thead>
                        <tr>
                            <th class="text-align--center" style="width:40px"><input ref="checkInputAll" @change="checkboxChoseAllOnClick" :checked="isCheckAll" type="checkbox" class="checkbox-item checkbox-item--all"></th>
                            <th class="text-align--center" style="width:100px">Số hiệu cán bộ</th>
                            <th class="text-align--center" style="width:250px">Họ và tên</th>
                            <th class="text-align--center" style="width:100px">Số điện thoại</th>
                            <th class="text-align--center" style="width:175px">Tổ chuyên môn</th>
                            <th class="text-align--center" style="width:100px">QL theo môn</th>
                            <th class="text-align--center" style="width:200px">QL theo kho, phòng</th>
                            <th class="text-align--center" style="width:120px">Đào tạo QLTB</th>
                            <th class="text-align--center" style="width:120px">Đang làm việc</th>
                            <th class="text-align--right" style="width:100px"></th>
                        </tr>
                    </thead>
                    <tbody v-for="(item) in employeeDetails" :key="item.employee.EmployeeID" @dblclick="rowOnDblClick(item)" >
                        <tr :id="item.employee.EmployeeID" :ref="item.employee.EmployeeID" :class="{'row--selected': checkedItemID.includes(item.employee.EmployeeID) }">
                            <td class="text-align--center" style="width:40px"><input :value="item.employee.EmployeeID" :checked="checkedItemID.includes(item.employee.EmployeeID) " v-model="checkedItemID" type="checkbox" class="checkbox-item"></td>
                            <td class="text-align--center" style="width:100px">{{item.employee.EmployeeCode}}</td>
                            <td @click="rowOnDblClick(item)" class="text-align--left" style="width:250px; color: var(--main-color);">{{item.employee.EmployeeName}}</td>
                            <td class="text-align--center" style="width:100px">{{item.employee.TelNumber}}</td>
                            <td class="text-align--left" style="width:175px">{{item.employee.GroupName}}</td>
                            <td class="text-align--left" style="width:100px">
                                <!-- <span v-for="(i) in item.ListSubject" :key="i.SubjectID">{{i.SubjectName}} &nbsp;</span>  -->
                                {{ displayList(item.ListSubject, "SubjectName") }}
                            </td>
                            <td class="text-align--left" style="width:200px">
                                <!-- <span v-for="(i) in item.ListStorageRoom" :key="i.StorageRoomID">{{i.StorageRoomName}} &nbsp;</span>  -->
                                {{ displayList(item.ListStorageRoom, "StorageRoomName") }}
                            </td>
                            <td :class="{'icon-checked' : (item.employee.EMT == 1)}" class="text-align--center" style="width:120px"></td>
                            <td :class="{'icon-checked' : (item.employee.WorkStatus == 1)}" class="text-align--center" style="width:120px"></td>
                            <td class="text-align--center" style="width:100px">
                                <button @click="rowOnDblClick(item)" class="button-small"><i class="fa-solid fa-pen"></i></button>
                                <button @click="deleteRowClick(item.employee.EmployeeID)" class="button-small"><i class="fa-solid fa-trash-can"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table__paging">
                <div class="table__paging--first">
                    <button @click="firstPage" class="paging__button paging__button--first"></button>
                    <button @click="prevPage" class="paging__button paging__button--prev"></button>
                    <div class="paging__input--group">
                        <input type="text" class="paging__number-page text-align--center" 
                        v-model="currentPage"
                        @keyup.enter="changePage">
                    </div>
                    <button @click="nextPage" class="paging__button paging__button--next"></button>
                    <button @click="lastPage" class="paging__button paging__button--last"></button>
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

export default {
    name: "EmployeeList",
    components:{EmployeeDetail,MLoading, MToastMessage, MConfirmDialog,EmployeeEmpty},
    data() {
        return {
            employeeDetails: [
            ],
            employeeSelected: {},
            isShowDetail: false,
            formMode : "POST",
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
                this.employeeSelected.employee = {};
                this.employeeSelected.ListSubject = [];
                this.employeeSelected.ListStorageRoom = [];
                this.showDialog(true);
                this.formMode = "POST";
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
            console.log(emp);
            var option ;
            
            // Form thêm
            if (me.formMode == "POST") {
                option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(emp)
                }
                me.isLoading = true;
                try {
                    fetch("http://localhost:10557/api/EmployeeDetails/Detail", option)
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
                        console.error('Error:', error);
                        me.isLoading = false;
                    }) 
                } catch (error) {
                    console.log(error);
                }
                
            } else {
                //Form sửa
                option = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(emp)
                }
                console.log(emp);
                me.isLoading = true;
                try {
                    fetch("http://localhost:10557/api/EmployeeDetails/Detail" + '/' + me.employeeSelected.employee.EmployeeID, option)
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
                this.formMode = "PUT";
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
                this.confirmModeDelete = "single";
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
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                me.isLoading = true;
                try {
                    fetch("http://localhost:10557/api/Employees" + '/' + me.idRowDelete, option)
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
                this.confirmModeDelete = "multiple";
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
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                me.isLoading = true;
                for(var i=0; i < me.checkedItemID.length; i++) {
                    try {
                        fetch("http://localhost:10557/api/Employees" + '/' + me.checkedItemID[i], option)
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function() {
                            try {
                                fetch("http://localhost:10557/api/EmployeeDetails/filterDetails?pageSize=100",{method:"GET"})
                            .then(res=>res.json())
                            .then(res=>{
                                console.log(res.Data);
                                me.employeeDetails = res.Data;
                                
                            })
                            .catch(res=>{
                                console.log(res);
                                this.isLoading = false;

                            })

                            // if(row_item) {
                            //     row_item.remove();
                            //     me.isLoading = false;
                            //     // me.isToastMessage = true;
                            //     // setTimeout(() => {
                            //     //     me.isToastMessage = false;
                            //     // },2000)
                            // }
                            } catch (error) {
                                console.log(error);
                            }
                        })
                        .catch(res=>{
                            console.log(res);
                            me.isLoading = false;
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
                fetch("http://localhost:10557/api/EmployeeDetails/filterDetails?keyword=" + this.inputSearch + "&pageNumber=" + this.currentPage ,{method:"GET"})
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
                location.assign("http://localhost:10557/api/EmployeeDetails/ExportFile?keyword=" + this.inputSearch + "&pageNumber=" + this.currentPage);
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
</style>

