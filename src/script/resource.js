const RESOURCE = {
    // Các thông báo validate
    VALIDATE_STRING: {
        EmployeeCodeRequired : "Số hiệu cán bộ không được phép để trống",
        EmployeeNameRequired : "Họ và tên không được phép để trống",
        TelNumberValidate : "Số điện thoại không đủ độ dài",
        EmailValidate : "Email không đúng định dạng",
        QuitDateValidate : "Ngày nghỉ việc không được lớn hơn ngày hiện tại",
        EmployeeCodeDuplicate : "Số hiệu cán bộ đã tồn tại",
    },

    // Các method khi gọi api
    METHOD : {
    Get: "Get",
    Post: "Post",
    Put: "Put",
    Delete: "Delete"
    },

    // Các headers method khi gọi api
    HEADERS_METHOD : {
        ContentType : 'application/json',

    },

    // API Domain
    DOMAIN : "http://localhost:10557",

    // API List
    API : {
        EmployeeDetails: "http://localhost:10557" + "/api/EmployeeDetails/Detail",
        Employees: "http://localhost:10557" + "/api/Employees",
        EmployeesFilter: "http://localhost:10557" + "/api/EmployeeDetails/filterDetails",
        EmployeesExportFile : "http://localhost:10557" + "/api/EmployeeDetails/ExportFile",
        Groups: "http://localhost:10557" + "/api/Groups",
        Subjects: "http://localhost:10557" + "/api/Subjects",
        StorageRooms: "http://localhost:10557" + "/api/StorageRooms",
    }

}

export default RESOURCE 