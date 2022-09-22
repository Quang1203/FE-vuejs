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
                            <span v-if="(this.employeeSelected.employee.EmployeeName != '' && this.employeeSelected.employee.EmployeeName != undefined) " class="text-align--center">{{employeeSelected.employee.EmployeeName}}</span>
                            <span v-else class="text-align--center">Họ và tên</span>
                            <span v-if="(this.employeeSelected.employee.EmployeeCode != '' && this.employeeSelected.employee.EmployeeCode != undefined) " class="text-align--center">{{employeeSelected.employee.EmployeeCode}}</span>
                            <span v-else class="text-align--center">Số hiệu cán bộ</span>
                        </div>
                    </div>
                </div>
                <div class="col-70" style="box-sizing: border-box;">
                    <div class="dialog__header">
                        <div class="dialog__header title" style="padding:16px 0 24px 0px; color: var(--text-color) ;" v-if="formMode == 'POST'">Thêm hồ sơ Cán bộ, giáo viên</div>
                        <div class="dialog__header title" style="padding:16px 0 24px 0px; color: var(--text-color) ;" v-else>Sửa hồ sơ Cán bộ, giáo viên</div>
                        <div @click="btnCloseOnClick" class="dialog__button--close" title="Đóng"></div>
                    </div>
                    <div class="dialog__body" >
                        <div class="row">
                            <div class="col-50" style="position: relative; ">
                                <div style="margin-right: 8px;" class="col-45">
                                    <label>Số hiệu cán bộ <span class="input--required">*</span></label>
                                </div>
                                <input type="text" class="input" style="flex:1; padding-left: 12px;" id="txtEmployeeCode" required
                                name-property="Số hiệu cán bộ" title="Thông tin này không được phép để trống"
                                ref="firstFocus" 
                                tabindex="1" 
                                v-model="employeeSelected.employee.EmployeeCode" propName="EmployeeCode" 
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
                                propName="FullName" style="flex:1; padding-left: 12px;" id="txtFullName" name-property="Họ và tên" title="Thông tin này không được phép để trống"
                                v-model="employeeSelected.employee.EmployeeName" 
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
                                <input tabindex="3" v-model="employeeSelected.employee.TelNumber" style="flex:1; padding-left: 12px;" id="txtPhoneNumber" title="Nhập số điện thoại"
                                    name-property="Số điện thoại" type="text" class="input"
                                    @blur="blurEmpTelNumber($event)"
                                    >
    
                            </div>
                            <div class="col-50">
                                <div style="margin-right: 8px;" class="col-35">
                                    <label>Email</label>
                                </div>
                                <input tabindex="4" v-model="employeeSelected.employee.Email" style="flex:1; padding-left: 12px;" id="txtEmail" name-property="Email" title="Nhập Email"
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
                                <MSingleSelect style="align-items: center;" title="Chọn tổ chuyên môn"
                                    @getValue="getValueGroup"
                                    :initialValue="employeeSelected.employee"
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
                                <MMultiSelect title="Chọn bộ môn quản lý"
                                    @getValue="getValueSubjects"
                                    :initialValue="employeeSelected.ListSubject"
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
                            <MMultiSelect title="Chọn phòng kho quản lý"
                                @getValue="getValueStorageRooms"
                                :initialValue="employeeSelected.ListStorageRoom"
                                :url="'http://localhost:10557/api/StorageRooms'"
                                :idName="'StorageRoomID'"
                                :valueName="'StorageRoomName'"
                                :width="'200px'"
                            />
    
                        </div>
    
                        <div class="row">
                            <input tabindex="11" class="checkbox-item" type="checkbox" id="EMT" title="Trình độ nghiệp vụ quản lý thiết bị" :value="(employeeSelected.employee.EMT == 1) ? true : false" v-model="EMT" :checked="(employeeSelected.EMT == 1) ? true : false" >
                            <label>Trình độ nghiệp vụ QLTB</label>
                            <input tabindex="12" class="checkbox-item" type="checkbox" id="WorkStatus" title="Trình trạng làm việc" :value="(employeeSelected.employee.WorkStatus == 1) ? true : false" v-model="WorkStatus" :checked="(employeeSelected.WorkStatus == 1) ? true : false"  style="margin-left: 24px ;">
                            <label style="text-align: center;">Đang làm việc</label>
                            <div v-if="(employeeSelected.employee.WorkStatus == 0)" class="quit-date" style="position: absolute; right: 24px;"> 
                                <label style="text-align: center;">Ngày nghỉ việc</label>
                                <input tabindex="13" title="Chọn ngày nghỉ việc nếu đã nghỉ" style="margin-left: 8px;" type="date" v-model="QuitDate">
                            </div>
    
                        </div>
                        <div class="dialog__footer">
                            <button tabindex="14" @click="btnSaveOnclick" id="btnSave" class="button" style="order:1" title="Lưu thông tin">Lưu</button>
                            <button tabindex="15" @click="btnCloseOnClick" class="button button-basic--white" style="order:2" title="Đóng form">Đóng</button>
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
import ENUM from "../../script/enum.js"
import RESOURCE from "../../script/resource.js"



