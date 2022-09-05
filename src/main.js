import { createApp } from 'vue'
import App from './App.vue'
import  { createRouter,createWebHistory }  from 'vue-router'
import EmployeeList from './views/employee/EmployeeList.vue'
import StudentList from './views/students/StudentList.vue'
import Manhcombobox from 'ms-combobox'
import MISANotice from "./components/base/MMessage.vue";
import jQuery from 'jquery'
window.$=window.jQuery=jQuery;
// Khai báo router
const routes = [
    // { path: '/', component: Home },
    { path: '/employee', component: EmployeeList },
    { path: '/student', component: StudentList },


]

// khởi tạo router
const vueRouter = createRouter({ 
    history: createWebHistory(), 
    routes :routes
})
   
// Sử dụng router
const app = createApp(App);
app.component("MISAcombobox", Manhcombobox)
app.component("ManhNotice", MISANotice)
app.use(vueRouter).mount('#app') 
