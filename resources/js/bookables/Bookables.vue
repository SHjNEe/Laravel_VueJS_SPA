<template>
    <div>
        Rows is: {{ rows }}
        <div v-if="!loading">
            <div v-for="row in rows" :key="'row' + row" class="row mb-4">
                <div
                    class="col d-flex align-items-stretch"
                    v-for="(data, column) in datas.slice(
                        (row - 1) * columns,
                        rows * columns
                    )"
                    :key="'row' + row + column"
                >
                    <book-item v-bind="data"> </book-item>
                </div>
            </div>
        </div>
        <div v-else>Data is loading...</div>
    </div>
</template>
<script>
import BookableListItem from "./BookableListItem.vue";

export default {
    data() {
        return {
            datas: null,
            loading: true,
            columns: 3,
        };
    },
    components: {
        BookItem: BookableListItem,
    },
    computed: {
        rows() {
            return this.datas === null ? 0 : Math.ceil(this.columns);
        },
    },
    // async created() {
    //     const request = await axios.get("/api/bookables");
    //     this.loading = false;
    //     return (this.datas = request.data);
    // },
    created() {
        const request = axios.get("/api/bookables").then((res) => {
            this.datas = res.data;
            this.loading = false;
        });
    },
};
</script>
