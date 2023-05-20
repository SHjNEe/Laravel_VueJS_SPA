import { isLoggedIn, logOut } from "./shared/utils/auth";

export default {
    state: {
        lastSearch: {
            from: null,
            to: null,
        },
        basket: {
            items: [],
        },
        isLoggedIn: false,
        user: {},
    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload;
        },
        addToBasket(state, payload) {
            state.basket.items.push(payload);
        },
        removeFromBasket(state, payload) {
            state.basket.items = state.basket.items.filter(
                (item) => item.bookable.id !== payload
            );
        },
        clearBasket(state, payload) {
            state.basket = payload;
        },
        setBasket(state, payload) {
            state.basket = payload;
        },
        //Auth
        setUser(state, payload) {
            state.user = payload;
        },
        setLoggedIn(state, payload) {
            state.isLoggedIn = payload;
        },
    },
    actions: {
        setLastSearchActions(context, payload) {
            localStorage.setItem("lastSearch", JSON.stringify(payload));
            //Call muations
            context.commit("setLastSearch", payload);
        },
        loadStoredState(context) {
            const lastSearch = localStorage.getItem("lastSearch");
            if (lastSearch) {
                context.commit("setLastSearch", JSON.parse(lastSearch));
            }
            const basket = localStorage.getItem("basket");
            if (basket) {
                context.commit("setBasket", JSON.parse(basket));
            }
            context.commit("setLoggedIn", isLoggedIn());
        },
        addToBasket({ commit, state }, payload) {
            //context.state && context.commit
            commit("addToBasket", payload);
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        removeFromBasket({ commit, state }, payload) {
            commit("removeFromBasket", payload);
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        clearBasket({ commit, state }, payload) {
            commit("clearBasket", { items: [] });
            localStorage.removeItem("basket", JSON.stringify(state.basket));
        },
        //Auth
        async loadUser({ commit, dispatch }, payload) {
            if (isLoggedIn()) {
                try {
                    const user = (await axios.get("/user")).data;
                    commit("setUser", user);
                    commit("setLoggedIn", true);
                } catch (error) {
                    if (401 === error.response.status) {
                        dispatch("logout");
                    }
                }
            }
        },
        logout({ commit }) {
            commit("setUser", {});
            commit("setLoggedIn", false);
            logOut();
        },
    },
    getters: {
        itemsInBasket(state) {
            return state.basket.items.length;
        },
        inBasketAlready(state) {
            return function (id) {
                return state.basket.items.reduce((result, item) => {
                    return result || item.bookable.id === id;
                }, false);
            };
        },
    },
};
