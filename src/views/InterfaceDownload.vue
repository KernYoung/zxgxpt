<template>
    <div class="interfaceDownload" style="height:150%">
        <div style="margin-bottom: 15px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>接口下发服务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <pre style="font-size: 16px">
一、基本说明：
1.网络申请：
资信库测试IP端口为10.0.132.12:9292，需得到集团运维中心网络授权许可。
2.测试授权：
tokenid（各公司单独分配）及token（统一秘钥）需向集团资信门户管理员（信息中心-黎婷）申请授权使用，申请时需说明申请接口类型（如：数据下发、页面调用、模糊查询等）
及测试周期，便于授权管理及统计。
3.生产授权：
待测试环境测试完成后可统一向集团申请正式环境授权，不同成员公司将提供不同token。
4.费用说明：
由于接口需要和第三方接口交互，因此测试环境接口也会调用第三方正式接口产生费用（如天眼查工商信息），请测试过程以测通功能为主，勿批量使用或投产。

二、接口文档：
        </pre>
<!--        <el-table :data="tableData" height="500" border stripe="true" style="width: 100%" :row-style="{height:'20px'}"-->
<!--                  :cell-style="{padding:'0px'}">-->
<!--      <el-table :data="tableData" height="545" border stripe="true" style="width: 100%" :row-style="{height:'20px'}"-->
      <el-table :data="tableData" height="60%" border stripe="true" style="width: 100%" :row-style="{height:'20px'}"
                :cell-style="{padding:'8px'}">
          <el-table-column
              prop="name"
              label="接口名称"
              width="250">
          </el-table-column>

          <el-table-column
              prop="type"
              label="接口类型"
              width="100">
          </el-table-column>

          <el-table-column
              prop="SPEC"
              label="接口说明"
              width="600">
          </el-table-column>

          <el-table-column
              prop="dataSource"
              label="数据来源">
          </el-table-column>

          <el-table-column label="下载入口" align="center" min-width="50">
        　　　　<template slot-scope="scope">
<!--        　　　　　　<el-button type="text" @click="downloadInterface('/Users/yangwenqiang/Documents/' + scope.row.fileName)">下载</el-button>-->
<!--    　　　　　　    <el-button type="text" @click="downloadInterface('/home/ftpuser/' + scope.row.fileName)">下载</el-button>-->
    　　　　　　    <el-button size="mini" type="primary" @click="downloadInterface('/home/ftpuser/' + scope.row.fileName)" plain>下载</el-button>
        　　　　</template>
        　　</el-table-column>
        </el-table>

        <pre style="font-size: 16px">

三、联系方式：
如有疑问，请成员公司子管理员联系集团信息中心黎婷进行咨询沟通。
        </pre>
      </div>
</template>
<script>

import JsonView from "../components/jsonView";

