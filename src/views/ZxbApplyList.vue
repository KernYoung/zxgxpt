<template>
    <div class="ZxbApplyList">
        <div style="margin-bottom: 15px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>信保报告审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="searchbox">
            <el-input class="fl-left manageTableInput" v-model="search.xcode" placeholder="请输入信保代码" clearable
                      style="width: 200px;margin-right: 10px;">
            </el-input>
            <el-input class="fl-left manageTableInput" v-model="search.companyName" placeholder="请输入中/英文名称" clearable
                      style="width: 200px;margin-right: 10px;">
            </el-input>
<!--           @change="changeApprove(approve)"-->
            <el-select v-model="search.approve" clearable placeholder="请选择审批标识" size="medium" style="margin: 0 10px">
              <el-option
                  v-for="item in approves"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          <el-input class="fl-left manageTableInput" v-model="search.informant" placeholder="请输入填报人" clearable
                    style="width: 200px;margin-right: 10px;">
          </el-input>
          <el-input class="fl-left manageTableInput" v-model="search.approver" placeholder="请输入审批人" clearable
                    style="width: 200px;margin-right: 10px;">
          </el-input>
            <el-button type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
        </div>
        <div class="table-box">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" stripe
                      v-loading="loading">
                <!--<el-table-column type="selection" width="55">
                </el-table-column>-->
                <!--<el-table-column prop="corpSerialNo" label="流水号">
                </el-table-column>-->
                <!--<el-table-column prop="clientNo" show-overflow-tooltip label="企业标识">
                </el-table-column>-->
                <el-table-column prop="reportbuyerNo" show-overflow-tooltip label="信保代码">
                </el-table-column>
                <el-table-column prop="reportCorpCountryCode" show-overflow-tooltip label="国别">
                </el-table-column>
                <el-table-column prop="reportCorpChnName,reportCorpEngName" show-overflow-tooltip label="中英文名称">
                    <template slot-scope="scope">
                        {{scope.row.reportCorpChnName}}/{{scope.row.reportCorpEngName}}
                    </template>
                </el-table-column>
<!--                <el-table-column prop="reportCorpEngName" show-overflow-tooltip label="英文名称">-->
<!--                </el-table-column>-->
                <el-table-column prop="creditno" show-overflow-tooltip label="统一社会信用代码">
                </el-table-column>
                <el-table-column prop="istranslation" show-overflow-tooltip label="是否导读">
                    <template slot-scope="scope">
                        <el-tag type="primary" v-if="scope.row.istranslation==1">是</el-tag>
                        <el-tag type="info" v-else-if="scope.row.istranslation==0">否</el-tag>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="corpSerialNoOut" show-overflow-tooltip label="报告下载流水单号">
                </el-table-column>-->
                <el-table-column prop="approveCode" show-overflow-tooltip label="审批标识">
                    <template slot-scope="scope">
                        <el-tag type="primary" v-if="scope.row.approveCode==1" >通过</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.approveCode==999">不通过</el-tag>
                        <el-tag type="info" v-else-if="scope.row.approveCode==2">待审核</el-tag>
                        <el-tag type="warning" v-else>异常</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="approveMsg" show-overflow-tooltip label="审批结果">
                </el-table-column>
                <!--<el-table-column prop="clientNoOut" show-overflow-tooltip label="下单企业信保通账号">
                </el-table-column>-->
                <!--<el-table-column prop="otherMsg" show-overflow-tooltip label="其他信息">
                </el-table-column>-->
                <el-table-column prop="updateName" show-overflow-tooltip label="填报人">
                </el-table-column>
                <el-table-column prop="updateTime" :formatter="dateFormat" show-overflow-tooltip label="填报时间">
                </el-table-column>
                <el-table-column prop="approveName" show-overflow-tooltip label="审核人">
                </el-table-column>
                <el-table-column prop="approveDate" :formatter="dateFormat" show-overflow-tooltip label="审核时间">
                </el-table-column>
                <el-table-column align="center" width="250px" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" :disabled="scope.row.approveby" @click="audit(scope.row,1)" plain>
                            通过</el-button>
                        <el-button size="mini" type="danger" :disabled="scope.row.approveby"  @click="audit(scope.row,999)" plain>
                            不通过</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="text-align: center;margin-top: 10px;">
                <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
                               :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import JsonView from "../components/jsonView";
    import moment from 'moment'

    export default {
        name: "zxbReportList",
        components: {
            JsonView,
        },
        data(){
            return{
                search:{
                    xcode:'',
                    companyName:'',
                    approve:'',
                    informant:'',
                    approver:''
                },
                loading: false,
                page:{
                    total:0,
                    currentPage:0,
                    pageSize:10
                },
                tableData:[],
                fileLoading: false,
                src: '',
                pdfDialogVisible: false,
                pdfLoading: false,
                iframeHeight: document.documentElement.clientHeight*0.67 || document.body.clientHeight*0.67,
                pdfProgressVisible: true,
                progressNum: 0,
                startTimer: '',
                endTimer: '',
                approves:['通过', '不通过', '待审核','异常'],
            }
        },
        mounted () {
            this.getData();
        },
        methods: {
            getData(page) {
                let param = {
                    pageIndex: page ? page : 1,
                    pageSize: this.page.pageSize,
                    zxbCode:this.search.xcode,
                    zxbCompanyName:this.search.companyName,
                    zxbApprove:this.search.approve,
                    zxbInformant:this.search.informant,
                    zxbApprover:this.search.approver,
                    operator: this.$Cookies.get('userCode')
                }
                this.loading = true;
                this.$ajax.manage.searchApplyList(param).then(res => {
                    this.loading = false;
                    if (res.data.code == 0) {
                        this.tableData = res.data.applyList;
                        this.page.total = res.data.totalRecords
                    } else {
                        this.$message.error(res.data.msg)
                    }
                  console.log("-------------------------")
                    console.log(res.data)
                  console.log("-------------------------")
                }).catch(error => {
                    console.log(error);
                    this.$message.error(error)
                })
            },
            searchData() {
                this.page.currentPage = 1;
                this.getData()
            },
            handleCurrentChange(val) {
                //页码切换
                this.getData(val)
            },
            audit(row, code) {
                let param = {
                    corpSerialNo: row.corpSerialNo,
                    approve: parseInt(this.$Cookies.get('userId')),
                    approveCode: code
                }
                this.$ajax.manage.zhongxinbaoApprove(param).then(res => {
                    if (res.status == 200) {
                        this.$message.success(res.data.returnMsg);
                        this.dialogXBVisible = false
                    }
                    this.getData(this.page.currentPage)
                })
            },
            //时间格式化
            dateFormat (row,column) {
                var date = row[column.property];
                if (date == undefined) {
                    return ''
                };
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            },

        }
    }
</script>

<style scoped>
    .ZxbApplyList {
        width: 90%;
        height: 100%;
        margin: auto;
        background-color: #f8f8f8;
        box-sizing: border-box;
        padding: 20px;
        overflow-block: auto;
        .table-box {
            margin: 20px auto;
        }
    }
</style>