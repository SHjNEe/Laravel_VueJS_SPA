export default {
    data() {
        return {
            errors: null
        };
    },
    methods: {
        errorFor(fiel) {
            return this.errors && this.errors[fiel] ? this.errors[fiel] : null;
        }
    }
};
