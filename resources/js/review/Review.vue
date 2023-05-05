<template>
    <div class="row" v-if="error">
        Unknow error has occurred, please try again later!
    </div>
    <div class="row" v-else>
        <div :class="[{ 'col-md-4': twoColumn }, { 'd-none': oneColumn }]">
            <div class="card">
                <div class="card-body">
                    <div v-if="loading">Loading...</div>
                    <div v-else>
                        <p>
                            Stayed at
                            <router-link
                                :to="{
                                    name: 'bookable',
                                    params: {
                                        id: booking.bookable.bookable_id
                                    }
                                }"
                                >Bookable</router-link
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
                        ></textarea>
                    </div>
                    <button
                        class="btn btn-lg btn-primary btn-block"
                        @click="check"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { is404 } from "./../shared/utils/response";
export default {
    data() {
        return {
            review: {
                rating: null,
                content: null
            },
            existingReview: null,
            booking: null,
            loading: false,
            error: false
        };
    },
    created() {
        this.loading = true;
        axios
            .get(`/api/reviews/${this.$route.params.id}`)
            .then(response => {
                this.existingReview = response.data.data;
            })
            .catch(error => {
                if (is404(error)) {
                    return axios
                        .get(`/api/booking-by-review/${this.$route.params.id}`)
                        .then(response => {
                            this.booking = response.data.data;
                        })
                        .catch(error => {
                            is404(error) ? {} : (this.error = true);
                        });
                }
                this.error = true;
            })
            .then(response => {
                this.loading = false;
            });
    },
    methods: {
        check() {
            console.log(this.review);
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
