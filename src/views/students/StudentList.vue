<template>
    <EmployeeEmpty/>
</template>

<script>

import EmployeeEmpty from  "../employee/EmployeeEmpty.vue";

export default {
    components: {EmployeeEmpty},
    data() {
        return {
            groups: {

            },
            employee: {

            },
            employees:[],
        }
    },


}
</script>

<style>
    
</style>