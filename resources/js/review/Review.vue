<template>
    <fatal-error v-if="error"></fatal-error>
    <div class="row" v-else>
        <div :class="[{ 'col-md-4': twoColumn }, { 'd-none': oneColumn }]">
            <div class="card">
                <div class="card-body">
                    <div v-if="loading">Loading...</div>
                    <div v-if="hasBooking">
                        <p>
                            Stayed at
                            <router-link
                                :to="{
                                    name: 'bookable',
                                    params: {
                                        id: booking.bookable.bookable_id
                                    }
                                }"
                                >{{ booking.bookable.title }}</router-link
                            >
                        </p>
                        <p>From {{ booking.from }} to {{ booking.to }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div :class="[{ 'col-md-8': twoColumn }, { 'col-md-12': oneColumn }]">
            <div v-if="loading">
                <p>Loading....</p>
            </div>
            <div v-else>
                <div v-if="alreadyReview">
                    <h3>You've already left a review for this booking</h3>
                </div>
                <div v-else>
                    <div class="form-group">
                        <label for="" class="text-muted"
                            >Select the star rating 1 - 5 is best</label
                        >
                        <!-- <star-rating
                :value="review.rating"
                class="fa-3x"
                @input="review.rating = $event"
            ></star-rating> -->
                        <star-rating
                            class="fa-3x"
                            v-model="review.rating"
                        ></star-rating>
                    </div>
                    <div class="form-group">
                        <label for="content" class="text-muted"
                            >Describe your expirience</label
                        >
                        <textarea
                            name="content"
                            cols="30"
                            rows="10"
                            class="form-control"
                            v-model="review.content"
                            :class="[{ 'is-invalid': errorFor('content') }]"
                        ></textarea>
                        <validation-error
                            :errors="errorFor('content')"
                        ></validation-error>
                        <!-- <div>
                            <div
                                class="invalid-feedback"
                                v-for="(error, index) in errorFor('content')"
                                :key="'to' + index"
                            >
                                {{ error }}
                            </div>
                        </div> -->
                    </div>
                    <button
                        class="btn btn-lg btn-primary btn-block"
                        @click.prevent="submit"
                        :disabled="sending"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { is404, is422 } from "./../shared/utils/response";
export default {
    data() {
        return {
            review: {
                id: null,
                rating: null,
                content: null
            },
            existingReview: null,
            booking: null,
            loading: false,
            error: false,
            errors: null,
            sending: false
        };
    },
    created() {
        this.loading = true;
        this.review.id = this.$route.params.id;
        axios
            .get(`/api/review/${this.review.id}`)
            .then(response => {
                this.existingReview = response.data.data;
            })
            .catch(error => {
                if (is404(error)) {
                    console.log("response");

                    return axios
                        .get(`/api/booking-by-review/${this.review.id}`)
                        .then(response => {
                            this.booking = response.data.data;
                        })
                        .catch(error => {
                            this.error = !is404(error);
                        });
                }
                this.error = true;
            })
            .then(response => {
                this.loading = false;
            });
    },
    methods: {
        submit() {
            this.errors = null;
            this.sending = true;
            axios
                .post(`/api/review`, this.review)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    if (is422(error)) {
                        const errors = error.response.data.errors;
                        if (errors["content"] && 1 == _.size(errors)) {
                            this.errors = errors;
                            return;
                        }
                    }
                    // this.error = true;
                })
                .then(() => {
                    this.sending = false;
                });
        },
        errorFor(fiel) {
            return this.errors && this.errors[fiel] ? this.errors[fiel] : null;
        }
    },
    computed: {
        alreadyReview() {
            return this.hasReview || !this.booking;
        },
        hasReview() {
            return this.existingReview !== null;
        },
        hasBooking() {
            return this.booking !== null;
        },
        oneColumn() {
            return !this.loading && this.alreadyReview;
        },
        twoColumn() {
            return this.loading || !this.alreadyReview;
        }
    }
};
</script>
