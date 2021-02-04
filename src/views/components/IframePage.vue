<template>
    <div class="iframePage">
        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
		<div style="height: calc(100% - 50px);min-height: 800px;">
			 <iframe :src="srcUrl" width="100%" height="100%" frameborder="0" scrolling="yes" marginwidth="0" marginheight="5"></iframe>
		</div>
       
    </div>
</template>
<script>
    export default {
        name: "IframePage",
        props: {
            url: {
                type: String,
                required: false
            }
        },
        data(){
            return{
                title:decodeURIComponent(this.$route.query.title),
                srcUrl:this.url||decodeURIComponent(this.$route.query.url)
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {

        }
    }
</script>

<style scoped>
.iframePage{
    width: 100%;
    min-width: 1300px;
    height: 100%;
    margin: auto;
    padding: 20px 5%;
    box-sizing: border-box;
    overflow: auto;
}
.breadcrumb{
    padding-bottom: 10px;
}
</style>