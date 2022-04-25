<!-- 新闻早报 -->
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
      <el-select v-model="search.newsEmotion"collapse-tags  placeholder="请选择新闻情感" clearable style="width: 200px;margin:0 5px;" multiple  @change="changeEventType">
        <el-option :class="[{'all': isIndeterminate2 === 'all'} , {'part':isIndeterminate2 === 'part'}, {'no': isIndeterminate2 === 'no' }]" label="全选" value="全选"></el-option>
		<el-option v-for="(item,index) in newsEmotionList" :key="item" :label="item" :value="item" :class="newsEmotionColor[index]">
        </el-option>
      </el-select>
      <el-select v-model="search.riskleve" collapse-tags placeholder="请选择风险等级" clearable style="width: 200px;margin:0 5px;" multiple @change="changeRiskLeve">
        <el-option :class="[{'all': isIndeterminate1 === 'all'} , {'part':isIndeterminate1 === 'part'}, {'no': isIndeterminate1 === 'no' }]" label="全选" value="全选"></el-option>
		<el-option v-for="(item,index) in risklevelList" :key="item" :label="item" :value="item" :class="risklevelColor[index]">
        </el-option>
      </el-select>
      <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
    </el-row>
    <div style="margin: 10px 0;">
      <!-- <span style="font-size: 13px;color: #1fade5;font-weight: bold">注：部分第三方网站由于安全策略或终端不同（如微信公众号）无法直接跳转访问，请复制链接后查看；部分第三方网站由于网站本身问题可能存在过期或封停，请见谅。</span> -->
      <span style="font-size: 13px;color: #1fade5;font-weight: bold">注：部分第三方网站由于网站本身问题可能存在过期或封停导致无法查看，请见谅。</span>
	  <span style="float: right; font-size: 12px;">更新时间: 8.30 AM</span>
      <span style="float: right; font-size: 12px;margin-right: 30px;">数据来源：中诚信</span>
    </div>
    <div v-if="loading"  style="width: 100px;height: 100px;margin-left: 700px;">
          <i class="el-icon-loading" style="font-size: 40px;"></i>
        </div>
    		  <div
    		  v-else
    		  >
    <div style="margin: 10px 0;clear: both;">
      <el-table
          :data="tableData">
        <el-table-column
            prop="enterpriseName"
            label="监控企业名称"
        >
        </el-table-column>
        <el-table-column
            prop="entType"
            label="监控企业类别"
        >
        </el-table-column>
        <el-table-column
            prop="levelType"
            label="风险等级">
			<template scope="scope">
			        <span v-if="scope.row.levelType=='警示'" style="color:#FD97AC">警示</span>
			        <span v-else-if="scope.row.levelType=='重大'" style="color:#F8B263">重大</span>
					<span v-else style="color:#0060F3 ">一般</span>
			    </template>
        </el-table-column>
        <el-table-column
            prop="description"
            label="新闻情感">
			<template scope="scope">
			        <span v-if="scope.row.description=='积极'" style="color:#339966">积极</span>
			        <span v-else-if="scope.row.description=='消极'" style="color:#0060F3">消极</span>
					<span v-else style="color:#FEC83A">中立</span>
			    </template>
        </el-table-column>
        <el-table-column
            prop="newsType"
            label="新闻类别"
        >
        </el-table-column>
        <el-table-column
            label="新闻标题"
            width="300px"
        >
          <template slot-scope="scope">
            <a :href="scope.row.url"
               target="_blank"
            >{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column
            prop="newstags"
            label="新闻标签"
        >
        </el-table-column>
        <el-table-column
            prop="cd"
            label="消息日期"
        >
        </el-table-column>
        <el-table-column
            prop="pushSource"
            label="推送来源"
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
	  isIndeterminate2: false,
	  checked: false,
	  oldSelectArray: [],
	  oldSelectArray1: [],
	  oldSelectArray2: [],
      tableData:[],
      search:{
        companyName:[],
        riskleve:[],
        newsEmotion:[],
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
      newsEmotionList:["积极","消极","中立"],// 新闻情感
	  risklevelColor:["first","second","third"],
	  newsEmotionColor:["one","two","three"],
      copyRiskleve:[]
    }
  },
  created() {
    this.getCompanyNameList()
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
    // }
  },
  mounted() {
  	
  },
  computed: {
          allChecked() {
              return this.companyNameList.length === this.search.companyName.length;
          },
  		  allChecked() {
  		      return this.risklevelList.length === this.search.riskleve.length;
  		  },
		  allChecked() {
		      return this.newsEmotionList.length === this.search.newsEmotion.length;
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
    searchData(page){
	  this.loading = true;
	  this.page.currentPage = page
      this.changeRiskLeve(this.search.riskleve);
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        userName:this.$Cookies.get('userCode'),
        companyName:this.search.companyName,
        /* riskleve:this.copyRiskleve, */
		riskleve:this.search.riskleve,
        newsEmotion:this.search.newsEmotion,
        startDate:this.search.startDate,
        endDate:this.search.endDate
      }
      this.$ajax.manage.getMorningNews(param).then(res => {
        console.log(param)
        console.log(res.data)
        if(res.data.code == '0') {
          this.tableData = res.data.morningNewsList;
          console.log(this.tableData);
          this.page.total = res.data.totalRecords;
          this.tableData.splice(1, 0);
          this.$message.success(res.data.msg);
        }
      })
	  this.loading =false;
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
	changeEventType(val) {
	 		let allValues = [];
	 		     for (let item of this.newsEmotionList) {
	 		           allValues.push(item);
	 		         }
	 		  		 allValues = ['全选'].concat(allValues);
	 		  		            const oldVal = this.oldSelectArray2.concat([]);
	 		  		            const oldInclude0 = oldVal.includes('全选');
	 		  		            const newInclude0 = val.includes('全选');
	 		  		            // 若是全部选择
	 		  		            if (newInclude0) {
	 		  		                this.search.newsEmotion = allValues;
	 		  		                this.isIndeterminate2 = 'all';
	 		  		            }
	 		  		            if (oldInclude0 && !newInclude0) {
	 		  		                this.search.newsEmotion = [];
	 		  		                this.isIndeterminate2 = 'no';
	 		  		            }
	 		  		            if (oldInclude0 && newInclude0) {
	 		  		                this.search.newsEmotion = val;
	 		  		                this.search.newsEmotion = this.search.newsEmotion.filter(d => d !== '全选');
	 		  		                this.isIndeterminate2 = 'part';
	 		  		            }
	 		  		            if (!oldInclude0 && !newInclude0) {
	 		  		                if (val.length === allValues.length - 1) {
	 		  		                    this.search.newsEmotion = ['全选'].concat(val);
	 		  		                    this.isIndeterminate2 = 'all';
	 		  		                } else if (!val.length) {
	 		  		                    this.isIndeterminate2 = '';
	 		  		                } else {
	 		  		                    this.isIndeterminate2 = 'part';
	 		  		                }
	 		  		            }
	 		  		            this.oldSelectArray2 = this.search.newsEmotion;
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
	 },
	  submitLogin() {
	               this.loading=true
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
  .one{
	 color: #339966; 
  }
  .two{
	color: #0060F3;  
	  }
  .three{
	  color:#FEC83A ;
  }
</style>