export default{
  name: "zxbReportList",
  components: {
    JsonView,
  },
  data () {
    return {
      tableData: [{
        name: '工商信息接口',
        type: '主动请求',
        SPEC: '主动获取客商工商信息',
        dataSource: '天眼查',
        fileName: '1.工商信息.rar',
      },{
        name: '工商信息接口(无需反转义)',
        type: '主动请求',
        SPEC: '主动获取客商工商信息',
        dataSource: '天眼查',
        fileName: '15.工商信息接口(无需反转义).rar',

      },{
        name: '企业基本信息接口',
        type: '主动请求',
        SPEC: '主动获取客商企业基本信息',
        dataSource: '天眼查',
        fileName: '2.企业基本信息.rar',
      },{
        name: '企业基本信息接口(无需反转义)',
        type: '主动请求',
        SPEC: '主动获取客商企业基本信息',
        dataSource: '天眼查',
        fileName: '16.企业基本信息接口(无需反转义).rar',
      }, {
        name: '司法风险接口',
        type: '主动请求',
        SPEC: '主动获取客商司法风险信息',
        dataSource: '天眼查',
        fileName: '3.司法风险接口.rar',
      }, {
        name: "司法风险接口(无需反转义)",
        type: "主动请求",
        SPEC: "主动获取客商司法风险信息",
        dataSource: "天眼查",
        fileName:"18.司法风险接口(无需反转义).rar"
      }, {
        name: '联系信息接口',
        type: '主动请求',
        SPEC: '主动获取客商联系信息',
        dataSource: '天眼查',
        fileName: '4.联系信息.rar',
      },{
        name: '联系信息接口(无需反转义)',
        type: '主动请求',
        SPEC: '主动获取客商联系信息',
        dataSource: '天眼查',
        fileName: '17.联系信息接口(无需反转义).rar',
      }, {
        name: "法律诉讼接口",
        type: "主动请求",
        SPEC: "主动获取法律诉讼接口信息",
        dataSource: "天眼查",
        fileName:"19.法律诉讼接口.rar"
      }, {
        name: "历史法律诉讼接口",
        type: "主动请求",
        SPEC: "主动获取历史法律诉讼接口信息",
        dataSource: "天眼查",
        fileName:"20.历史法律诉讼接口.rar"
      }, {
        name: "欠税公告接口",
        type: "主动请求",
        SPEC: "主动获取欠税公告接口信息",
        dataSource: "天眼查",
        fileName:"21.欠税公告接口.rar"
      }, {
        name: "税务评级接口",
        type: "主动请求",
        SPEC: "主动获取税务评级接口信息",
        dataSource: "天眼查",
        fileName:"22.税务评级接口.rar"
      }, {
        name: "行政处罚接口",
        type: "主动请求",
        SPEC: "主动获取行政处罚接口信息",
        dataSource: "天眼查",
        fileName:"23.行政处罚接口.rar"
      }, {
        name: "专利信息接口",
        type: "主动请求",
        SPEC: "主动获取专利接口信息",
        dataSource: "天眼查",
        fileName:"24.patentsU.rar"
      }, {
        name: '模糊查询接口',
        type: '主动请求',
        SPEC: '主动获取关键字查询后的模糊检索结果',
        dataSource: '天眼查',
        fileName: '5.模糊查询.rar',
      }, {
        name: '中诚信报告接口',
        type: '主动请求',
        SPEC: '主动获取中诚信提供的资信报告，共五类，均为HTML格式。',
        dataSource: '中诚信',
        fileName: '6.中诚信HTML页面.rar',
      }, {
        name: "门户平台页面接口",
        type: "主动请求",
        SPEC: "主动获取资信门户平台页面",
        dataSource: "资信库",
        fileName:"7.门户平台页面接口.rar"
      },
        {
          name: "天眼查页面接口",
          type: "主动请求",
          SPEC: "主动获取天眼查网址嵌入页面",
          dataSource: "天眼查",
          fileName:"8.天眼查页面接口.rar"
        },
        {
          name: "关注接口",
          type: "主动请求",
          SPEC: "调用后触发门户的客商关注功能",
          dataSource: "资信库",
          fileName:"9.关注接口.rar"
        },
        {
          name: "消息推送接口-天眼查",
          type: "被动获取",
          SPEC: "需成员公司提供回调接口，资信库调用回调接口推送天眼查实时预警",
          dataSource: "天眼查",
          fileName:"10.消息推送接口-天眼查.rar"
        },
        {
          name: "消息推送接口-中诚信",
          type: "被动获取",
          SPEC: "需成员公司提供回调接口，资信库调用回调接口推送中诚信风险早报及新闻早报",
          dataSource: "中诚信",
          fileName:"11.消息推送接口-中诚信.rar"
        },
        {
          name: "信保PDF下载接口",
          type: "主动请求",
          SPEC: "主动获取已有报告的PDF下载链接",
          dataSource: "中信保",
          fileName:"12.信保PDF下载接口.rar"
        },
        {
          name: "信保报告信息申请接口",
          type: "主动请求",
          SPEC: "主动申请信保报告（免门户审核）",
          dataSource: "中信保",
          fileName:"13.信保报告信息申请接口.rar"
        }, {
          name: "信保摘要页面获取接口",
          type: "主动请求",
          SPEC: "主动获取门户信保摘要页面",
          dataSource: "中信保",
          fileName:"14.信保摘要页面获取接口.rar"
        }

      ]
    }
  },
  methods:{
    downloadInterface(fileName){
      let param = {
        fileName:fileName
      }
      this.$ajax.manage.downloadDocument(param).then(res => {
        console.log(param.fileName.split("/"));
        const content = res.data
        const blob = new Blob([content])
        console.log(res.data)
        const fileName = param.fileName.split("/")[param.fileName.split("/").length - 1];
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          console.log(elink.href);
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
  }
}
</script>
<style>
</style>

<!--<template>-->
<!--    <div class="interfaceDownload">-->
<!--      <div style="margin-bottom: 16px;">-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--          <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>-->
<!--          <el-breadcrumb-item>接口下发服务</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
<!--      </div>-->

<!--  <div>-->
<!--        <pre style="font-size: 16px">-->
<!--            一、基本说明：-->
<!--            1.网络申请：-->
<!--            资信库测试IP端口为10.0.132.12:9292，需得到集团运维中心网络授权许可。-->
<!--            2.测试授权：-->
<!--            tokenid（各公司单独分配）及token（统一秘钥）需向集团资信门户管理员（信息中心-陈昊）申请授权使用，申请时需说明申请接口类型（如：数据下发、页面调用、模糊查询等）及测试周期，便于授权管理及统计。-->
<!--            3.生产授权：-->
<!--            待测试环境测试完成后可统一向集团申请正式环境授权，不同成员公司将提供不同token。-->
<!--            4.费用说明：-->
<!--            由于接口需要和第三方接口交互，因此测试环境接口也会调用第三方正式接口产生费用（如天眼查工商信息），请测试过程以测通功能为主，勿批量使用或投产。-->

<!--    <div style="margin-bottom: 16px;">-->
<!--      <el-table-->
<!--          :data="tableData"-->
<!--          height="300"-->
<!--          border-->
<!--          stripe="true"-->
<!--          style="width: 80%">-->
<!--        <el-table-column-->
<!--            prop="name"-->
<!--            label="接口名称"-->
<!--            width="100">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="type"-->
<!--            label="接口类型"-->
<!--            width="100">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="SPEC"-->
<!--            label="接口说明"-->
<!--            width="500">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="dataSource"-->
<!--            label="数据来源"-->
<!--            width="100">-->
<!--        </el-table-column>-->
<!--          <el-table-column label="下载入口" align="center" min-width="100">-->
<!--        　　　　<template slot-scope="scope">-->
<!--        　　　　　　<el-button type="text" @click="downloadInterface('/home/ftpuser/' + scope.row.fileName)">下载</el-button>-->
<!--        　　　　</template>-->
<!--        　　</el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->
<!--                      三、联系方式：-->
<!--              如有疑问，请成员公司子管理员联系集团信息中心陈昊或黎婷进行咨询沟通。-->

<!--            </pre>-->
<!--  </div>-->

<!--    </div>-->
<!--</template>-->
<!--<script>-->

<!--export default{-->
<!--  data () {-->
<!--    return {-->
<!--      tableData: [{-->
<!--        name: '工商信息接口',-->
<!--        type: '主动请求',-->
<!--        SPEC: '主动获取客商工商信息',-->
<!--        dataSource: '天眼查',-->
<!--      }]-->
<!--    }-->
<!--  },-->
<!--  methods:{-->

<!--  }-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--</style>-->

<!-- 接口下发服务 -->
<!-- <template>-->
<!--  <div class="interfaceDownload">-->
<!--    <div style="margin-bottom: 16px;">-->
<!--      <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>接口下发服务</el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
<!--    </div>-->

<!--    <pre style="font-size: 16px">-->
<!--        一、基本说明：-->
<!--        1.网络申请：-->
<!--        资信库测试IP端口为10.0.132.12:9292，需得到集团运维中心网络授权许可。-->
<!--        2.测试授权：-->
<!--        tokenid（各公司单独分配）及token（统一秘钥）需向集团资信门户管理员（信息中心-陈昊）申请授权使用，申请时需说明申请接口类型（如：数据下发、页面调用、模糊查询等）及测试周期，便于授权管理及统计。-->
<!--        3.生产授权：-->
<!--        待测试环境测试完成后可统一向集团申请正式环境授权，不同成员公司将提供不同token。-->
<!--        4.费用说明：-->
<!--        由于接口需要和第三方接口交互，因此测试环境接口也会调用第三方正式接口产生费用（如天眼查工商信息），请测试过程以测通功能为主，勿批量使用或投产。-->

<!--&lt;!&ndash;<el-table :data="tableData" highlight-current-row>&ndash;&gt;-->
<!--  <el-table :data="tableData" stripe border style="width:80%" highlight-current-row>-->

<!--  <el-table-column v-for="(item,i) in props" :key="i" :label="item.label" :property="item.prop"></el-table-column>-->

<!--  <el-table-column label="下载入口" align="center" min-width="100">-->
<!--　　　　<template slot-scope="scope">-->
<!--　　　　　　<el-button type="text" @click="downloadInterface('/home/ftpuser/' + scope.row.fileName)">下载</el-button>-->
<!--　　　　</template>-->
<!--　　</el-table-column>-->
<!--</el-table>-->

<!--        三、联系方式：-->
<!--        如有疑问，请成员公司子管理员联系集团信息中心陈昊或黎婷进行咨询沟通。-->

<!--      </pre>-->

<!--  </div>-->
<!--</template>-->


<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      // 创建prop数组-->
<!--      props: [-->
<!--        { prop: "name", label: "接口名称" },-->
<!--        { prop: "type", label: "接口类型" },-->
<!--        { prop: "SPEC", label: "接口说明" },-->
<!--        { prop: "dataSource", label: "数据来源" }-->
<!--      ],-->
<!--      //模拟数据-->
<!--      tableData: [-->
<!--        {-->
<!--          name: "工商信息接口",-->
<!--          type: "主动请求",-->
<!--          SPEC: "主动获取客商工商信息",-->
<!--          dataSource: "天眼查",-->
<!--          fileName:"1.工商信息.rar"-->
<!--        },-->
<!--        {-->
<!--          name: "企业基本信息接口",-->
<!--          type: "主动请求",-->
<!--          SPEC: "主动获取客商企业基本信息",-->
<!--          dataSource: "天眼查",-->
<!--          fileName:"2.企业基本信息.rar"-->
<!--        },-->
<!--        {-->
<!--          name: "舆情信息接口",-->
<!--          type: "主动请求",-->
<!--          SPEC: "主动获取客商舆情信息",-->
<!--          dataSource: "天眼查",-->
<!--          fileName:"3.舆情信息.rar"-->
<!--        },-->
<!--        {-->
<!--          name: "联系信息接口",-->
<!--          type: "主动请求",-->
<!--          SPEC: "主动获取客商联系信息",-->
<!--          dataSource: "天眼查",-->
<!--          fileName:"4.联系信息.rar"-->
<!--        },-->
<!--        {-->
<!--          name: "模糊查询接口",-->
<!--          type: "主动请求",-->
<!--          SPEC: "主动获取关键字查询后的模糊检索结果",-->
<!--          dataSource: "天眼查",-->
<!--          fileName:"5.模糊查询.rar"-->
<!--        },-->
<!--        {-->
<!--          name: "中诚信报告接口",-->
<!--          type: "主动请求",-->
<!--          SPEC: "主动获取中诚信提供的资信报告，共五类，均为HTML格式。",-->
<!--          dataSource: "中诚信",-->
<!--          fileName:"6.中诚信HTML页面.rar"-->
<!--        },-->
<!--        {-->
<!--          name: "门户平台页面接口",-->
<!--          type: "主动请求",-->
<!--          SPEC: "主动获取资信门户平台页面",-->
<!--          dataSource: "资信库",-->
<!--          fileName:"7.门户平台页面接口.rar"-->
<!--        },-->
<!--        {-->
<!--          name: "天眼查页面接口",-->
<!--          type: "主动请求",-->
<!--          SPEC: "主动获取天眼查网址嵌入页面",-->
<!--          dataSource: "天眼查",-->
<!--          fileName:"8.天眼查页面接口.rar"-->
<!--        },-->
<!--        {-->
<!--          name: "关注接口",-->
<!--          type: "主动请求",-->
<!--          SPEC: "调用后触发门户的客商关注功能",-->
<!--          dataSource: "资信库",-->
<!--          fileName:"9.关注接口.rar"-->
<!--        },-->
<!--        {-->
<!--          name: "消息推送接口-天眼查",-->
<!--          type: "被动获取",-->
<!--          SPEC: "需成员公司提供回调接口，资信库调用回调接口推送天眼查实时预警",-->
<!--          dataSource: "天眼查",-->
<!--          fileName:"10.消息推送接口-天眼查.rar"-->
<!--        },-->
<!--        {-->
<!--          name: "消息推送接口-中诚信",-->
<!--          type: "被动获取",-->
<!--          SPEC: "需成员公司提供回调接口，资信库调用回调接口推送中诚信风险早报及新闻早报",-->
<!--          dataSource: "中诚信",-->
<!--          fileName:"11.消息推送接口-中诚信.rar"-->
<!--        },-->
<!--      ]-->
<!--    };-->
<!--  },-->

<!--  methods:{-->
<!--    downloadInterface(fileName){-->
<!--      let param = {-->
<!--        fileName:fileName-->
<!--      }-->
<!--      this.$ajax.manage.downloadDocument(param).then(res => {-->
<!--        console.log(param.fileName.split("/"));-->
<!--        const content = res.data-->
<!--        const blob = new Blob([content])-->
<!--        console.log(res.data)-->
<!--        const fileName = param.fileName.split("/")[param.fileName.split("/").length - 1];-->
<!--        if ('download' in document.createElement('a')) { // 非IE下载-->
<!--          const elink = document.createElement('a')-->
<!--          elink.download = fileName-->
<!--          elink.style.display = 'none'-->
<!--          elink.href = URL.createObjectURL(blob)-->
<!--          console.log(elink.href);-->
<!--          document.body.appendChild(elink)-->
<!--          elink.click()-->
<!--          URL.revokeObjectURL(elink.href) // 释放URL 对象-->
<!--          document.body.removeChild(elink)-->
<!--        } else { // IE10+下载-->
<!--          navigator.msSaveBlob(blob, fileName)-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->

<style scoped>
.interfaceDownload {
  width: 90%;
  height: 100%;
  margin: auto;
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 20px;
  overflow-block: auto;
.main-box{
td{
  word-break: break-all;
  /*允许在字内换行,即单词可分*/
  word-wrap: break-word;
  /*允许长单词或URL地址换行*/
  border-right: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  font-size: 14px;
  height: 36px;
}
}
.table-box {
  margin: 20px auto;
}
}
</style>