export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        }
    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload;
        }
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
        }
    }
    // getters: {
    //     lastSearch(state) {
    //         return state.lastSearch;
    //     }
    // }
};
