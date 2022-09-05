<template>
    <!-- Dialog chi tiết nhân viên -->
    <div id="dlgEmployeeDetail" class="dialog"> 
        <div class="dialog__content">
            <div class="row">
                <div class="col-30">
                    <div class="dialog__avatar">
                        <div class="dialog__select-avatar">
                            <img src="../../assets/icon/Avatar-Facebook-trắng.jpg" alt="ảnh avatar">
                            <button class="button">Chọn ảnh</button>
                        </div>
                        <div class="dialog__info-user">
                            <span>{{employeeSelected.EmployeeName}}</span>
                            <span>{{employeeSelected.EmployeeCode}}</span>
                        </div>
                    </div>
                </div>
                <div class="col-70" style="box-sizing: border-box;">
                    <div class="dialog__header">
                        <div class="dialog__header title" style="padding:16px 0 24px 0px; color: var(--text-color) ;" v-if="formMode === 'POST'">Thêm hồ sơ Cán bộ, giáo viên</div>
                        <div class="dialog__header title" style="padding:16px 0 24px 0px; color: var(--text-color) ;" v-else>Sửa hồ sơ Cán bộ, giáo viên</div>
                        <div @click="btnCloseOnClick" class="dialog__button--close"></div>
                    </div>
                    <div class="dialog__body" >
                        <div class="row">
                            <div class="col-50" style="position: relative; ">
                                <div style="margin-right: 8px;" class="col-45">
                                    <label>Số hiệu cán bộ <span class="input--required">*</span></label>
                                </div>
                                <input type="text" class="input" style="flex:1; padding-left: 12px;" id="txtEmployeeCode" required
                                name-property="Số hiệu cán bộ"
                                ref="firstFocus" 
                                tabindex="1" 
                                v-model="employeeSelected.EmployeeCode" propName="EmployeeCode" 
                                @blur="blurEmpCode($event)"
                                :class="{'input__error--required': isEmptyEmpCodeBlur}"
                                >
                                
                                <div v-show="isEmptyEmpCode" class="validation-tooltip" style="right: -89%;">
                                    <span>Số hiệu cán bộ không được bỏ trống.</span>
                                </div>
                            </div>
                            <div class="col-50" style="position: relative;">
                                <div style="margin-right: 8px;" class="col-35">
                                    <label>Họ và tên <span class="input--required">*</span></label>
                                </div>
                                <input tabindex="2" required type="text" class="input"
                                propName="FullName" style="flex:1; padding-left: 12px;" id="txtFullName" name-property="Họ và tên"
                                v-model="employeeSelected.EmployeeName" 
                                @blur="blurEmpName($event)"  
                                :class="{'input__error--required': isEmptyEmpNameBlur}"
                                >
                                <div v-show="isEmptyEmpName" class="validation-tooltip">
                                    <span>Họ và tên không được bỏ trống.</span>
                                </div>
    
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-50">
                                <div style="margin-right: 8px;" class="col-45">
                                    <label>Số điện thoại</label>
                                </div>
                                <input tabindex="3" v-model="employeeSelected.TelNumber" style="flex:1; padding-left: 12px;" id="txtPhoneNumber" 
                                    name-property="Số điện thoại" type="text" class="input"
                                    @blur="blurEmpTelNumber($event)"
                                    >
    
                            </div>
                            <div class="col-50">
                                <div style="margin-right: 8px;" class="col-35">
                                    <label>Email</label>
                                </div>
                                <input tabindex="4" v-model="employeeSelected.Email" style="flex:1; padding-left: 12px;" id="txtEmail" name-property="Email"
                                type="text" class="input"
                                @blur="blurEmpEmail($event)"
                                >
    
                            </div>
                        </div>
    
                        <div class="row">
                            <div class="col-50">
                                <div style="margin-right: 8px;" class="col-45">
                                    <label>Tổ bộ môn</label>
                                </div>
                                <MSingleSelect
                                    @getValue="getValueGroup"
                                    :initialValue="employeeSelected"
                                    :url="'http://localhost:10557/api/Groups'"
                                    :idName="'GroupID'"
                                    :valueName="'GroupName'"
                                    :width="'200px'"
                                />
    
                            </div>
                            <div class="col-50">
                                <div style="margin-right: 8px;" class="col-35">
                                    <label>QL theo môn</label>
                                </div>
                                <MMultiSelect
                                    
                                    @getValue="getValue"
                                    :initialValue="employeeSelected"
                                    :url="'http://localhost:10557/api/Subjects'"
                                    :idName="'SubjectID'"
                                    :valueName="'SubjectName'"
                                    :width="'200px'"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div style="margin-right: 8px;" class="col-22">
                                <label>QL kho, phòng</label>
                            </div>
                            <MMultiSelect
                                @getValue="getValue"
                                :initialValue="employeeSelected"
                                :url="'http://localhost:10557/api/StorageRooms'"
                                :idName="'StorageRoomID'"
                                :valueName="'StorageRoomName'"
                                :width="'200px'"
                            />
    
                        </div>
    
                        <div class="row">
                            <input tabindex="8" class="checkbox-item" type="checkbox" id="EMT" :value="(employeeSelected.EMT == 1) ? true : false" v-model="EMT" :checked="(employeeSelected.EMT == 1) ? true : false" >
                            <label>Trình độ nghiệp vụ QLTB</label>
                            <input tabindex="9" class="checkbox-item" type="checkbox" id="WorkStatus" :value="(employeeSelected.WorkStatus == 1) ? true : false" v-model="WorkStatus" :checked="(employeeSelected.WorkStatus == 1) ? true : false"  style="margin-left: 24px ;">
                            <label style="text-align: center;">Đang làm việc</label>
                            <div v-if="(employeeSelected.WorkStatus == 0)" class="quit-date" style="position: absolute; right: 24px;"> 
                                <label style="text-align: center;">Ngày nghỉ việc</label>
                                <input style="margin-left: 8px;" type="date">
                            </div>
    
                        </div>
                        <div class="dialog__footer">
                            <button tabindex="10" @click="btnSaveOnclick" id="btnSave" class="button" style="order:1">Lưu</button>
                            <button tabindex="11" @click="btnCloseOnClick" class="button button-basic--white" style="order:2">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MMessage v-if="showErrorValidate"  :validateString="validateString" @hideNotice="hideNotice" />
