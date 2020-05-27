import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueFirestore from "vue-firestore";
// import jQuery from "jquery";

// window.$ = window.jQuery = jQuery; // what does this do??

import "popper.js";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import Swal from "sweetalert2";

import NavBar from "./components/NavBar.vue";

Vue.config.productionTip = false;
Vue.component(NavBar.name, NavBar);
Vue.use(VueFirestore);
Vue.prototype.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener(
            "mouseenter",
            Swal.stopTimer
        );
        toast.addEventListener(
            "mouseleave",
            Swal.resumeTimer
        );
    },
});

window.Toast = Toast;

// Vue.component('NavBar', require('./components/NavBar.vue').default);

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
