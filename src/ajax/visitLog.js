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

const visitLog={
    getUserVisitn,
    getUserVisitList,
    getUserBehavior,
    getLogMonth,
    getXbReportUse,
    getZcxReportUse,
    getZcxReportUseList,
    getMonitoring,
    getTycUse
}

export default visitLog