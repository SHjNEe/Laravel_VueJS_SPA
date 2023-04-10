<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">{{ itemTitle }}</h1>
            <p class="card-text">{{ itemContent }}</p>
            <p>{{ price }}</p>
        </div>
    </div>
</template>

<script>
export default {
    // props: ["title", "description"],
    props: {
        itemTitle: String,
        itemContent: String,
        price: Number,
    },
    methods: {},
    // beforeCreate() {
    //     console.log("Before create!");
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
