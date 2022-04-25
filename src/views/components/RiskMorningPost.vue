<!-- 风险早报 -->
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
          value-format="yyyy-MM-dd">
      </el-date-picker>
      -
      <el-date-picker
          v-model="search.endDate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-select v-model="search.riskleve" placeholder="请选择风险等级" clearable style="width: 200px;margin:0 5px;" multiple collapse-tags @change="changeRiskLeve">
		 <el-option :class="[{'all': isIndeterminate1 === 'all'} , {'part':isIndeterminate1 === 'part'}, {'no': isIndeterminate1 === 'no' }]" label="全选" value="全选" ></el-option>
		<el-option v-for="(item,index) in risklevelList" :key="item" :label="item" :value="item" :class="risklevelColor[index]">
        </el-option>
      </el-select>
      <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
    </el-row>
    <div style="margin: 10px 0;">
      <span style="float: right; font-size: 13px;">更新时间: 8.30 AM</span>
      <span style="float: right; font-size: 13px;margin-right: 30px;">数据来源：中诚信</span>
    </div>
	<div v-if="loading"  style="width: 100px;height: 100px;margin-left: 700px;">
	      <i class="el-icon-loading" style="font-size: 40px;"></i>
	    </div>
			  <div
			  v-else
			  >
    <div style="margin: 35px 0;clear: both;">
      <el-table
          :data="tableData">
        <el-table-column
            prop="enterpriseName"
            label="监控企业名称"
            width="220px"
        >
        </el-table-column>
        <el-table-column
            prop="entType"
            label="监控企业类别"
            width="110px"
        >
        </el-table-column>
        <el-table-column
            prop="levelType"
            label="风险等级"
            width="80px">
			<template scope="scope">
			        <span v-if="scope.row.levelType=='警示'" style="color:#FD97AC">警示</span>
			        <span v-else-if="scope.row.levelType=='重大'" style="color:#F8B263">重大</span>
					<span v-else style="color:#0060F3 ">一般</span>
			    </template>
        </el-table-column>
        <el-table-column
            prop="typeName"
            label="风险类别"
            width="100px"
        >
        </el-table-column>
        <el-table-column
            prop="description"
            label="风险事件"
        >
        </el-table-column>
        <el-table-column
            prop="ud"
            label="消息日期"
            width="100px"
        >
        </el-table-column>
        <el-table-column
            prop="pushSource"
            label="推送来源"
            width="80px"
        >
        </el-table-column>
      </el-table>
    </div>
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
	  checked: false,
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
      risklevelList:["警示","重大","一般"],// 风险等级
	  risklevelColor:["first","second","third"],
      copyRiskleve:[],
	  oldSelectArray: [],
	  oldSelectArray1: [],
    }
  },
  created() {
    this.getCompanyNameList();
	//当前设定的日期时间
	      let d = new Date
	      let year1,month1,day1;
	      [year1,month1,day1] = [d.getFullYear(),d.getMonth(),d.getDate()]
        // let date1 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	      // let date1 = new Date(year1, month1, day1,7)
    let date1 = this.formatDate(d, 'yyyy-MM-dd');
	      this.search.startDate = date1
		  this.search.endDate = date1
    if(this.$route.query.careBy == 'zcxOnly' || this.$route.query.careBy == 'both'){
      this.search.companyName = [this.$route.query.companyName]
      this.searchData(1)
    }
    // if(this.$route.query.companyName != null){
    //   this.search.companyName = [this.$route.query.companyName]
    //   if(this.$route.query.activeName == 'second'){
    //     this.searchData(1)
    //   }
    // }
  },
  computed: {
          allChecked() {
              return this.companyNameList.length === this.search.companyName.length;
          },
		  allChecked() {
		      return this.risklevelList.length === this.search.riskleve.length;
		  }
      },
   methods:{


     formatDate(date, fmt) {
       if (/(y+)/.test(fmt)) {
         fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
       }
       let o = {
         'M+': date.getMonth() + 1,
         'd+': date.getDate(),
         'h+': date.getHours(),
         'm+': date.getMinutes(),
         's+': date.getSeconds()
       }
       for (let k in o) {
         if (new RegExp(`(${k})`).test(fmt)) {
           let str = o[k] + ''
           fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
         }
       }
       return fmt
     },

     padLeftZero(str) {
        return ('00' + str).substr(str.length)
     },

	    formateStatus (cellValue) {
	       /*  let statusName = ''
	         let statusColor = ''
	         this.tableData.forEach(item => {
				 if(cellValue === '重大'){
					 return (`<span style="color:red"></span>`)
				}
	            if (item.levelType === cellValue) {
	             statusName = item.statusName
	             statusColor = item.statusColor
	           } 
	         }) */
	        
	       }, 
	   
      searchData(page){
		  this.loading = true
		  this.page.currentPage = page
        /* this.changeRiskLeve(this.search.riskleve) */
        let param = {
          pageIndex: page ? page : 1,
          pageSize: this.page.pageSize,
          userName:this.$Cookies.get('userCode'),
          companyName:this.search.companyName,
         /* riskleve:this.copyRiskleve, */
		  riskleve:this.search.riskleve,
          startDate:this.search.startDate,
          endDate:this.search.endDate
        }
        this.$ajax.manage.getRiskMorningPost(param).then(res => {
          console.log(param)
          console.log(res.data)
          if(res.data.code == '0') {
            this.tableData = res.data.riskMorningPostList;
            console.log(this.tableData);
            this.page.total = res.data.totalRecords;
            this.tableData.splice(1, 0);
            this.$message.success(res.data.msg);
          }
        })
		this.loading = false
      },
      handleCurrentChange(val){
        this.searchData(val);
      },
      getCompanyNameList(){
        let param = {
          userName:this.$Cookies.get('userCode')
        }
        this.$ajax.manage.getZCXCompayNameList(param).then(res => {
          if(res.data.code == '0'){
            this.companyNameList = res.data.companyNameList;
          }
        })
      },
      changeRiskLeve(val) {
		  
		let allValues = [];
		     for (let item of this.risklevelList) {
			/* 	switch (item) {
				  case "警示":
				    allValues.push(2);
				    break;
				  case "重大":
				    allValues.push(1);
				    break;
				  case "一般":
				    allValues.push(0);
				    break;
				} */
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
		  		                    this.search.riskleve = ['全选'].concat(vals);
		  		                    this.isIndeterminate1 = 'all';
		  		                } else if (!val.length) {
		  		                    this.isIndeterminate1 = '';
		  		                } else {
		  		                    this.isIndeterminate1 = 'part';
		  		                }
		  		            }
		  		            this.oldSelectArray1 = this.search.riskleve;
		  
       /* this.copyRiskleve = []
        for (var i = 0; i < val.length; i++) {
          switch (val[i]) {
            case "警示":
              this.copyRiskleve.push(2);
              break;
            case "重大":
              this.copyRiskleve.push(1);
              break;
            case "一般":
              this.copyRiskleve.push(0);
              break;
          }
        } */
      },
  	changeCompanyName(val){
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
  	 } 
    }
}
</script>

<style scoped lang="less">
  .first{
	  color:#FD97AC;
  }
  .second{
	  color:#F8B263
  }
  .third{
	color:#0060F3  
  }
</style>