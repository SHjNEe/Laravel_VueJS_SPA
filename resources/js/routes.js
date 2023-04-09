import ExampleComponent from "./components/ExampleComponent.vue";
import Example2 from "./components/Example2.vue";
import VueRouter from "vue-router";
import Bookables from "./bookables/Bookables.vue";

const routes = [
    { path: "/", component: Bookables, name: "home" },
    { path: "/second", component: Example2, name: "second" },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
