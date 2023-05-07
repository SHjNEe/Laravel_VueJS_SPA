<template>
    <div class="text-center success">
        <i class="far fa-thumbs-up"></i>
        <h1 class="mt-4">
            <slot name="title">
                Success !
            </slot>
        </h1>
        <h2>
            <!-- The Operation was successful! -->
            <slot> </slot>
        </h2>
    </div>
</template>

<style scoped>
.success {
    color: #999;
    font-size: 10rem;
}
</style>
