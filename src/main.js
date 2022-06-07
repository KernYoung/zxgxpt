import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iconFont from './assets/css/iconfont.css'



Vue.config.productionTip = false

import less from 'less'
Vue.use(less)
//引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//公共style
import '@/styles/base.less'
//请求封装
import ajax from '@/ajax/index.js'
import md5 from 'js-md5';
Vue.prototype.$ajax = ajax
Vue.prototype.$md5 = md5;
import Cookies from 'js-cookie'
import { getCookieKey, getCookie,formatDate } from '@/assets/utils.js'
Vue.prototype.$getCookieKey = getCookieKey
Vue.prototype.$getCookie = getCookie
Vue.prototype.$Cookies = Cookies
Vue.prototype.$formatDate = formatDate
const sysTitle = '资信共享门户系统'
Vue.prototype.$sysTitle = sysTitle


//事件总线
import Bus from '@/assets/bus.js'
Vue.prototype.$Bus = Bus

import Es6Promise from 'es6-promise'
require('es6-promise').polyfill() 
Es6Promise.polyfill()
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
const getPageName = (page) => {
    if(!page||!page.path){
        return;
    }
    if(page.path.indexOf("homePage")>=0){
        return "首页"
    }else if(page.path.indexOf("userManage")>=0){
        return "用户管理"
    }else if(page.path.indexOf("messageCenter")>=0){
        return "消息中心"
    }else if(page.path.indexOf("essInfo")>=0){
        return "详情页"
    }else if(page.path.indexOf("creditEvaluate")>=0){
        return "产业企业信用评价"
    }else if(page.path.indexOf("riskScreen")>=0){
        return "风险初筛"
    }else if(page.path.indexOf("cityInvEvaluate")>=0){
        return "城投企业信用评价"
    }else if(page.path.indexOf("areaCreditEvaluate")>=0){
        return "区域信用评价"
    }else if(page.path.indexOf("financialDemining")>=0){
        return "财务排雷"
    }else if(page.path.indexOf("searchResult")>=0){
        return "搜索"
    }else if(page.path.indexOf("zxbReportList")>=0){
        return "信保报告列表"
    }else if(page.path.indexOf("InitialScreeningOfMerchants")>=0){
        return "客商初筛";
    }else if(page.path.indexOf("RoleManage")>=0){
        return "角色管理";
    }else if(page.path.indexOf("ResultsView")>=0){
        return "结果查看";
    }else if(page.path.indexOf("BlackListDeclaration")>=0){
        return "黑名单申报";
    }else if(page.path.indexOf("BlacklistApproval")>=0){
        return "黑名单审批";
    } else if(page.path.indexOf("iframePage")>=0){
        //let queryStr = decodeURIComponent(page.query.title)
        let queryStr = decodeURIComponent(JSON.stringify(page.query))
        if(queryStr&&queryStr.indexOf("黑名单申报")>0){
            return "黑名单申报"
        }else if(queryStr&&queryStr.indexOf("黑名单审批")>0){
            return "黑名单审批"
        }else if(queryStr&&queryStr.indexOf("客商填报")>0){
            return "客商填报"
        }
    }
}
router.afterEach((to, from, next) => {
    let param = {
        userName:Cookies.get("username"),
        userCode:Cookies.get("userCode"),
        formPath:from.path,
        formPageName:getPageName(from),
        toPath:to.path,
        toPageName:getPageName(to),
        queryPara:JSON.stringify(to.query)
    }
    ajax.manage.logPath(param);
})
