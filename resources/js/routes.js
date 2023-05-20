import ExampleComponent from "./components/ExampleComponent.vue";
import Example2 from "./components/Example2.vue";
import VueRouter from "vue-router";
import Bookables from "./bookables/Bookables.vue";
import Bookable from "./bookable/Bookable.vue";
import Review from "./review/Review.vue";
import Basket from "./basket/Basket.vue";
// import Login from "./auth/Login.vue";

const routes = [
    { path: "/", component: Bookables, name: "home" },
    { path: "/second", component: Example2, name: "second" },
    {
        path: "/bookables/:id",
        component: Bookable,
        name: "bookable",
        props: true,
    },
    { path: "/review/:id", component: Review, name: "review" },
    { path: "/basket", component: Basket, name: "basket" },
    {
        path: "/auth/login",
        component: require("./auth/Login").default,
        name: "login",
    },
    {
        path: "/auth/register",
        component: require("./auth/Register").default,
        name: "register",
    },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
