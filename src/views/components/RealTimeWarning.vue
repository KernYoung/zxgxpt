<!-- 实时预警 -->
<template>
  <div>
    <el-row class="searchBox">
      <el-select v-model="search.companyName" collapse-tags placeholder="请选择企业名称" clearable style="width: 310px;margin-right:5px;" multiple   @change="changeCompanyName">
        <el-option :class="[{'all': isIndeterminate === 'all'} , {'part':isIndeterminate === 'part'}, {'no': isIndeterminate === 'no' }]" label="全选" value="全选"></el-option>
		<el-option v-for="item in companyNameList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-date-picker
          v-model="search.startDate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd" @change="changeTime">
      </el-date-picker>
      -
      <el-date-picker
          v-model="search.endDate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd" @change="changeTime">
      </el-date-picker>
      <el-select v-model="search.riskleve" collapse-tags placeholder="请选择风险等级" clearable style="width: 200px;margin:0 5px;" multiple @change="changeRiskLeve">
        <el-option :class="[{'all': isIndeterminate1 === 'all'} , {'part':isIndeterminate1 === 'part'}, {'no': isIndeterminate1 === 'no' }]" label="全选" value="全选"></el-option>
		<el-option v-for="item in risklevelList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="search.eventType"collapse-tags placeholder="请选择事件类型" clearable style="width: 200px;margin-right: 5px;" multiple  @change="changeEventType">
