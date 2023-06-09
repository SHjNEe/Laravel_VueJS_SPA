require("./bootstrap");
import VueRouter from "vue-router";
import router from "./routes";
import Index from "./Index.vue";
import moment from "moment";
import StarRating from "./shared/components/StarRating.vue";
import FatalError from "./shared/components/FatalError.vue";
import ValidationErros from "./shared/components/ValidationErros.vue";
import Success from "./shared/components/Success.vue";
import Vuex from "vuex";
import storeDefinitions from "./store";
import { error } from "jquery";
window.Vue = require("vue");

// Vue.component(
//     "example-component",
//     require("./components/ExampleComponent.vue").default
// );
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.filter("fromNow", function (value) {
    return moment(value).fromNow();
});
Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("validation-error", ValidationErros);
Vue.component("v-success", Success);

const store = new Vuex.Store(storeDefinitions);
window.axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (401 === error.response.status) {
            store.dispatch("logout");
        }

        return Promise.reject(error);
    }
);
const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        index: Index,
    },
    //Get data form localstorage before create app
    async beforeCreate() {
        this.$store.dispatch("loadStoredState");
        this.$store.dispatch("loadUser");

        // await axios.get("/sanctum/csrf-cookie");
        // await axios.post("/login", {
        //     email: "ari85@example.com",
        //     password: "password",
        // });
        // await axios.get("/user");
    },
});
