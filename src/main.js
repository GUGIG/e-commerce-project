import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import jQuery from "jquery";

// window.$ = window.jQuery = jQuery; // what does this do??

import "popper.js";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";

import NavBar from "./components/NavBar.vue";

Vue.config.productionTip = false;
Vue.component(NavBar.name, NavBar);
// Vue.component('NavBar', require('./components/NavBar.vue').default);

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
