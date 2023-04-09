<template>
    <div>
        <book-item title="Trung" description="Hello" :price="5000"></book-item>
    </div>
</template>
<script>
import BookableListItem from "./BookableListItem.vue";

export default {
    components: {
        BookItem: BookableListItem,
    },
};
</script>