export default {
    name: "EmployeeDetail",
    components: {MMessage, MSingleSelect, MMultiSelect},
    props: ["showDialogFunction", "employeeDetail" , "formMode"],
    data() {
        return {
            employeeSelected: {},
            isError: false,
            showErrorValidate: false,
            EMT: false,
            WorkStatus: false,
            QuitDate : null,
            isEmptyEmpNameBlur: false,
            isEmptyEmpCodeBlur: false,
            isEmptyEmpName: false,
            isEmptyEmpCode: false,
            empName:"",
            empCode:"",
            empTelNumber:"",
            empEmail:"",
            validateString:[],
            birthday: '',
            CheckDuplicateEmployeeCode: "",
            
        };
    },
    created() {
        try {
            this.employeeSelected = this.employeeDetail;
            this.EMT = (this.employeeSelected.employee.EMT == 1) ? true : false;
            // var date = new Date(this.employeeSelected.employee.QuitDate); 
            this.QuitDate = this.formatDateInput(this.employeeSelected.employee.QuitDate);
            this.WorkStatus = (this.employeeSelected.employee.WorkStatus == 1) ? true : false;

            if(this.formMode === ENUM.FORM_MODE.Add ) {
                try {
                    fetch(RESOURCE.API.Employees +"/new-code",{method:RESOURCE.METHOD.Get})
                    .then(res=>res.text())
                    .then(res=>{
                        console.log(res);
                        this.employeeSelected.employee.EmployeeCode = res;
                        this.employeeSelected.employee.WorkStatus = 0;
                    })
                    .catch(res=>{
                        console.log(res);
                    })
                } catch (error) {
                    console.log(error);
                }       
            }
        } catch (error) {
            console.log(error);
        }
        
    },

    /**
    * Sự kiện Focus vào ô nhập liệu đầu tiên
    * Author: Nguyễn Đăng Quang (09/09/2022)
    */
    mounted(){
            this.$refs.firstFocus.focus();
    },

    watch: {
        EMT() {
            // this.EMT = (this.employeeSelected.EMT == 1) ? true : false;
            this.employeeSelected.employee.EMT = (this.EMT == true) ? 1 : 0;

        },
        WorkStatus() {
            // this.EMT = (this.employeeSelected.EMT == 1) ? true : false;
            this.employeeSelected.employee.WorkStatus = (this.WorkStatus == true) ? 1 : 0;

        },
        QuitDate() {
            this.employeeSelected.employee.QuitDate = this.formatDate(this.QuitDate);
        }
    },

    methods: {
        /**
        * Sự kiện lấy giá trị của combobox chọn tổ bộ môn
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        getValueGroup(idGroup, nameGroup) {
            try {
                this.employeeSelected.employee.GroupID = idGroup;
                this.employeeSelected.employee.GroupName = nameGroup;
                console.log(idGroup,nameGroup);
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Sự kiện lấy giá trị của combobox chọn môn
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        getValueSubjects(listSubject) {
            try {
                this.employeeSelected.ListSubject = listSubject;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Sự kiện lấy giá trị của combobox chọn kho phòng
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        getValueStorageRooms(listStorageRoom) {
            try {
                this.employeeSelected.ListStorageRoom = listStorageRoom;
            } catch (error) {
                console.log(error);
            }
        },
        
        /**
        * Sự kiện đóng form 
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        btnCloseOnClick() {
            try {
                this.$emit("closeButtonOnClick", false);
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Format ngày về type date
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        formatDateInput(date){
            if (date) {
                let dateIn = new Date(date),
                    year = dateIn.getFullYear().toString(),
                    month = (dateIn.getMonth() + 1).toString().padStart(2, '0'),
                    day = dateIn.getDate().toString().padStart(2, '0');
            
                return `${year}-${month}-${day}`;
            }
        },

        /**
        * Format ngày về type datetime
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        formatDate(dateSrc ){
            if (dateSrc) {
                let date = new Date(dateSrc),
                    year = date.getFullYear().toString(),
                    month = (date.getMonth() + 1).toString().padStart(2, '0'),
                    day = date.getDate().toString().padStart(2, '0');
            
                return `${year}-${month}-${day}T00:00:00`;
            }
        },

        /**
        * Validate form 
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        validate() {
            try {
                var me = this;
                // validate dữ liệu:
                // validate sô hiệu cán bộ
                if(me.employeeSelected.employee.EmployeeCode == "" || me.employeeSelected.employee.EmployeeCode == undefined) {
                    me.validateString.push(RESOURCE.VALIDATE_STRING.EmployeeCodeRequired);
                } else {
                    me.validateString= me.validateString.filter(item => item !== RESOURCE.VALIDATE_STRING.EmployeeCodeRequired);
                }
                // validate tên nhân viên
                if(me.employeeSelected.employee.EmployeeName == "" || me.employeeSelected.employee.EmployeeName == undefined) {
                    me.validateString.push(RESOURCE.VALIDATE_STRING.EmployeeNameRequired);
                } else {
                    me.validateString= me.validateString.filter(item => item !== RESOURCE.VALIDATE_STRING.EmployeeNameRequired);
                }
                // validate sô điện thoại nhân viên
                if(me.employeeSelected.employee.TelNumber != undefined && me.employeeSelected.employee.TelNumber != "") {
                    if(me.employeeSelected.employee.TelNumber.length < 10 ) {
                        me.validateString.push(RESOURCE.VALIDATE_STRING.TelNumberValidate);
                    } else {
                        me.validateString= me.validateString.filter(item => item !== RESOURCE.VALIDATE_STRING.TelNumberValidate);
                    }
                }else {
                    me.validateString= me.validateString.filter(item => item !== RESOURCE.VALIDATE_STRING.TelNumberValidate);
                }
                // validate email nhân viên
                if(me.employeeSelected.employee.Email != undefined && me.employeeSelected.employee.Email != "") {
                    /* eslint-disable no-useless-escape */
                    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(me.employeeSelected.employee.Email))) {
                        me.validateString.push(RESOURCE.VALIDATE_STRING.EmailValidate);
                    } else {
                        me.validateString= me.validateString.filter(item => item !== RESOURCE.VALIDATE_STRING.EmailValidate);
                    }
                }
                // validate ngày nghỉ việc nhân viên
                var today = new Date();
                if(me.QuitDate > this.formatDateInput(today)) {
                    me.validateString.push(RESOURCE.VALIDATE_STRING.QuitDateValidate);
                } else {
                    me.validateString= me.validateString.filter(item => item !== RESOURCE.VALIDATE_STRING.QuitDateValidate);
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Sự kiện ấn nút save
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        btnSaveOnclick() {
            try {
                var me = this;
                // validate dữ liệu:
                me.validateString = [];
                // validate trùng mã nhân viên  
                if(me.formMode === ENUM.FORM_MODE.Add) {
                    fetch(RESOURCE.API.Employees +"/duplicateEmployeeCode/" + me.employeeSelected.employee.EmployeeCode ,{method:RESOURCE.METHOD.Get})
                    .then(res=>res.text())
                    .then(res=>{
                        if(res != "OK") {
                            me.validateString.push(RESOURCE.VALIDATE_STRING.EmployeeCodeDuplicate);    
                        }else {
                            me.validateString= me.validateString.filter(item => item !== RESOURCE.VALIDATE_STRING.EmployeeCodeDuplicate);
                        }
                    })
                    .then(function() {
                        me.validate();

                        if(me.validateString.length == 0 ) {
                            me.$emit("saveButtonOnClick", me.employeeSelected);
                            me.showErrorValidate = false;

                        } else {
                            // hiện popup validate
                            me.showErrorValidate = true;
                        }
                    })
                    .catch(res=>{
                        console.log(res);
                    })
                } else {
                    me.validate();
                    if(me.validateString.length == 0 ) {
                        me.$emit("saveButtonOnClick", me.employeeSelected);
                        me.showErrorValidate = false;
                    } else {
                        // hiện popup validate
                        me.showErrorValidate = true;
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        },

        /**
        * Sự kiện ẩn thông báo validate
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        hideNotice() {
            try {
                this.showErrorValidate = false;
            } catch (error) {
                console.log(error);
            }
        },
        
        /**
        * Sự kiện khi blur input Họ và tên
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        blurEmpName(e) {
            try {
                var name =e.target.value;
                this.empName = name;
                
                if(name == "") {
                    this.isEmptyEmpNameBlur = true;
                    this.isEmptyEmpName = true;
                    setTimeout(() => {
                        this.isEmptyEmpName = false;
                    },2000);

                }else {
                    this.isEmptyEmpNameBlur = false;
                    this.isEmptyEmpName = false;
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Sự kiện khi blur input SHCB
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        blurEmpCode(e) {
            try {
                var code =e.target.value;
                this.empCode = code;
                if(code == "") {
                    this.isEmptyEmpCodeBlur = true;
                    this.isEmptyEmpCode = true;
                    setTimeout(() => {
                        this.isEmptyEmpCode = false;
                    },2000);


                }else {
                    this.isEmptyEmpCodeBlur = false;
                    this.isEmptyEmpCode = false;

                }
            } catch (error) {
                console.log(error);
            }
            
        },

        /**
        * Sự kiện khi blur input SĐT
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        blurEmpTelNumber(e) {
            try {
                var telNum =e.target.value;
                this.empTelNumber = telNum;
            } catch (error) {
                console.log(error);
            }
            

        },

        /**
        * Sự kiện khi blur input email
        * Author: Nguyễn Đăng Quang (09/09/2022)
        */
        blurEmpEmail(e) {
            try {
                var email =e.target.value;
                this.empEmail = email;
            } catch (error) {
                console.log(error);
            }
        },

        validateEmail(email) {
            /* eslint-disable no-useless-escape */
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                this.validateString.push(RESOURCE.VALIDATE_STRING.EmailValidate);
            } else {
                this.validateString= this.validateString.filter(item => item !== RESOURCE.VALIDATE_STRING.EmailValidate);
            }
        },
    },
}
</script>