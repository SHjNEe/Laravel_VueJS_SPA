<template>
    <div v-if="!loading">
        <div class="row">
            <div class="col-md-8 pb-4">
                <div class="card">
                    <div class="card-body">
                        <h2>{{ bookable.title }}</h2>
                        <hr />
                        <article>
                            {{ bookable.description }}
                        </article>
                    </div>
                </div>
                <review-list :bookable-id="this.id"></review-list>
            </div>
            <div class="col-md-4 pb-4">
                <availability
                    class="mb-4"
                    @availability="checkPrice($event)"
                ></availability>
                <transition name="fade">
                    <price-breakdown
                        class="mb-4"
                        v-if="price"
                        :price="price"
                    ></price-breakdown>
                </transition>
                <transition name="fade">
                    <button
                        class="btn btn-outline-secondary btn-block"
                        v-if="price"
                        @click="addToBasket"
                        :disabled="inBasketAlreadyFromGetter"
                    >
                        Book now
                    </button>
                </transition>
                <transition name="fade">
                    <button
                        v-if="inBasketAlreadyFromGetter"
                        class="btn btn-outline-secondary btn-block"
                        @click="removeFromBasket"
                    >
                        Remove
                    </button>
                </transition>
                <div
                    v-if="inBasketAlreadyFromGetter"
                    class="mt-4 text-muted warning"
                >
                    Seems like you 've added this object to basket already'
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Loading....</p>
    </div>
</template>

<script>
import Availability from "./Availability.vue";
import ReviewList from "./ReviewList.vue";
import PriceBreakdown from "./PriceBreakdown.vue";
import { mapState } from "vuex";
export default {
    props: {
        id: String | Number,
    },
    components: {
        Availability,
        ReviewList,
        PriceBreakdown,
    },
    data() {
        return {
            bookable: null,
            loading: true,
            price: null,
        };
    },
    created() {
        axios.get(`/api/bookables/${this.id}`).then((res) => {
            this.bookable = res.data.data;
            this.loading = false;
        });
    },
    computed: {
        ...mapState({
            lastSearch: "lastSearch",
            // inBasketAlready(state) {
            //     return state.basket.items.reduce((result, item) => {
            //         return result || item.bookable.id === this.bookable.id;
            //     }, false);
            // },
        }),
        inBasketAlreadyFromGetter() {
            if (null === this.bookable) {
                return false;
            }
            return this.$store.getters.inBasketAlready(this.bookable.id);
        },
        // from() {
        //     return this.lastSearch.from;
        // },
        // to() {
        //     return this.lastSearch.to;
        // },
    },
    methods: {
        async checkPrice(hasAvailability) {
            if (!hasAvailability) {
                this.price = null;
                return;
            }
            try {
                this.price = (
                    await axios.get(
                        `/api/bookables/${this.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`
                    )
                ).data.data;
            } catch (err) {
                this.price = null;
            }
        },
        addToBasket() {
            this.$store.dispatch("addToBasket", {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch,
            });
        },
        removeFromBasket() {
            this.$store.dispatch("removeFromBasket", this.bookable.id);
        },
    },
};
</script>

<style scoped>
.warning {
    font-size: 0.7rem;
}
</style>