<!--          <el-option :class="[{'all': isIndeterminate2 === 'all'} , {'part':isIndeterminate2 === 'part'}, {'no': isIndeterminate2 === 'no' }]" label="全选" value="全选"></el-option> -->
		<el-option v-for="item in eventTypeList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
	 <!-- <div style="height:50px"
	                 v-loading="loading"
	                 element-loading-text="数据正在加载..."
	                 element-loading-spinner="el-icon-loading"
	                >
	         </div> -->
    </el-row>
    <div style="margin: 10px 0;" >
      <span style="font-size: 14px;color: #1fade5;font-weight: bold">注：部分第三方网站由于安全策略或终端不同（如微信公众号）无法直接跳转访问，请复制链接后查看；部分第三方网站由于网站本身问题可能存在过期或封停，请见谅。</span>
      <span style="float: right; font-size: 14px;font-weight: bold">数据来源：天眼查</span>
    </div>
      <div v-if="loading"  style="width: 100px;height: 100px;margin-left: 700px;">
            <i class="el-icon-loading" style="font-size: 40px;"></i>
          </div>
		  <div
		  v-else
		  >
      <ul style="font-size: 12px; background-color:#fff;" >
        <li v-if="tableData.length == 0" style="border:1px solid #c1c1c1;border-top: 3px solid #00a4ff;padding: 0 10px;margin: 10px 0;font-size: 16px;text-align: center;padding: 30px;">
             暂无数据
        </li>
        <li v-for="(item,index) in tableData" :key="index" class="tableList" style="border:1px solid #c1c1c1;border-top: 3px solid #00a4ff;padding: 0 10px;margin: 10px 0;">
          <div style="margin: 5px 0;">
            <span style="font-size: 16px;font-weight: bold;">【{{item.typeName}}】{{item.companyName}}</span>
            <span style="float:right;color:orange;">{{item.riskLevel}}</span>
          </div>
          <p style="margin: 5px 0;">{{item.a}}</p>
          <p style="margin: 5px 0;">{{item.b}}</p>
          <div style="font-size: 12px;margin-bottom:5px;">
            <spa v-if="item.url">链接:</spa><a :href="item.url" target="_blank" style="margin-left: 15px; ">{{item.url}}</a>
            <span style="float: right;color: #00a4ff">推送时间:{{item.updateTime}}</span>
          </div>
        </li>
      </ul>
    </div>
    			

    <div style="text-align: center;margin-top: 10px;">
      <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
                     :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return{
		loading:false,
	  isIndeterminate: false,
	  isIndeterminate1: false,
	  isIndeterminate2: false,
	  checked: false,
	  oldSelectArray: [],
	  oldSelectArray1: [],
	  oldSelectArray2: [],
      tableData:[],
      search:{
        companyName:[],
        riskleve:[],
        eventType:[],
        startDate:'',
        endDate:''
      },
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      companyNameList:[],//企业名称
      risklevelList:["高风险","一般风险"],// 风险等级
      eventTypeList:[],// 事件类型
    }
  },
  created() {
    this.getCompanyNameList(),
    this.getEventTypeList()
	//当前设定的日期时间
	      let d = new Date
	      let year1,month1,day1;
	      [year1,month1,day1] = [d.getFullYear(),d.getMonth(),d.getDate()]
	      let date1 = new Date(year1, month1, day1,7)
	      this.search.startDate = date1
		  this.search.endDate = date1
		
  },
  computed: {
         /* allChecked() {
              return this.companyNameList.length === this.search.companyName.length;
          },
  		   allChecked() {
  		      return this.risklevelList.length === this.search.riskleve.length;
  		  } */
      },
	/* mounted() {
	 	this.loading = true
	 }, */
  methods:{
    searchData(page){
			this.loading = true
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        userName:this.$Cookies.get('userCode'),
        companyName:this.search.companyName,
        riskleve:this.search.riskleve,
        eventType:this.search.eventType,
        startDate:this.search.startDate,
        endDate:this.search.endDate
      }

      this.$ajax.manage.getRealTimeWarning(param).then(res => {
        console.log(param)
        console.log(res.data)
        if(res.data.code == '0') {
          this.tableData = res.data.realTimeWarningList;
          console.log(this.tableData);
          this.page.total = res.data.totalRecords;
          this.tableData.splice(1, 0);
          this.$message.success(res.data.msg);
		  this.loading = false
        }
      })
    },
    // 更改企业名称
   /* changeCompanyName(val){
      this.getEventTypeList()
    }, */
    // 更改风险等级
   /* changeRiskLeve(val){
      this.getEventTypeList()
    }, */
    // 更改事件类型
   /* changeEventType(val){

    }, */
    handleCurrentChange(val){
      this.searchData(val);
    },
    getCompanyNameList(){
      let param = {
        userName:this.$Cookies.get('userCode')
      }
      this.$ajax.manage.getCompayNameList(param).then(res => {
        if(res.data.code == '0'){
          this.companyNameList = res.data.companyNameList;
        }
      })
    },
    getEventTypeList(){
      let param = {
        userName:this.$Cookies.get('userCode'),
        riskleve:this.search.riskleve,
        companyName: this.search.companyName,
        startDate: this.search.startDate,
        endDate: this.search.endDate
      }
      this.$ajax.manage.getEventTypeList(param).then(res => {
        if(res.data.code == '0'){
			let allValues = [];
			if(res.data.eventTypeList.length>0){
			allValues.push("全选")	
			}
			  for (let item of res.data.eventTypeList) {
			        allValues.push(item);
			      }
				  console.log(allValues)
			this.eventTypeList = allValues;	  
          /* this.eventTypeList = res.data.eventTypeList; */
        }
      })
    } ,
	changeCompanyName(val){
		 this.getEventTypeList()
		let allValues = [];
	      for (let item of this.companyNameList) {
	            allValues.push(item);
	          }
		 allValues = ['全选'].concat(allValues);
		            const oldVal = this.oldSelectArray.concat([]);
		            const oldInclude0 = oldVal.includes('全选');
		            const newInclude0 = val.includes('全选');
		            // 若是全部选择
		            if (newInclude0) {
		                this.search.companyName = allValues;
		                this.isIndeterminate = 'all';
		            }
		            if (oldInclude0 && !newInclude0) {
		                this.search.companyName = [];
		                this.isIndeterminate = 'no';
		            }
		            if (oldInclude0 && newInclude0) {
		                this.search.companyName = val;
		                this.search.companyName = this.search.companyName.filter(d => d !== '全选');
		                this.isIndeterminate = 'part';
		            }
		            if (!oldInclude0 && !newInclude0) {
		                if (val.length === allValues.length - 1) {
		                    this.search.companyName = ['全选'].concat(val);
		                    this.isIndeterminate = 'all';
		                } else if (!val.length) {
		                    this.isIndeterminate = '';
		                } else {
		                    this.isIndeterminate = 'part';
		                }
		            }
		            this.oldSelectArray = this.search.companyName;
	 },
	changeRiskLeve(val){
		this.getEventTypeList()
		let allValues = [];
	      for (let item of this.risklevelList) {
	            allValues.push(item);
	          }
		 allValues = ['全选'].concat(allValues);
		            const oldVal = this.oldSelectArray1.concat([]);
		            const oldInclude0 = oldVal.includes('全选');
		            const newInclude0 = val.includes('全选');
		            // 若是全部选择
		            if (newInclude0) {
		                this.search.riskleve = allValues;
		                this.isIndeterminate1 = 'all';
		            }
		            if (oldInclude0 && !newInclude0) {
		                this.search.riskleve = [];
		                this.isIndeterminate1 = 'no';
		            }
		            if (oldInclude0 && newInclude0) {
		                this.search.riskleve = val;
		                this.search.riskleve = this.search.riskleve.filter(d => d !== '全选');
		                this.isIndeterminate1 = 'part';
		            }
		            if (!oldInclude0 && !newInclude0) {
		                if (val.length === allValues.length - 1) {
		                    this.search.riskleve = ['全选'].concat(val);
		                    this.isIndeterminate1 = 'all';
		                } else if (!val.length) {
		                    this.isIndeterminate1 = '';
		                } else {
		                    this.isIndeterminate1 = 'part';
		                }
		            }
		            this.oldSelectArray1 = this.search.riskleve;
	 } ,
	 changeEventType(val){
		 let allValues = [];
		   for (let item of this.eventTypeList) {
		         allValues.push(item);
		       }
		  //allValues = ['全选'].concat(allValues);
		             const oldVal = this.oldSelectArray2.concat([]);
		             const oldInclude0 = oldVal.includes('全选');
		             const newInclude0 = val.includes('全选');
		             // 若是全部选择
		             if (newInclude0) {
		                 this.search.eventType = allValues;
		                 this.isIndeterminate2 = 'all';
		             }
		             if (oldInclude0 && !newInclude0) {
		                 this.search.eventType = [];
		                 this.isIndeterminate2 = 'no';
		             }
		             if (oldInclude0 && newInclude0) {
		                 this.search.eventType = val;
		                 this.search.eventType = this.search.eventType.filter(d => d !== '全选');
		                 this.isIndeterminate2 = 'part';
		             }
		             if (!oldInclude0 && !newInclude0) {
		                 if (val.length === allValues.length - 1) {
		                     this.search.eventType = ['全选'].concat(val);
		                     this.isIndeterminate2 = 'all';
		                 } else if (!val.length) {
		                     this.isIndeterminate2 = '';
		                 } else {
		                     this.isIndeterminate2 = 'part';
		                 }
		             }
		             this.oldSelectArray2 = this.search.eventType;
		 },
		 changeTime(val){
			 this.getEventTypeList()
		 }
  }
}
</script>

<style scoped lang="less">
  .realTimeWarning{

  }
</style>