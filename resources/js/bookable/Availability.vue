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
                <div
                    class="invalid-feedback"
                    v-for="(error, index) in this.errorFor('from')"
                    :key="'from' + index"
                >
                    {{ error }}
                </div>
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
                <div
                    class="invalid-feedback"
                    v-for="(error, index) in this.errorFor('to')"
                    :key="'to' + index"
                >
                    {{ error }}
                </div>
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
export default {
    data() {
        return {
            from: null,
            to: null,
            loading: false,
            status: null,
            errors: null,
            avaiableBookings: null,
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
        },
    },
    methods: {
        check() {
            this.loading = true;
            axios
                .get(
                    `/api/bookables/${this.$route.params.id}/availability?from=${this.from}&to=${this.to}`
                )
                .then((response) => {
                    this.status = response.status;
                    this.avaiableBookings = response.data;
                })
                .catch((errors) => {
                    this.errors = errors.response.data.errors;
                    this.status = errors.response.status;
                })
                .then(() => {
                    this.loading = false;
                });
        },
        errorFor(fiel) {
            return this.hasError && this.errors[fiel]
                ? this.errors[fiel]
                : null;
        },
    },
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
