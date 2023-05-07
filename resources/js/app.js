require("./bootstrap");
import VueRouter from "vue-router";
import router from "./routes";
import Index from "./Index.vue";
import moment from "moment";
import StarRating from "./shared/components/StarRating.vue";
import FatalError from "./shared/components/FatalError.vue";
import ValidationErros from "./shared/components/ValidationErros.vue";
import Success from "./shared/components/Success.vue";
window.Vue = require("vue");

// Vue.component(
//     "example-component",
//     require("./components/ExampleComponent.vue").default
// );
Vue.use(VueRouter);
Vue.filter("fromNow", function(value) {
    return moment(value).fromNow();
});
Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("validation-error", ValidationErros);
Vue.component("v-success", Success);
const app = new Vue({
    el: "#app",
    router,
    components: {
        index: Index
    }
});
