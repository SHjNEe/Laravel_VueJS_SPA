<template>
    <div>
        <v-success v-if="success">
            <template v-slot:title>
                <h1>Successfully !!</h1>
            </template>
            Congratulations on your purchase !
        </v-success>

        <div class="row" v-else>
            <div class="col-md-8" v-if="itemsInBasket">
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="first_name">First Name</label>
                        <input
                            type="text"
                            class="form-control"
                            name="first_name"
                            v-model="customer.first_name"
                            placeholder=""
                            :class="[
                                {
                                    'is-invalid': this.errorFor(
                                        'customer.first_name'
                                    ),
                                },
                            ]"
                        />
                        <validation-error
                            :errors="errorFor('customer.first_name')"
                        ></validation-error>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="last_name">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            class="form-control"
                            placeholder=""
                            v-model="customer.last_name"
                            :class="[
                                {
                                    'is-invalid':
                                        this.errorFor('customer.last_name'),
                                },
                            ]"
                        />
                        <validation-error
                            :errors="errorFor('customer.last_name')"
                        ></validation-error>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 form-group">
                        <label for="email">Email</label>
                        <input
                            name="email"
                            type="email"
                            class="form-control"
                            placeholder=""
                            v-model="customer.email"
                            :class="[
                                {
                                    'is-invalid':
                                        this.errorFor('customer.email'),
                                },
                            ]"
                        />
                        <validation-error
                            :errors="errorFor('customer.email')"
                        ></validation-error>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="street">Street</label>
                        <input
                            name="street"
                            type="text"
                            class="form-control"
                            placeholder=""
                            v-model="customer.street"
                            :class="[
                                {
                                    'is-invalid':
                                        this.errorFor('customer.street'),
                                },
                            ]"
                        />
                        <validation-error
                            :errors="errorFor('customer.street')"
                        ></validation-error>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="city">City</label>
                        <input
                            name="city"
                            type="text"
                            class="form-control"
                            placeholder=""
                            v-model="customer.city"
                            :class="[
                                {
                                    'is-invalid':
                                        this.errorFor('customer.city'),
                                },
                            ]"
                        />
                        <validation-error
                            :errors="errorFor('customer.city')"
                        ></validation-error>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="country">Country</label>
                        <input
                            name="country"
                            type="text"
                            class="form-control"
                            placeholder=""
                            v-model="customer.country"
                            :class="[
                                {
                                    'is-invalid':
                                        this.errorFor('customer.country'),
                                },
                            ]"
                        />
                        <validation-error
                            :errors="errorFor('customer.country')"
                        ></validation-error>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="state">State</label>
                        <input
                            name="state"
                            type="text"
                            class="form-control"
                            placeholder=""
                            v-model="customer.state"
                            :class="[
                                {
                                    'is-invalid':
                                        this.errorFor('customer.state'),
                                },
                            ]"
                        />
                        <validation-error
                            :errors="errorFor('customer.state')"
                        ></validation-error>
                    </div>
                    <div class="col-md-2 form-group">
                        <label for="zip">Zip code</label>
                        <input
                            name="zip"
                            type="text"
                            class="form-control"
                            placeholder=""
                            v-model="customer.zip"
                            :class="[
                                {
                                    'is-invalid': this.errorFor('customer.zip'),
                                },
                            ]"
                        />
                        <validation-error
                            :errors="errorFor('customer.zip')"
                        ></validation-error>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-md-12 form-group">
                        <button
                            type="submit"
                            class="btn btn-lg btn-primary btn-block"
                            @click.prevent="book"
                            :disabled="loading"
                        >
                            Book now
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-8" v-else>
                <div class="jumbotron jumbotron-fluild text-center">
                    <h1>Empty!</h1>
                </div>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6
                        class="text-uppercase text-secondary font-weight-bolder"
                    >
                        Your Cart
                    </h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">
                            Items: {{ itemsInBasket }}
                        </span>
                        <span v-else> Empty </span>
                    </h6>
                </div>
                <transition-group name="fade" tag="div">
                    <div v-for="item in basket" :key="item.bookable.id">
                        <div
                            class="pt-2 pb-2 border-top d-flex justify-content-between"
                        >
                            <span>
                                <router-link
                                    :to="{
                                        name: 'bookable',
                                        params: { id: item.bookable.id },
                                    }"
                                >
                                    {{ item.bookable.title }}</router-link
                                >
                            </span>
                            <span class="font-weight-bold"
                                >${{ item.price.total }}</span
                            >
                        </div>
                        <div class="pt-2 pb-2 d-flex justify-content-between">
                            <span>From: {{ item.dates.from }}</span>
                            <span>To: {{ item.dates.to }}</span>
                        </div>
                        <div class="pt-2 pb-2 text-right">
                            <button
                                class="btn btn-sm btn-outline-secondary"
                                @click="
                                    $store.dispatch(
                                        'removeFromBasket',
                                        item.bookable.id
                                    )
                                "
                            >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import validationErrors from "../shared/mixins/validationErrors";
import Axios from "axios";
export default {
    mixins: [validationErrors],
    data() {
        return {
            loading: false,
            bookingAttempted: false,
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                street: null,
                city: null,
                country: null,
                state: null,
                zip: null,
            },
        };
    },
    computed: {
        ...mapGetters(["itemsInBasket"]),
        ...mapState({
            basket: (state) => state.basket.items,
        }),
        success() {
            return (
                !this.loading &&
                0 === this.itemsInBasket &&
                this.bookingAttempted
            );
        },
    },
    methods: {
        async book() {
            this.loading = true;
            this.bookingAttempted = false;
            this.errors = null;
            try {
                await Axios.post("/api/checkout", {
                    customer: this.customer,
                    bookings: this.basket.map((item) => {
                        return {
                            bookable_id: item.bookable.id,
                            from: item.dates.from,
                            to: item.dates.to,
                        };
                    }),
                });
                this.$store.dispatch("clearBasket");
            } catch (error) {
                this.errors = error.response && error.response.data.errors;
            }
            this.loading = false;
            this.bookingAttempted = true;
        },
    },
};
</script>

<style scoped>
h6.badge {
    font-size: 100%;
}
a {
    color: black;
}
</style>
