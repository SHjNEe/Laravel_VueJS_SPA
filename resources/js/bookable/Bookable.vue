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
            </div>
            <div class="col-md-4 pb-4">
                <availability></availability>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Loading....</p>
    </div>
</template>

<script>
import Availability from "./Availability.vue";
export default {
    components: {
        Availability,
    },
    data() {
        return {
            bookable: null,
            loading: true,
        };
    },
    created() {
        const bookableId = this.$route.params.id;
        axios.get(`/api/bookables/${bookableId}`).then((res) => {
            this.bookable = res.data.data;
            this.loading = false;
        });
    },
};
</script>

<style lang="scss" scoped></style>
