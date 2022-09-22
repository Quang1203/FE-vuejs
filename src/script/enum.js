const ENUM = {
    // Các mode của form detail
    FORM_MODE: {
        Add: "POST",
        Edit: "PUT",
        DeleteOne : "single",
        DeleteMultiple : "multiple",
    },

    // Giới tính
    GENDER : {
        Female:0, // Nữ
        Male: 1,   // Nam
        Other: 2   // Khác
    },

    // Tình trạng công việc
    WORKSTATUS : {
        NotWork: 0,          // Chưa làm việc
        CurrentlyWorking: 1, // Đang làm việc
        StopWork: 2,         // Ngừng làm việc 
        Retired: 3           // Đã nghỉ việc
    }
}
export default ENUM 
