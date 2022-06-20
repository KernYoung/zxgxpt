//访问日志模块
import { ajax, redirectAjax, fileAjax,upLoadFile ,newAjax } from './ajax.js'

//系统访问次数折线图
async function getUserVisitn (param) {
    let getUserVisitn = await ajax.post(`/api/visitLog/getUserVisit`, param)
    return getUserVisitn
}

//用户访问统计-用户访问明细
async function getUserVisitList (param) {
    let getUserVisitList = await ajax.post(`/api/visitLog/getUserVisitList`, param)
    return getUserVisitList
}

//用户访问统计-用户页面访问明细
async function getUserBehavior (param) {
    let getUserBehavior = await ajax.post(`/api/visitLog/getUserBehavior`, param)
    return getUserBehavior
}

//用户访问统计-统计月报
async function getLogMonth (param) {
    let getLogMonth = await ajax.post(`/api/visitLog/getLogMonth`, param)
    return getLogMonth
}

//信保报告使用情况-信保报告使用
async function getXbReportUse (param) {
    let getXbReportUse = await ajax.post(`/api/report/getXbReportUse`, param)
    return getXbReportUse
}
//信保报告使用情况-在库报告使用情况
async function getXbReportUseByCompany (param) {
    let getXbReportUseByCompany = await ajax.post(`/api/report/getXbReportUseByCompany`, param)
    return getXbReportUseByCompany
}

//评级报告使用情况-中诚信使用情况
async function getZcxReportUse (param) {
    let getZcxReportUse = await ajax.post(`/api/report/getZcxReportUse`, param)
    return getZcxReportUse
}

//评级报告使用情况-中诚信申请情况
async function getZcxReportUseList (param) {
    let getZcxReportUseList = await ajax.post(`/api/report/getZcxReportUseList`, param)
    return getZcxReportUseList
}

//评级报告使用情况-中诚信添加监控情况
async function getMonitoring (param) {
    let getMonitoring = await ajax.post(`/api/report/getMonitoring`, param)
    return getMonitoring
}

//评级报告使用情况-天眼查使用情况
async function getTycUse (param) {
    let getTycUse = await ajax.post(`/api/report/getTycUse`, param)
    return getTycUse
}

//评级报告使用情况-客商初筛调用次数
async function getCustomFilter (param) {
    let getCustomFilter = await ajax.post(`/api/report/getCustomFilter`, param)
    return getCustomFilter
}

//评级报告使用情况-页面热度统计
async function getPageActive (param) {
    let getPageActive = await ajax.post(`/api/report/getPageActive`, param)
    return getPageActive
}

//评级报告使用情况-模糊查询记录
async function getLikeQuery (param) {
    let getLikeQuery = await ajax.post(`/api/report/getLikeQuery`, param)
    return getLikeQuery
}
//公司名称
async function getCompanyList (param) {
    let getCompanyList = await ajax.post(`/api/visitLog/getCompanyList`, param)
    return getCompanyList
}

const visitLog={
    getUserVisitn,
    getUserVisitList,
    getUserBehavior,
    getLogMonth,
    getXbReportUse,
    getZcxReportUse,
    getZcxReportUseList,
    getMonitoring,
    getTycUse,
    getCustomFilter,
    getPageActive,
    getLikeQuery,
    getXbReportUseByCompany,
    getCompanyList
}

export default visitLog