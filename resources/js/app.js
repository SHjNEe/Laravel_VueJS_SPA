require("./bootstrap");
import VueRouter from "vue-router";
import router from "./routes";
import Index from "./Index.vue";
import moment from "moment";
import StarRating from "./shared/components/StarRating.vue";
window.Vue = require("vue");

// Vue.component(
//     "example-component",
//     require("./components/ExampleComponent.vue").default
// );
Vue.use(VueRouter);
Vue.filter("fromNow", function (value) {
    return moment(value).fromNow();
});
Vue.component("star-rating", StarRating);
const app = new Vue({
    el: "#app",
    router,
    components: {
        index: Index,
    },
});
