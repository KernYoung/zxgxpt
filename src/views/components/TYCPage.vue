<!-- 天眼查 -->
<template>
    <div class="TYCPage">
        <iframe :src="url" width="100%" frameborder="0" marginwidth="0" marginheight="5"></iframe>
    </div>
</template>
<script>
export default {
    props: {
        target: {
            type: String,
            required: false
        }
    },
    data () {
        return {
            url:this.target
        }
    },
    mounted () {

    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
.TYCPage {
    width: 100%;
    min-width: 1300px;
    height: 100%;
    min-height: 630px;
    margin: auto;
    padding: 20px 5%;
    box-sizing: border-box;
    overflow: auto;
}
</style>