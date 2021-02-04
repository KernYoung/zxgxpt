<template>
    <div id="app">
        <router-view v-if="isRouterAlive" />
    </div>
</template>
<script>
    export default {
        name: 'App',
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                isRouterAlive: true,
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function () {
                    this.isRouterAlive = true
                });
            },
        },

    }
</script>
<style lang="less">
    *,
    body,
    html {
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, MicrosoftYaHei, MicrosoftYaHei-Bold, Arial-BoldMT,
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
    }

    body,
    html {
        height: 100%;
        width: 100%;
        font-size: 16px;
        background-color: #efefef;
        color: #333333
    }

    #app {
        height: 100%;
        width: 100%;
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: #bbb;
        border-radius: 4px;
    }

    /* .el-dialog__header {
        padding: 0 20px 10px !important;
    } */
</style>