import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
            }

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
        let token = sessionStorage.getItem('username');
        if (token === null || token === '') {
            next('/');
        } else {
            next();
        }
    }
});
export default router
