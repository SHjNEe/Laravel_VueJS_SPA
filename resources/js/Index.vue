<template>
    <div>
        <!-- <router-link to="/">Home</router-link>
        <router-link to="/second">Second</router-link> -->
        <nav class="navbar bg-white border-bottom navbar-light navbar-expand">
            <router-link class="navbar-brand mr-auto" :to="{ name: 'home' }"
                >Home</router-link
            >
            <ul class="navbar-nav">
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link class="nav-link" :to="{ name: 'basket' }">
                        Basket
                        <span
                            v-if="itemsInBasket"
                            class="badge badge-secondary"
                            >{{ itemsInBasket }}</span
                        >
                    </router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link class="nav-link" :to="{ name: 'register' }">
                        Register
                    </router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link class="nav-link" :to="{ name: 'login' }">
                        Sign In
                    </router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <a class="nav-link" href="#" @click.prevent="logout">
                        Log Out
                    </a>
                </li>
            </ul>

            <!-- {{ lastSearchComputed }} -->
        </nav>

        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
    data() {
        return {
            lastSearch: this.$store.state.lastSearch,
        };
    },
    computed: {
        ...mapState({
            lastSearchComputed: "lastSearch",
            isLoggedIn: "isLoggedIn",
            // lastSearchComputed: state => state.lastSearch
        }),
        ...mapGetters({
            itemsInBasket: "itemsInBasket",
        }),
    },
    methods: {
        async logout() {
            try {
                axios.post("/logout");
                this.$store.dispatch("logout");
            } catch (error) {}
        },
    },
};
</script>
<style>
a {
    text-decoration: none;
}
a.router-active {
    color: red;
}
</style>
