<!-- 首页 -->
<template>
  <div class="main-wrapper">
    <div class="search-content">
      <div class="header-box">
        <img src="../../public/img/logo2.png" alt="">
        <span>
          <el-button type="primary" @click="dialogVisible=true">登录</el-button>
        </span>
      </div>
      <div class="title">
        <div style="margin-bottom:10px"><img src="../../public/img/title.png" alt=""></div>
        <div><img src="../../public/img/subtitle.png" alt=""></div>
      </div>
      <div class="content">
        <el-input placeholder="请输入内容" v-model="searchVal" class="search-input" style="width: 800px;height:60px;"
          clearable="" @keyup.enter.native="seachContent">
        </el-input>
        <el-button @click="seachContent" style="background-color: rgb(73, 136, 191);margin-left: 10px;">站内搜索
        </el-button>
        <el-button @click="blarSearch">全网搜索</el-button>
      </div>
    </div>

    <el-dialog title="登录" :visible.sync="dialogVisible" width="450px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" style="width:250px" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  //inject: ['reload'],
  data () {
    return {
      searchVal: '',
      dialogVisible: false,
      form: {
        username: '',
        password: ''
      },
    }
  },
  mounted () {
    // if (sessionStorage.getItem('username')) {
    //   this.$Cookies.remove(this.$getCookieKey());
    //   this.$Cookies.remove('username');
    //   this.$Cookies.remove('userCode');
    //   this.$Cookies.remove('userId');
    //   sessionStorage.removeItem('username');
    //   sessionStorage.removeItem('userCode');
    //   sessionStorage.removeItem('userId');
    //   this.go(0)
    // }
    console.log(this.$route.query.tokenIsOut)
    if(this.$route.query.tokenIsOut){
      this.$message.error("您的帐号在另一地点登录，您已被迫下线");
      this.$route.query.tokenIsOut = false;
    }
    if (this.$route.query.username) {
      this.skipLogin();
    }
  },
  methods: {
    seachContent () {
      //未登录=>去登陆
      this.dialogVisible = true;
      this.$Bus.$emit('showDialog')
    },
    login () {
      //登录
      if (this.form.username === '') {
        this.$message.warning('请输入用户名');
        return;
      } else if (this.form.password === '') {
        this.$message.warning('请输入密码');
        return;
      }
      let param = {
        username: this.form.username,
        password: this.form.password,
      }
      this.$ajax.manage.login(param).then(res => {
        console.log(res);
        if (res.data.code === '0') {
          this.$Cookies.set(this.$getCookieKey(), res.data.token, { expires: 30 });
          this.$Cookies.set('username', res.data.name, { expires: 30 });
          this.$Cookies.set('userCode', res.data.username, { expires: 30 });
          this.$Cookies.set('userId', res.data.userId, { expires: 30 });
          this.$Cookies.set('companyCode', res.data.companyCode, { expires: 30 })
          this.$Cookies.set('companyName', res.data.companyName, { expires: 30 })
          sessionStorage.setItem('username', res.data.name);
          sessionStorage.setItem('userCode', res.data.username);
          sessionStorage.setItem('userId', res.data.userId);
          this.dialogVisible = false;
          this.loginUserName = res.data.name;
          this.$router.push({ path: '/homePage' });
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    skipLogin () {
      let param = {
        username: this.$route.query.username,
        loginType: 'skip',
      }
      this.$ajax.manage.login(param).then(res => {
        console.log(res);
        if (res.data.code === '0') {
          this.$Cookies.set(this.$getCookieKey(), res.data.token, { expires: 30 });
          this.$Cookies.set('username', res.data.name, { expires: 30 });
          this.$Cookies.set('userCode', res.data.username, { expires: 30 });
          this.$Cookies.set('userId', res.data.userId, { expires: 30 });
          this.$Cookies.set('companyCode', res.data.companyCode, { expires: 30 })
          this.$Cookies.set('companyName', res.data.companyName, { expires: 30 })
          sessionStorage.setItem('username', res.data.name);
          sessionStorage.setItem('userCode', res.data.username);
          sessionStorage.setItem('userId', res.data.userId);
          this.loginUserName = res.data.name;
          this.$router.push({ path: '/homePage' });
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    blarSearch () {
      //未登录=>去登陆
      this.dialogVisible = true;
      this.$Bus.$emit('showDialog')
    }
  },
}
</script>
<style>
.el-card {
  border: none;
  background: #f8f8f8;
}
</style>
<style lang="less" scoped>
.main-wrapper /deep/ {
  width: 100%;
  height: 100%;
  overflow: auto;
  .search-content {
    height: 515px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    background: url(../../public/img/bg.png) no-repeat;
    background-size: cover;
    .header-box {
      padding: 0 20px;
      height: 70px;
      background: none;
      display: flex;
      justify-content: space-between;
      color: #fff !important;
      line-height: 70px;
      position: relative;
      img {
        vertical-align: middle;
        position: relative;
        top: 10px;
    	height: 44px;
      }
    }
    .title {
      font-size: 40px;
      color: #fff;
      width: 100%;
      margin-top: 100px;
      margin-bottom: 20px;
    }
    .content {
      /deep/.el-button {
        border-radius: 0;
        height: 58px;
        width: 121px;
        background: #409eff;
        color: #fff;
        //border-top-right-radius: 38px;
        //border-bottom-right-radius: 38px;
        border: none;
        font-size: 20px;
        font-weight: bold;
      }
      /deep/.el-input__inner {
        height: 60px;
        line-height: 76px;
        font-size: 16px;
        //border-top-left-radius: 38px;
        //border-bottom-left-radius: 38px;
        padding: 0 30px;
        font-size: 20px;
        border: 1px solid #00f1fe;
        box-sizing: border-box;
        color: #9b9b9b;
        background: none;
      }
      /deep/.el-input-group__append,
      .el-input-group__prepend {
        border: none;
      }
    }
  }
}
</style>