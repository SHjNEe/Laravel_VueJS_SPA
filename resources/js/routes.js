import ExampleComponent from "./components/ExampleComponent.vue";
import Example2 from "./components/Example2.vue";
import VueRouter from "vue-router";
import Bookables from "./bookables/Bookables.vue";
import Bookable from "./bookable/Bookable.vue";

const routes = [
    { path: "/", component: Bookables, name: "home" },
    // { path: "/second", component: Example2, name: "second" },
    { path: "/bookables/:id", component: Bookable, name: "bookable" },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
