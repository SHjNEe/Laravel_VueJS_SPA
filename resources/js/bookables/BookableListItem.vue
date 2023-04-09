<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <p>{{ price }}</p>
    </div>
</template>

<script>
export default {
    // props: ["title", "description"],
    props: {
        title: String,
        description: String,
        price: Number,
    },
};
</script>
