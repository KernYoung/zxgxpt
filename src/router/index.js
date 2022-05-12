import Vue from 'vue'
import ajax from '@/ajax/index.js'
Vue.prototype.$ajax = ajax
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cookies from 'js-cookie'
Vue.prototype.$Cookies = Cookies
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     redirect: '/homeLogin'
    // },
    {
        path: '/',
        name: 'homeLogin',
        component: () => import('../views/HomeLogin.vue')
    },
	{
	    path: '/xinTuoCompanyBasicInfo',
	    name: 'XinTuoCompanyBasicInfo',
	    component: () => import('../views/XinTuoCompanyBasicInfo.vue')
	},
    {
        path: '/homePage',
        name: 'Home',
        component: Home,
        children: [
            // {
            //     path: '/',
            //     redirect: '/homePage'
            // },
            {
                path: '/',
                name: 'homePage',
                component: () => import('../views/HomePage.vue')
            },
            {
                path: '/userManage',
                name: 'UserManage',
                component: () => import('../views/UserManage.vue')
            },
            {
                path: '/messageCenter',
                name: 'MessageCenter',
                component: () => import('../views/messageCenter.vue')
            },
            {
                path: '/essInfo',
                name: 'EssInfo',
                component: () => import('../views/EssInfo.vue')
            },
			
            {
                path: '/iframePage',
                name: 'IframePage',
                component: () => import('../views/components/IframePage.vue')
            },
            {
                path: '/report/creditEvaluate',
                name: 'CreditEvaluate',
                component: () => import('../views/report/CreditEvaluate.vue')
            },
            {
                path: '/report/riskScreen',
                name: 'RiskScreen',
                component: () => import('../views/report/RiskScreen.vue')
            },
            {
                path: '/report/cityInvEvaluate',
                name: 'CityInvEvaluate',
                component: () => import('../views/report/CityInvEvaluate.vue')
            },
            {
                path: '/report/areaCreditEvaluate',
                name: 'AreaCreditEvaluate',
                component: () => import('../views/report/AreaCreditEvaluate.vue')
            },
			{
			    path: '/report/financialDemining',
			    name: 'FinancialDemining',
			    component: () => import('../views/report/FinancialDemining.vue')
			},
			{
			    path: '/searchResult',
			    name: 'SearchResult',
			    component: () => import('../views/SearchResult.vue')
			},
            {
                path: '/zxbReportList',
                name: 'zxbReportList',
                component: ()=> import('../views/zxbReportList')
            },
            {
                path: '/ZxbApplyList',
                name: 'ZxbApplyList',
                component: ()=> import('../views/ZxbApplyList')
            },
			{
			    path: '/zxbApplyProgressList',
			    name: 'zxbApplyProgressList',
			    component: ()=> import('../views/zxbApplyProgressList')
			},
            {
                path: '/zxbMessageList',
                name: 'zxbMessageList',
                component: ()=> import('../views/zxbMessageList')
            },
            {
                path: '/tycPointsDistribute',
                name: 'tycPointsDistribute',
                component: ()=> import('../views/tycPointsDistribute')
            },

            {
                path: '/zxbReportSummary',
                name: 'zxbReportSummary',
                component: ()=> import('../views/zxbReportSummary')
            },
            {
                path: '/RoleManage',
                name: 'RoleManage',
                component: ()=> import('../views/RoleManage')
            },
            {
                path: '/InitialScreeningOfMerchants',
                name: 'InitialScreeningOfMerchants',
                component: ()=> import('../views/InitialScreeningOfMerchants')
            },
            {
                path: '/ResultsView',
                name: 'ResultsView',
                component: ()=> import('../views/ResultsView')
            },
            {
                path: '/BlackListDeclaration',
                name: 'BlackListDeclaration',
                component: ()=> import('../views/BlackListDeclaration')
            },
            {
                path: '/BlacklistApproval',
                name: 'BlacklistApproval',
                component: ()=> import('../views/BlacklistApproval')
            },
            {
                path: '/InterfaceDownload',
                name: 'InterfaceDownload',
                component: ()=> import('../views/InterfaceDownload')
            },
            {
                path: '/BlackListDetail',
                name: 'BlackListDetail',
                component: ()=> import('../views/BlackListDetail')
            },
            {
                path: '/TokenManage',
                name: 'TokenManage',
                component: ()=> import('../views/TokenManage')
            },
            {
                path: '/InterfaceUsedLimit',
                name: 'InterfaceUsedLimit',
                component: ()=> import('../views/InterfaceUsedLimit')
            },
            {
                path: '/ClientNoMaintain',
                name: 'ClientNoMaintain',
                component: ()=> import('../views/ClientNoMaintain')
            },

        ]
    },

]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next();
    } else {
			if(to.path.startsWith('/xinTuoCompanyBasicInfo') && to.fullPath.indexOf('userName') != -1 && to.fullPath.indexOf('sign') != -1){
			    var index = to.fullPath.lastIndexOf('userName')
							var signIndex = to.fullPath.lastIndexOf('sign')
							var lastYu = to.fullPath.lastIndexOf('&')
							var username = to.fullPath.substring(index+8+1,lastYu)
							var sign = to.fullPath.substring(signIndex+4+1)
							var path = to.fullPath.substring(0,index-1)
							let param = {
							    username:username,
								sign:sign
							}
							ajax.manage.login(param).then(res => {
								  if (res.data.code === '0') {
									  Cookies.set("token", res.data.token, {
									    expires: 30
									  });
									  Cookies.set('username', res.data.name, {
									    expires: 30
									  });
									  Cookies.set('userCode', res.data.username, {
									    expires: 30
									  });
									  Cookies.set('userId', res.data.userId, {
									    expires: 30
									  });
									  sessionStorage.setItem('username', res.data.name);
									  sessionStorage.setItem('userCode', res.data.username);
									  sessionStorage.setItem('userId', res.data.userId);
							          window.location.href =path									
								   }else{
									   next('/')
								   }
								}) 							
									next();									
				}
			else if(to.path.startsWith('/zxbReportSummary')){
            // else if(to.path.startsWith('/zxbReportSummary') && to.fullPath.indexOf('userName') != -1){
                    // var index = to.fullPath.lastIndexOf('userName')
                    // var signIndex = to.fullPath.lastIndexOf('sign')
                    // var lastYu = to.fullPath.lastIndexOf('&')
                    // var username = to.fullPath.substring(index+8+1,lastYu)
                    // var sign = to.fullPath.substring(signIndex+4+1)
                    // var path = to.fullPath.substring(0,index-1)
                    // var param = {
                    //     username:username,
                    //     sign:sign
                    // }
                    // ajax.manage.login(param).then(res => {
                    //     if (res.data.code === '0') {
                    //         Cookies.set("token", res.data.token, {
                    //             expires: 30
                    //         });
                    //         Cookies.set('username', res.data.name, {
                    //             expires: 30
                    //         });
                    //         Cookies.set('userCode', res.data.username, {
                    //             expires: 30
                    //         });
                    //         Cookies.set('userId', res.data.userId, {
                    //             expires: 30
                    //         });
                    //         sessionStorage.setItem('username', res.data.name);
                    //         sessionStorage.setItem('userCode', res.data.username);
                    //         sessionStorage.setItem('userId', res.data.userId);
                    //         window.location.href =path
                    //     }else{
                    //         next('/')
                    //     }
                    // })
                    next();
			    }
				else{
					let token = sessionStorage.getItem('username');

                    if (token === null || token === '') {
                        next('/');
                    } else {
                        next();
                    }
		    }
    }
});
export default router