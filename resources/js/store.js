export default {
    state: {
        lastSearch: {
            from: null,
            to: null,
        },
        basket: {
            items: [],
        },
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
