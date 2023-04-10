<template>
    <div>
        Rows is: {{ rows }}
        <div v-if="!loading">
            <div v-for="row in rows" :key="'row' + row" class="row">
                <div
                    class="col"
                    v-for="(data, column) in datas.slice(
                        (row - 1) * columns,
                        rows * columns
                    )"
                    :key="'row' + row + column"
                >
                    <book-item
                        :item-title="data.title"
                        :item-content="data.description"
                        :price="5000"
                    >
                    </book-item>
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
    created() {
        console.log("Created");
        setTimeout(() => {
            this.datas = [
                {
                    id: 1,
                    title: "Cheap Villa",
                    description: "A very cheap villa",
                },
                {
                    id: 2,
                    title: "Cheap Villa 2",
                    description: "A very cheap villa 2",
                },
            ];
            this.loading = false;
        }, 2000);
    },
};
</script>
