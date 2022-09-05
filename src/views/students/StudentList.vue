<template>
    <div>
        <label for="" class="label">Tổ bộ môn</label>
        <BaseSelect
            :initialValue="{
                  groupID: employee.groupID,
                  groupName: employee.groupName,
            }"
            :idName="'groupID'"
            :valueName="'groupName'"
            @getValue="getGroupValue"
            :url="'http://localhost:10557/api/Groups'"
            :width="'150px'"
        />

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <MSingleSelect
        @getValue="getValue"
        :initialValue="employee"
        :url="'http://localhost:10557/api/Groups'"
        :idName="'groupID'"
        :valueName="'groupName'"
        :width="'200px'"
        />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {{employee}}
        <MMultiSelect
        @getValue="getValue"
        :idValue="employee.groupID"
        :displayValue="employee.groupName"
        :url="'http://localhost:10557/api/Groups'"
        :idName="'groupID'"
        :valueName="'groupName'"
        :width="'200px'"
        />
    </div>

    

    

    <EmployeeEmpty/>
</template>

<script>

import BaseSelect from  "../../components/base/MCombobox.vue";
import MSingleSelect from  "../../components/base/MSingleSelect.vue";
import MMultiSelect from  "../../components/base/MMultiSelect.vue";

import EmployeeEmpty from  "../employee/EmployeeEmpty.vue";

export default {
    components: {BaseSelect, MSingleSelect, MMultiSelect ,EmployeeEmpty},
    data() {
        return {
            groups: {

            },
            employee: {

            },
            employees:[],
        }
    },

    methods : {
        getGroupValue(id, value, option) {
            // this.$emit("getValue", id, value, option);
            console.log(id, value, option);
        },

        getValue(e) {
            console.log(e);
        }
    },

    created() {
        fetch("http://localhost:10557/api/Employees",{method:"GET"})
        .then(res=>res.json())
        .then(res=>{
            this.employees = res.data;
            this.employee = {...res.data[0]};
            console.log(this.employee);
            
        })
        .catch(res=>{
            console.log(res);
        })
    },

}
</script>

<style>
    
</style>