<template>
	<div class="search-result">
		<div class="main-content">
		  <div class="content-item " style="width:80%">
		    <div class="title">
		      <span>检索结果</span>
		      <span class="text">
		        根据关键字，共搜索到 {{searchList.length>0?searchList.length:0}} 条数据结果，结果来自
		        {{sourceType}}
<!--		        <a class="postLink" @click="blarSearch">模糊接口查询</a>-->
		      </span>
		    </div>
		    <div class="main">
		      <ul class="proList_li " v-if="searchList.length>0">
		        <li class="clear" v-for="(item,index) in searchList" :key="index">
		          <div class="fl-left proList_content">
                <span v-if="item.isBlack" style="color:white;background-color: #c1c1c1;padding: 3px;float: right">黑名单</span>
                <p class="proList_txt" @click="moreNews(item,'0')"
		              v-html="brightenKeyword(item.companyName,searchVal)">
		            </p>
		            <p>社会统一信用代码：{{item.creditCode}}</p>
		            <p>法人代表：{{item.operName}}</p>
		            <p>成立时间：{{item.buildDate}}</p>
                <p>关联代码：{{item.id}}</p>
		          </div>
		          <dl class="fl-right proList_btn">
		            <el-button plain type="primary" size="medium" @click="moreNews(item,'0')">企业基本信息
		            </el-button>
		            <el-button plain type="primary" size="medium" @click="moreNews(item,'1')">工商舆情
		            </el-button>
		          </dl>
		        </li>
		      </ul>
		    </div>
		  </div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				searchList: [],
        blackListData:[],
				sourceType:'',
				searchVal:""
			}
		},
		created(){
      this.getBlackList()
			if(this.$route.query.searchVal && (!this.$route.query.isBlar)) {
			  this.searchVal=this.$route.query.searchVal;
			  this.seachContent()
        console.log("本地查询")
			}else{
        this.searchVal=this.$route.query.searchVal;
        this.blarSearch()
        console.log("全网查询")
      }
		},
		mounted(){

		},
		watch: {
			$route (to, from) {
				this.$router.go(0)
			}
		},
		methods:{
			seachContent () {
			    let param = {
			      "keyword": this.searchVal,
			      "page": 1,
			      "userId": parseInt(this.$Cookies.get('userId'))
			    }
			    this.$ajax.manage.getSearchList(param).then(res => {
			      console.log(res);
			      if (res.status == 200) {
			        //console.log(res.data);
			        this.searchList = res.data.searchList
              this.getIsBlack(this.blackListData,this.searchList)
			        this.sourceType = res.data.sourceType;
			      }
			    })
			},
			blarSearch () {
			  //模糊接口查询
			  let param = {
			    keyword: this.searchVal,
			    userId: this.$Cookies.get('userId'),
			    page: 1
			  }
			  this.$ajax.manage.directSearchList(param).then(res => {
			    if (res.status == 200) {
			      this.searchList = res.data.searchList
            this.getIsBlack(this.blackListData,this.searchList)
			      this.sourceType = res.data.sourceType;
			      this.showBox = 2;
			    }
			  })
			},
			//搜索高亮
			brightenKeyword (val, keyword) {
			  keyword = keyword.replace(/\s*/g,'');
			  if (keyword.length > 0) {
			    let keywordArr = keyword.split("");
			    val = val + "";
			    keywordArr.forEach(item => {
			      if (val.indexOf(item) !== -1 && item !== "") {
			        val = val.replace(
			          new RegExp(item, 'g'),
			          '<font color="#f75353">' + item + "</font>");
			      }
			    });
			    return val;
			  } else {
			    return val;
			  }
			},
			moreNews (item, index) {
			  console.log(item);
			  if (index === 0) {
			    //基本信息
			  } else if (index === 1) {
			    //天眼查
			  } else if (index === 2) {
			    //中信保
			  } else if (index === 3) {
			    //中诚信
			  } else if (index === 4) {
			    //更多详情
			  }
			  this.$router.push({
			    path: '/essInfo',
			    query: {
			      id: item.id,
			      companyName: item.companyName,
			      companyId: item.companyId,
			      creditCode: item.creditCode,
			      index: index
			    }
			  })
			},
      getIsBlack(blackList,searchList){
        for(let i = 0; i < searchList.length; i++){
          searchList[i].isBlack = false;
          for(let j = 0; j < blackList.length; j++){
            if(blackList[j].orgNo == searchList[i].creditCode){
              searchList[i].isBlack = true;
            }
          }
        }
        console.log("searchList:" + searchList)
      },
      getBlackList () {
        let param = {
          "userCode": sessionStorage.getItem('userCode')
        }
        this.$ajax.manage.getBlackList(param).then(res => {
          if (res.data.code == 0) {
            this.blackListData = res.data.blackList
          }
        })
      }
		}
	}
</script>

<style lang="less" scoped="">
	.search-result{
		.main-content {
		  margin: auto;
		  // display: flex;
		  text-align: center;
		  margin-top: 20px;
		  .content-item {
		    padding: 15px 10px;
		    background: #f8f8f8;
		    //box-shadow: 0 0 5px 5px #e3e3e3;
		    display: inline-block;
		    text-align: left;
		    box-sizing: border-box;
		    .tab-content-wrapper {
		      div {
		        height: 46px;
		        line-height: 46px;
		        background: #efefef;
		        font-size: 16px;
		        margin-bottom: 10px;
		        box-sizing: border-box;
		        padding: 0 10px;
		        &:hover {
		          border: 1px solid #409eff;
		        }
		      }
		    }
		  }

		  .leftBox {
		    margin-right: 30px;
		    width: 500px;
		    vertical-align: top;
		  }

		  .rightBox {
		    width: 500px;
		    vertical-align: top;
		  }

		  .title {
		    margin-bottom: 10px;
		    font-size: 16px;
		    font-weight: bold;

		    .icon {
		      display: inline-block;
		      width: 5px;
		      height: 20px;
		      background: #1b7fbd;
		      vertical-align: middle;
		      margin-right: 5px;
		    }

		    .text {
		      font-size: 12px;
		      color: #999;
		      float: right;

		      .postLink {
		        color: #1b7fbd;
		        text-decoration-line: underline;
		        margin-left: 10px;
		        cursor: pointer;
		      }
		    }
		  }

		  .main {
		    .proList_li {
		      li {
		        padding: 10px;
		        border-bottom: 1px solid #d3d3d3;
		      }

		      .clear {
		        font-size: 12px;
		        color: #666;
		        display: flex;
		        justify-content: space-between;
		        border-bottom: 1px solid #e3e3e3;

		        .pro_content_right {
		          display: flex;
		          align-items: center;
		        }
		      }

		      .proList_txt {
		        font-weight: 600;
		        margin-bottom: 5px;
		        color: #000;
		        font-size: 14px;
		        cursor: pointer;
		      }

		      .proList_btn {
		        display: flex;
		        align-items: center;
		        // width: 40%;
		        // text-align: right;
		        // position: relative;
		        // top: 25px;
		      }
		    }
		  }
		}
	}
</style>
