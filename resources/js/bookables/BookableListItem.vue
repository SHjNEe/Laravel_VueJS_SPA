<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">{{ title }}</h1>
            <p class="card-text">{{ description }}</p>
            <router-link
                :to="{
                    name: 'bookable',
                    params: { id },
                    // query: { name: 'Trung' },
                }"
                >View details</router-link
            >
        </div>
    </div>
</template>

<script>
export default {
    // props: ["title", "description"],
    props: {
        title: String,
        description: String,
        id: String | Number,
    },
    methods: {},
    // beforeCreate() {
    //     console.log("Before create!");
    // },
    // computed: {
    //     itemDetailUrl() {
    //         return `/bookables/${this.id}`;
    //     },
    // },
    created() {
        console.log("Hello");
    },
    // beforeMount() {
    //     console.log("Before mount");
    // },
    mounted() {
        console.log("Mounted");
    },
    // beforeDestroy() {
    //     console.log("Before destroy!");
    // },
    // destroyed() {
    //     console.log("Destroy!");
    // },
};
</script>
