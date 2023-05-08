<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Availability
        </h6>
        <span v-if="noAvailability" class="text-danger">NOT AVAILABLE</span>
        <span v-if="hasAvailability" class="text-success"> AVAILABLE</span>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input
                    type="text"
                    name="from"
                    id="from"
                    class="form-control form-control-sm"
                    placeholder="Start date"
                    v-model="from"
                    :class="[{ 'is-invalid': this.errorFor('from') }]"
                />
                <validation-error :errors="errorFor('from')"></validation-error>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                    type="text"
                    name="to"
                    id="to"
                    class="form-control form-control-sm"
                    placeholder="End date"
                    v-model="to"
                    :class="[{ 'is-invalid': this.errorFor('to') }]"
                />
                <validation-error :errors="errorFor('to')"></validation-error>
            </div>
            <p v-if="loading">Loading....</p>
            <button
                @click="check"
                class="btn btn-secondary btn-block"
                :disabled="loading"
            >
                Check!
            </button>
        </div>
    </div>
</template>

<script>
import { is404, is422 } from "./../shared/utils/response";
import errorsMixin from "../shared/mixins/validationErrors.js";

export default {
    // mixins: [errorsMixin],
    props: {
        bookableId: [String, Number]
    },
    data() {
        return {
            from: this.$store.state.lastSearch.from || null,
            to: this.$store.state.lastSearch.to || null,
            loading: false,
            status: null,
            avaiableBookings: null,
            errors: null
        };
    },
    computed: {
        hasError() {
            return 422 === this.status && this.errors !== null;
        },
        hasAvailability() {
            return 200 === this.status;
        },
        noAvailability() {
            return 404 === this.status;
        }
    },
    methods: {
        async check() {
            this.loading = true;

            //Call mutations
            // this.$store.commit("setLastSearch", {
            //     from: this.from,
            //     to: this.to
            // });

            //Call Action
            this.$store.dispatch("setLastSearchActions", {
                from: this.from,
                to: this.to
            });

            // console.log(this.$store.state);
            // try {
            //     const result = await axios.get(
            //         `/api/bookables/${
            //             this.$route.params.id
            //         }/availability?from=${this.from}&to=${this.to}`
            //     );
            //     this.status = result.status;
            //     this.avaiableBookings = result.data;
            // } catch (err) {
            //     if (is422(err)) {
            //         this.errors = err.response.data.errors;
            //     }
            //     this.status = err.response.status;
            // }
            this.loading = false;
        },
        errorFor(fiel) {
            return this.errors && this.errors[fiel] ? this.errors[fiel] : null;
        }
    }
};
</script>

<style scoped>
label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: gray;
    font-weight: bold;
}
.is-invalid {
    border-color: red;
}
</style>
