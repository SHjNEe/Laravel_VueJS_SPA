<template>
    <div>
        <div class="form-group">
            <label for="" class="text-muted"
                >Select the star rating - 5 is best</label
            >
            <star-rating :rating="5" class="fa-3x"></star-rating>
        </div>
        <div class="form-group">
            <label for="content" class="text-muted"
                >Describe your expirience</label
            >
            <textarea
                name="content"
                cols="30"
                rows="10"
                class="form-control"
            ></textarea>
        </div>
        <button class="btn btn-lg btn-primary btn-block" @click="check">
            Submit
        </button>
    </div>
</template>

<script>
export default {

    methods: {
        check() {

        } 
    }
 }


</script>