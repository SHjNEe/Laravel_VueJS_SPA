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
                    >
                        Book now
                    </button>
                </transition>
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
        }),
        from() {
            return this.lastSearch.from;
        },
        to() {
            return this.lastSearch.to;
        },
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
                        `/api/bookables/${this.id}/price?from=${this.from}&to=${this.to}`
                    )
                ).data.data;
            } catch (err) {
                this.price = nu;
            }
        },
        addToBasket() {
            this.$store.commit("addToBasket", {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch,
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
