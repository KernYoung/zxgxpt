<template>
    <iframe class="prism-player" :src="pdfUrl" width="100%" height="100%"></iframe>
</template>

<script>
    export default {
        name: "pdfView",
        props: {
            url: {
                type: String,
                required: true
            }
        },
        mounted() {

        },
        created() {

        },
        data() {
            return {
                pdfUrl: this.url
            }
        },
        watch: {
            value(newVal) {
                this.pdfUrl = newVal
            }
        }
    }
</script>

<style scoped>

</style>