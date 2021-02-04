<template>
  <!-- 主页布局 -->
  <div class="home">
    <div class="header" v-if="$route.path!='/'&&$route.path!='/homePage'">
      <Header></Header>
    </div>
    <div class="content">
      <router-view />
      <span class="button-wrapper" v-if="$Cookies.get(this.$getCookieKey())">
        <el-badge :is-dot="newMsg" class="item">
          <el-popover placement="left-end" width="300" trigger="click" title="消息提醒">
            <div class="message-wrapper">
              <div class="message-box" v-for="(item,index) in messageData" :key="index">
                <div class="message-content">
                  <i class="el-icon-s-promotion" style="margin-right: 5px;color:#617be3"></i>
                  <div class="content-right">{{item.content}}</div>
                </div>
                <!-- <div class="message-bottom">
								<span>{{item.name}}</span>
								<span>{{item.date}}</span>
							</div> -->
              </div>
            </div>
            <el-button type="success" icon="el-icon-message" circle slot="reference" @click="checkMsg"></el-button>
          </el-popover>
        </el-badge>
      </span>
    </div>
    <!-- <div class="footer-box" v-if="this.$route.path!='/essInfo'">
            <p>COPYRIGHT &copy; ICP许可证：苏B2-20190525</p>
            <p>备案号：苏ICP备16066248号</p>
        </div> -->
  </div>
</template>

<script>
import Header from '../components/header.vue'
export default {
  name: 'Home',
  components: {
    Header
  },
  data () {
    return {
      messageData: [],
      websock: null,
      newMsg: false
    }
  },
  created () {
    console.log(this.$route)
    //this.messageData = JSON.parse(sessionStorage.getItem('msgData'))
    if (this.$Cookies.get(this.$getCookieKey())) {
      this.initWebSocket();
    } else {
      //this.websock.close()
    }
  },
  destroyed () {
    //this.websock.close() //离开路由之后断开websocket连接
  },
  methods: {
    initWebSocket () { //初始化weosocket
      const wsuri = `${process.env.VUE_APP_WS_URL}/webSocket/${this.$Cookies.get('userId')}`;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
      console.log(wsuri)
    },
    websocketonopen () { //连接建立之后执行send方法发送数据
      // let actions = {"test":"12345"};
      // this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror () {//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage (e) { //数据接收
      //console.log(e);
      let obj = {
        content: e.data
      }
      this.messageData.push(obj);
      //sessionStorage.setItem('msgData', JSON.stringify(this.messageData))
      this.newMsg = true;
      //const redata = JSON.parse(e.data);
      //console.log(sessionStorage.getItem('msgData'))
    },
    websocketsend (Data) {//数据发送
      this.websock.send(Data);
    },
    websocketclose (e) {  //关闭
      console.log('断开连接', e);
    },
    checkMsg () {
      this.newMsg = false;
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  box-sizing: border-box;
  height: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -weblit-flex;
  display: flex;
  flex-direction: column;
  .header {
  }
  .content {
    flex: 1;
    background-color: #efefef;
    overflow: auto;
    position: relative;
    .button-wrapper {
      position: fixed;
      bottom: 75px;
      right: 20px;
    }
  }
  .footer-box {
    padding: 7px;
    font-size: 14px;
    color: #fff;
    line-height: 25px;
    text-align: center;
    background: #263859;
  }
}
.message-wrapper {
  .message-box {
    padding: 5px;
    .message-content {
      display: flex;
      margin-bottom: 10px;
      .content-left {
        width: 46px;
        height: 46px;
        background-color: #409eff;
        border-radius: 50%;
        text-align: center;
        line-height: 46px;
        color: #fff;
        margin-right: 10px;
      }
      .content-right {
        flex: 1;
        font-size: 14px;
      }
    }
    .message-bottom {
      display: flex;
      justify-content: space-between;
      color: darkgray;
      margin-top: 10px;
    }
  }
}
</style>