</template>

<script>
import MMessage from "../../components/base/MMessage.vue";
import MSingleSelect from  "../../components/base/MSingleSelect.vue";
import MMultiSelect from  "../../components/base/MMultiSelect.vue";

export default {
    name: "EmployeeDetail",
    components: {MMessage, MSingleSelect, MMultiSelect},
    props: ["showDialogFunction", "employeeDetail" , "formMode"],
    // watch: {
    //     employeeDetail: function (newValue, oldValue) {
    //         if (newValue.EmployeeCode == "") {
    //             console.log(1);
    //         }
    //     }
    // },
    data() {
        return {
            employeeSelected: {},
            isError: false,
            showErrorValidate: false,
            // employeeSave: {},
            // employeeDetail: {},
            EMT: false,
            WorkStatus: false,
            isEmptyEmpNameBlur: false,
            isEmptyEmpCodeBlur: false,
            isEmptyEmpName: false,
            isEmptyEmpCode: false,
            empName:"",
            empCode:"",
            empTelNumber:"",
            empEmail:"",
            validateString:[],

        };
    },
    // componentUpdated: {
    //     focus: {
    //         // định nghĩa cho directive
    //         inserted: function (el) {
    //           el.focus()
    //         }
    //     }
    // },
    created() {
        // alert("khởi tạo popup");
        this.employeeSelected = this.employeeDetail;
        this.EMT = (this.employeeSelected.EMT == 1) ? true : false;
        this.WorkStatus = (this.employeeSelected.WorkStatus == 1) ? true : false;
        
    },
    mounted(){
            this.$refs.firstFocus.focus();
    },
    // computed: {
    //     this.$refs("firstFocus").focus();
    // },
    unmounted() {
        // alert(" hủy popup");
    },
    watch: {
        EMT() {
            // this.EMT = (this.employeeSelected.EMT == 1) ? true : false;
            this.employeeSelected.EMT = (this.EMT == true) ? 1 : 0;

        },
        WorkStatus() {
            // this.EMT = (this.employeeSelected.EMT == 1) ? true : false;
            this.employeeSelected.WorkStatus = (this.WorkStatus == true) ? 1 : 0;

        },
        
        


    },
    methods: {
        getValueGroup(idGroup, nameGroup) {
            this.employeeSelected.GroupID = idGroup;
            this.employeeSelected.GroupName = nameGroup;
            console.log(idGroup,nameGroup);
        },

        
        btnCloseOnClick() {
            // document.getElementById("dlgEmployeeDetail").style.display = "none";
            // this.showDialogFunction(false);
            this.$emit("closeButtonOnClick", false, true, "1");
        },

        btnSaveOnclick() {
            try {
                // validate dữ liệu:
                // if (this.employeeDetail.EmployeeCode == undefined) {
                //     this.isError = true;
                //     this.showErrorValidate = true;
                // }
                // console.log(this.employeeSelected.EmployeeCode );
                this.validateString = [];
                if(this.employeeSelected.EmployeeCode == "" || this.employeeSelected.EmployeeCode == undefined) {
                    this.validateString.push("Số hiệu cán bộ");
                } else {
                    this.validateString= this.validateString.filter(item => item !== "Số hiệu cán bộ");
                }
                if(this.employeeSelected.EmployeeName == "" || this.employeeSelected.EmployeeName == undefined) {
                    this.validateString.push("Họ và tên");
                } else {
                    this.validateString= this.validateString.filter(item => item !== "Họ và tên");
                }
                if(this.validateString.length == 0 ) {
                    this.$emit("saveButtonOnClick", this.employeeSelected);
                    this.showErrorValidate = false;
                    
                } else {
                    this.isEmptyEmpNameBlur = true;
                    this.isEmptyEmpName = true;
                    setTimeout(() => {
                        this.isEmptyEmpName = false;
                    },2000);
                    this.isEmptyEmpCodeBlur = true;
                    this.isEmptyEmpCode = true;
                    setTimeout(() => {
                        this.isEmptyEmpCode = false;
                    },2000);
                    this.showErrorValidate = true;

                }

            }
            catch (error) {
                console.log(error);
            }
        },

        hideNotice() {
            this.showErrorValidate = false;
        },
        
        blurEmpName(e) {
            var name =e.target.value;
            this.empName = name;
            
            if(name == "") {
                this.isEmptyEmpNameBlur = true;
                this.isEmptyEmpName = true;
                setTimeout(() => {
                    this.isEmptyEmpName = false;
                },2000);
                // this.validateString.push("Họ và tên");
                
            }else {
                this.isEmptyEmpNameBlur = false;
                this.isEmptyEmpName = false;
                // this.validateString= this.validateString.filter(item => item !== "Họ và tên");
            }
        },
        blurEmpCode(e) {
            var code =e.target.value;
            this.empCode = code;
            console.log(this.empCode);
            if(code == "") {
                this.isEmptyEmpCodeBlur = true;
                this.isEmptyEmpCode = true;
                setTimeout(() => {
                    this.isEmptyEmpCode = false;
                },2000);
                // this.validateString.push("Số hiệu cán bộ");


            }else {
                this.isEmptyEmpCodeBlur = false;
                this.isEmptyEmpCode = false;
                // this.validateString= this.validateString.filter(item => item !== "Số hiệu cán bộ");

            }
        },
        blurEmpTelNumber(e) {
            var telNum =e.target.value;
            this.empTelNumber = telNum;

        },
        blurEmpEmail(e) {
            var email =e.target.value;
            this.empEmail = email;
        }
    },
}
</script>