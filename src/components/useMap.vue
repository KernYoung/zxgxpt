<template>
    <div>
        <div :id="main" style="width: 330px;height: 250px;background-color: #fff;text-align: center;margin:auto">
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'useMap',
        props: ['main', 'mapList'],
        data() {
            return {}
        },
        mounted() {
            this.drawPie()
        },
        methods: {
            /*安装雷达图*/
            drawPie() {
                var charts = echarts.init(document.getElementById(this.main))
                var option = {
                    title: {},
                    color: '#035aa6',
                    tooltip: {},//提示层
                    legend: {
                        data: ['name1']
                    },
                    radar: {
                        name: {
                            textStyle: {
                                color: '#333',
                            }
                        },
                        center: ['50%', '50%'],
                        radius: 100,
                        startAngle: 0,
                        splitNumber: 4,
                        shape: 'circle',
                        indicator: [{
                            name: '指标A',
                            max: 100
                        },
                        {
                            name: '指标B',
                            max: 100
                        },
                        {
                            name: '指标C',
                            max: 100
                        },
                        {
                            name: '指标D',
                            max: 100
                        },
                        {
                            name: '指标E',
                            max: 100
                        },
                        ],
                    },
                    series: [{
                        name: '',
                        type: 'radar',
                        data: [{
                            //value: [this.mapList.credit,this.mapList.brand_value,this.mapList.serviceability,this.mapList.communication_cost,this.mapList.word_of_mouth],
                            value: [60, 82, 77, 40, 55],

                            name: ''
                        }]
                    }]
                }
                charts.setOption(option);
            },
        }
    }
</script>

<style scoped>

</style>