require("./bootstrap");
import router from "./routes";
import VueRouter from "vue-router";
import Index from "./Index.vue";

window.Vue = require("vue");

Vue.use(VueRouter);

//Global components
// Vue.component(
//     "example-component",
//     require("./components/ExampleComponent.vue").default
// );
// Vue.component("example-2", require("./components/Example2.vue").default);

const app = new Vue({
    el: "#app",
    router,
    components: {
        index: Index,
    },
});
