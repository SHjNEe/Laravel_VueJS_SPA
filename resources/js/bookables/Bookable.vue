<template>
    <div v-if="!loading">
        <div class="row">
            <div class="col-md-8">
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
            <div class="col-md-4">Availability & Prices</div>
        </div>
    </div>
    <div v-else>
        <p>Loading....</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookable: null,
            loading: true,
        };
    },
    created() {
        const bookableId = this.$route.params.id;
        axios.get(`/api/bookables/${bookableId}`).then((res) => {
            console.log(res);
            this.bookable = res.data.data;
            this.loading = false;
        });
    },
};
</script>

<style lang="scss" scoped></style>
