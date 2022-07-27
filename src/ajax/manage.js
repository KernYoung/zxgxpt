/**
 * 本模块主要用于监控管理
 */
import { ajax, redirectAjax, fileAjax, upLoadFile, newAjax } from './ajax.js'

//登录
async function login(param) {
  let login = await ajax.post(`/api/user/login`, param)
  return login
}
//最近搜索记录
async function latestWords(param) {
  let latestWords = await ajax.post(`/api/company/latestWords`, param)
  return latestWords
}

//搜索
async function getSearchList(param) {
  let getSearchList = await ajax.post(`/api/company/searchList`, param)
  return getSearchList
}

//用户管理查询
async function getUserList(param) {
  //let getUserList = await ajax.post(`/api/user/searchUserList`, param)
  let getUserList = await ajax.post(`/api/user/searchUserListNew`, param)
  return getUserList
}
//用户管理是否启用
async function updateUser(param) {
  let updateUser = await ajax.post(`/api/user/updateUser`, param)
  return updateUser
}
//pdf下载
async function getPDF(param) {
  let getPDF = await fileAjax.post(`/api/company/getPDF`, param)
  return getPDF
}
//中信保pdf下载
async function getPDFList(param) {
  let getPDFList = await ajax.post(`/api/company/getPDFList`, param)
  return getPDFList
}

//关注清单列表
async function getCareList(param) {
  let getCareList = await ajax.post(`/api/user/getCareList`, param)
  return getCareList
}
//关注/取消关注
async function careOrNot(param) {
  let careOrNot = await ajax.post(`/api/user/careOrNot`, param)
  return careOrNot
}
//申请中信保报告
async function zhongxinbao(param) {
  let zhongxinbao = await ajax.post(`/api/company/zhongxinbao`, param)
  return zhongxinbao
}
//申请中信保报告-发起申请
async function zhongxinbaoApply(param) {
  let zhongxinbaoApply = await ajax.post(`/api/company/zhongxinbaoApply`, param)
  return zhongxinbaoApply
}
//申请中信保报告-发起申请
async function zhongxinbaoApprove(param) {
  let zhongxinbaoApprove = await ajax.post(`/api/company/zhongxinbaoApprove`, param)
  return zhongxinbaoApprove
}
//模糊接口查询
async function directSearchList(param) {
  let directSearchList = await ajax.post(`/api/company/direct/searchList`, param)
  return directSearchList
}
//获取企业关注信息
async function getCareStatus(param) {
  let getCareStatus = await ajax.post(`/api/user/getCareStatus`, param)
  return getCareStatus
}
//获取省市区县信息
async function getArea(param) {
  let getArea = await ajax.post(`/api/common/getArea`, param)
  return getArea
}
//获取用户信息
async function getUserInfo(param) {
  let getUserInfo = await ajax.post(`/api/user/getUserInfo`, param)
  return getUserInfo
}
//查询clientNo
async function getCodeInfo(param) {
  let getCodeInfo = await ajax.post(`/api/company/getCodeInfo`, param)
  return getCodeInfo
}
//查询clientNo 只根据当前登录人
async function getCodeInfoByUserId(param) {
  let getCodeInfoByUserId = await ajax.post(`/api/company/getCodeInfoByUserId`, param)
  return getCodeInfoByUserId
}
//公司下拉框查询
async function getNewCompany(param) {
  let getNewCompany = await ajax.post(`/api/company/getNewCompany`, param)
  return getNewCompany
}
//获取html
async function getHtml(param) {
  let getHtml = await ajax.post(`/api/company/zhongChengXin/getLiteRatingHtml`, param)
  return getHtml
}
async function getData(param) {
  let getData = await newAjax.get(`/tycApi/services/open/search/2.0?word=` + param)
  return getData
}
//获取行业数据
async function getIndustry(param) {
  let getIndustry = await ajax.post(`/api/common/getIndustry`, param)
  return getIndustry
}
//产业信用评价下载
// async function getLiteRatingPDF (param) {
//     let getLiteRatingPDF = await fileAjax.post(`/api/company/zhongChengXin/getLiteRatingPDF`, param)
//     return getLiteRatingPDF
// }
async function getLiteRatingPDF(param) {
  let getLiteRatingPDF = await fileAjax.post(`/api/company/zhongChengXin/getReportPDF`, param)
  return getLiteRatingPDF
}
//企业基本信息
async function getBaseInfo(param) {
  let getBaseInfo = await ajax.post(`/api/company/getBaseInfo`, param)
  return getBaseInfo
}
//根据企业名字获取企业基本信息
async function getCompanyInfoByName(param) {
  let getCompanyInfoByName = await ajax.post(`/api/company/getCompanyInfoByName`, param)
  return getCompanyInfoByName
}
async function getLiteRatingList(param) {
  let getLiteRatingList = await ajax.post(`/api/company/zhongChengXin/getLiteRatingList`, param)
  return getLiteRatingList
}
//查询所有类型的历史报告
async function getReportList(param) {
  let getReportList = await ajax.post(`/api/company/zhongChengXin/getReportList`, param)
  return getReportList
}
//风险初筛html
async function getRiskScreenHtml(param) {
  let getRiskScreenHtml = await ajax.post(`/api/company/zhongChengXin/getRiskScreenHtml`, param)
  return getRiskScreenHtml
}
//财务排雷html
async function getLatestFinancialDeminingHtml(param) {
  let getLatestFinancialDeminingHtml = await ajax.post(
    `/api/company/zhongChengXin/getLatestFinancialDeminingHtml`,
    param
  )
  return getLatestFinancialDeminingHtml
}
//城投企业信用评价
async function getCityInvRatingHtml(param) {
  let getCityInvRatingHtml = await ajax.post(`/api/company/zhongChengXin/getCityInvRatingHtml`, param)
  return getCityInvRatingHtml
}
//区域信用评价
async function getRegionRatingHtml(param) {
  let getRegionRatingHtml = await ajax.post(`/api/company/zhongChengXin/getRegionRatingHtml`, param)
  return getRegionRatingHtml
}
//黑名单
async function getBlackList(param) {
  let getBlackList = await ajax.post(`/api/common/getBlackList`, param)
  return getBlackList
}
//
async function getRegionInfo(param) {
  let getRegionInfo = await ajax.post(`/api/company/zhongChengXin/getRegionInfo`, param)
  return getRegionInfo
}
//中信保基本信息
async function getBusinessInfo(param) {
  let getBusinessInfo = await ajax.post(`/api/company/zhongxinbao/getBusinessInfo`, param)
  return getBusinessInfo
}
// 获取摘要窗口所需要的信息
async function getAllBusinessInfoNoToken(param) {
  let getAllBusinessInfoNoToken = await ajax.post(`/api/company/zhongxinbao/getAllBusinessInfoNoToken`, param)
  return getAllBusinessInfoNoToken
}
// 获取摘要窗口所需要的信息
async function getAllBusinessInfo(param) {
  let getAllBusinessInfo = await ajax.post(`/api/company/zhongxinbao/getAllBusinessInfo`, param)
  return getAllBusinessInfo
}
//中信保接口
async function getShareInfo(param) {
  let getShareInfo = await ajax.post(`/api/company/zhongxinbao/getShareInfo`, param)
  return getShareInfo
}
//国家代码接口
async function getNationCode(param) {
  let getNationCode = await ajax.post(`/api/common/getNationCode`, param)
  return getNationCode
}
//权限
async function verifyPermissions(param) {
  let verifyPermissions = await ajax.post(`/api/user/verifyPermissions`, param)
  return verifyPermissions
}
//维护用户的时候的公司列表
async function getUserCompany(param) {
  let getUserCompany = await ajax.post(`/api/common/getUserCompany`, param)
  return getUserCompany
}

// //维护用户的时候的公司列表
// async function getUserRole () {
//     let getUserRole = await ajax.post(`/api/common/getUserRole`)
//     return getUserRole
// }
//获取操作者对某个用户操作修改能拿到的权限
async function getEnablePermission(param) {
  let getEnablePermission = await ajax.post(`/api/user/getEnablePermission`, param)
  return getEnablePermission
}
//校验工号是否唯一
async function userExists(param) {
  let userExists = await ajax.post(`/api/user/userExists`, param)
  return userExists
}
//同步用户启用状态到FR
async function updateUserStatus(param) {
  let updateUserStatus = await ajax.post(`/api/user/updateUserStatus`, param)
  return updateUserStatus
}
//获取信保报告列表（全部）
async function getPDFListAll(param) {
  let getPDFListAll = await ajax.post(`/api/company/getPDFListAll`, param)
  return getPDFListAll
}
//获取我的信保报告
async function getApplyProgressList(param) {
  let getApplyProgressList = await ajax.post(`/api/company/getApplyProgressList`, param)
  return getApplyProgressList
}
//获取我的信保报告
async function getApplyProgressListNoToken(param) {
  let getApplyProgressListNoToken = await ajax.post(`/api/company/getApplyProgressListNoToken`, param)
  return getApplyProgressListNoToken
}
//记录日志
async function logPath(param) {
  let logPath = await ajax.post(`/api/common/logCreditOper`, param)
  return logPath
}
//信保报告申请列表
async function searchApplyList(param) {
  let searchApplyList = await ajax.post(`/api/common/searchApplyList`, param)
  return searchApplyList
}
//获取组织架构树信息
async function getAllCompanyLevel(param) {
  let getAllCompanyLevel = await ajax.post(`/api/company/getAllCompanyLevel`, param)
  return getAllCompanyLevel
}

async function getCompanyIDVerification(param) {
  let getCompanyIDVerification = await ajax.post(`/api/company/getCompanyIDVerification`, param)
  return getCompanyIDVerification
}

async function getAllRole(param) {
  let getAllRole = await ajax.post(`/api/user/getAllRole`, param)
  return getAllRole
}

async function saveOrEditRole(param) {
  let saveOrEditRole = await ajax.post(`/api/user/saveOrEditRole`, param)
  return saveOrEditRole
}

async function getRolePermission(param) {
  let getRolePermission = await ajax.post(`/api/user/getRolePermission`, param)
  return getRolePermission
}

async function getRole(param) {
  let getRole = await ajax.post(`/api/user/getRole`, param)
  return getRole
}

async function roleNameExists(param) {
  let roleNameExists = await ajax.post(`/api/user/roleNameExists`, param)
  return roleNameExists
}

// async function getUserManual (param) {
//     let getUserManual = await ajax.post(`/api/company/getUserManual`, param)
//     return getUserManual
// }

async function getReviewer(param) {
  let getReviewer = await ajax.post(`/api/user/getReviewer`, param)
  return getReviewer
}

async function saveInitialScreeningOfMerchants(param) {
  let saveInitialScreeningOfMerchants = await ajax.post(`/api/common/saveInitialScreeningOfMerchants`, param)
  return saveInitialScreeningOfMerchants
}

async function getSearchFillInInfo(param) {
  let getSearchFillInInfo = await ajax.post(`/api/common/getSearchFillInInfo`, param)
  return getSearchFillInInfo
}

async function getMerchantsViewResults(param) {
  let getMerchantsViewResults = await ajax.post(`/api/common/getMerchantsViewResults`, param)
  return getMerchantsViewResults
}
// 判断当前企业在不在黑名单列表中
async function getIsBlack(param) {
  let getIsBlack = await ajax.post(`/api/common/getIsBlack`, param)
  return getIsBlack
}
// 查询黑名单申请结果列表
async function getAllBlackListResultList(param) {
  let getAllBlackListResultList = await ajax.post(`/api/common/getAllBlackListResultList`, param)
  return getAllBlackListResultList
}

// 查询黑名单审批列表
async function getBlacklistApprovalList(param) {
  let getBlacklistApprovalList = await ajax.post(`/api/common/getBlacklistApprovalList`, param)
  return getBlacklistApprovalList
}

//文件下载
async function downloadDocument(param) {
  let downloadDocument = await fileAjax.post(`/api/common/downloadDocument`, param)
  return downloadDocument
}

//黑名单申请页面获取所有公司名称
async function getCompayNameAndCreditCode(param) {
  let getCompayNameAndCreditCode = await ajax.post(`/api/company/getCompayNameAndCreditCode`, param)
  return getCompayNameAndCreditCode
}
// 黑名单申请时候判断是否已经申请
async function getCompanyStatus(param) {
  let getCompanyStatus = await ajax.post(`/api/company/getCompanyStatus`, param)
  return getCompanyStatus
}

// 文件上传
async function uploadFile(param) {
  let uploadFile = await upLoadFile.post(`/api/common/uploadFile`, param)
  return uploadFile
}
// 文件删除
async function deleteFile(param) {
  let deleteFile = await ajax.post(`/api/common/deleteFile`, param)
  return deleteFile
}

// 黑名单申请、编辑、续期、取消续期
async function saveOrEdit(param) {
  let saveOrEdit = await ajax.post(`/api/common/saveOrEdit`, param)
  return saveOrEdit
}

//  消息中心  获取企业名称列表
async function getCompayNameList(param) {
  let getCompayNameList = await ajax.post(`/api/company/getCompayNameList`, param)
  return getCompayNameList
}
//  消息中心  获取事件类型列表
async function getEventTypeList(param) {
  let getEventTypeList = await ajax.post(`/api/common/getEventTypeList`, param)
  return getEventTypeList
}
// 消息中心 获取列表数据
async function getRealTimeWarning(param) {
  let getRealTimeWarning = await ajax.post(`/api/common/getRealTimeWarning`, param)
  return getRealTimeWarning
}
// 消息中心 风险早报 and 新闻早报 获取企业名称列表
async function getZCXCompayNameList(param) {
  let getZCXCompayNameList = await ajax.post(`/api/company/getZCXCompayNameList`, param)
  return getZCXCompayNameList
}

// 消息中心 平台消息
async function getPlatformNews(param) {
  let getPlatformNews = await ajax.post(`/api/common/getPlatformNews`, param)
  return getPlatformNews
}
// 消息中心 风险早报
async function getRiskMorningPost(param) {
  let getRiskMorningPost = await ajax.post(`/api/common/getRiskMorningPost`, param)
  return getRiskMorningPost
}
// 消息中心  新闻早报
async function getMorningNews(param) {
  let getMorningNews = await ajax.post(`/api/common/getMorningNews`, param)
  return getMorningNews
}

// 新增收件人
async function addPAFCUser(param) {
  let addPAFCUser = await ajax.post(`/api/common/addPAFCUser`, param)
  return addPAFCUser
}
// 更新收件人
async function updatePAFCUser(param) {
  let updatePAFCUser = await ajax.post(`/api/common/updatePAFCUser`, param)
  return updatePAFCUser
}
// 删除收件人
async function deletePAFCUser(param) {
  let deletePAFCUser = await ajax.post(`/api/common/deletePAFCUser`, param)
  return deletePAFCUser
}

// // 保存收件人
// async function savePAFCUser (param) {
//     let savePAFCUser = await ajax.post(`/api/common/savePAFCUser`, param)
//     return savePAFCUser
// }
// 查询版本信息
async function getPAFCVersionList(param) {
  let getPAFCVersionList = await ajax.post(`/api/common/getPAFCVersionList`, param)
  return getPAFCVersionList
}
// 查询点数分配情况
async function getPAFCPointsList(param) {
  let getPAFCPointsList = await ajax.post(`/api/common/getPAFCPointsList`, param)
  return getPAFCPointsList
}

// 查询人员
async function getPAFCUserInfoList(param) {
  let getPAFCUserInfoList = await ajax.post(`/api/common/getPAFCUserInfoList`, param)
  return getPAFCUserInfoList
}

// 查询收件人
async function getRecipientInfoList(param) {
  let getRecipientInfoList = await ajax.post(`/api/common/getRecipientInfoList`, param)
  return getRecipientInfoList
}

// 保存版本信息
async function savePAFCVersion(param) {
  let savePAFCVersion = await ajax.post(`/api/common/savePAFCVersion`, param)
  return savePAFCVersion
}

// 保存点数分配信息
async function savePAFCPoints(param) {
  let savePAFCPoints = await ajax.post(`/api/common/savePAFCPoints`, param)
  return savePAFCPoints
}

// 将二级公司同步到填报公司表
async function syncODSCompany2PAFCCompany(param) {
  let syncODSCompany2PAFCCompany = await ajax.post(`/api/common/syncODSCompany2PAFCCompany`, param)
  return syncODSCompany2PAFCCompany
}

// 获取黑名单详情信息
async function getBlackListDetailList(param) {
  let getBlackListDetailList = await ajax.post(`/api/common/getBlackListDetailList`, param)
  return getBlackListDetailList
}

// 获取灰名单信息
async function getGreyList(param) {
  let getGreyList = await ajax.post(`/api/common/getGreyList`, param)
  return getGreyList
}
// 判断是否是灰名单
async function getIsGrey(param) {
  let getIsGrey = await ajax.post(`/api/common/getIsGrey`, param)
  return getIsGrey
}
// 获取二级公司
async function getLV2Company(param) {
  let getLV2Company = await ajax.post(`/api/company/getLV2Company`, param)
  return getLV2Company
}

// 获取token list
async function getTokenList(param) {
  let getTokenList = await ajax.post(`/api/common/getTokenList`, param)
  return getTokenList
}

// 更新天眼查token状态(启用/停用)
async function updateOpenAPIStatus(param) {
  let updateOpenAPIStatus = await ajax.post(`/api/common/updateOpenAPIStatus`, param)
  return updateOpenAPIStatus
}

// 获取下发给成员公司的token
async function getTokenRelation(param) {
  let getTokenRelation = await ajax.post(`/api/common/getTokenRelation`, param)
  return getTokenRelation
}

// 保存成员公司下发的token前三码
async function saveTokenRelation(param) {
  let saveTokenRelation = await ajax.post(`/api/common/saveTokenRelation`, param)
  return saveTokenRelation
}

// 保存成员公司下发的token前三码
async function saveToken(param) {
  let saveToken = await ajax.post(`/api/common/saveToken`, param)
  return saveToken
}

// 获取接口次数限制列表
async function getInterfaceLimitList(param) {
  let getInterfaceLimitList = await ajax.post(`/api/common/getInterfaceLimitList`, param)
  return getInterfaceLimitList
}

// 保存接口次数限制列表
async function saveInterfaceLimit(param) {
  let saveInterfaceLimit = await ajax.post(`/api/common/saveInterfaceLimit`, param)
  return saveInterfaceLimit
}

async function getReportFromFTP(param) {
  let getReportFromFTP = await fileAjax.post(`/api/company/zhongChengXin/getReportFromFTP`, param)
  return getReportFromFTP
}

async function deleteTokenRelation(param) {
  let deleteTokenRelation = await ajax.post(`/api/common/deleteTokenRelation`, param)
  return deleteTokenRelation
}

async function tokenValidate(param) {
  let tokenValidate = await ajax.post(`/api/common/tokenValidate`, param)
  return tokenValidate
}

//验证是否有相同的token前三码
async function tokenPrefixValidate(param) {
  let tokenPrefixValidate = await ajax.post(`/api/common/tokenPrefixValidate`, param)
  return tokenPrefixValidate
}

async function deleteInterfaceLimit(param) {
  let deleteInterfaceLimit = await ajax.post(`/api/common/deleteInterfaceLimit`, param)
  return deleteInterfaceLimit
}

//判断某时间范围内，某公司是否有中诚信报告
async function reportExist(param) {
  let reportExist = await ajax.post(`/api/report/zhongChengXin/reportExist`, param)
  return reportExist
}

//查看信保代码维护
async function getClientNoMaintainList(param) {
  let getClientNoMaintainList = await ajax.post(`/api/common/getClientNoMaintainList`, param)
  return getClientNoMaintainList
}
//信保代码维护列表查询
async function getXbMapping(param) {
  let getXbMapping = await ajax.post(`/api/common/ZXB/getXbMapping`, param)
  return getXbMapping
}

//信保代码修改
async function saveXbMapping(param) {
  let saveXbMapping = await ajax.post(`/api/common/ZXB/SaveXbMapping`, param)
  return saveXbMapping
}
//组织架构维护-树查询
async function getHrOrgEnable(param) {
  let getHrOrg = await ajax.post(`/api/common/ZXB/getHrOrgEnable`, param)
  return getHrOrg
}
//组织架构维护-查询
async function getHrOrg(param) {
  let getHrOrg = await ajax.post(`/api/common/ZXB/getHrOrg`, param)
  return getHrOrg
}
//组织架构维护-新增、编辑
async function SaveHrOrg(param) {
  let SaveHrOrg = await ajax.post(`/api/common/ZXB/SaveHrOrg`, param)
  return SaveHrOrg
}
//组织架构维护-编码、名称校验
async function checkCompany(param) {
  let checkCompany = await ajax.post(`/api/visitLog/checkCompany`, param)
  return checkCompany
}
//查看国别-紧急度对照表
async function getSpeedMapping(param) {
  let getSpeedMapping = await ajax.post(`/api/common/ZXB/getSpeedMapping`, param)
  return getSpeedMapping
}
async function uploadSpeedMapping(param) {
  let uploadSpeedMapping = await ajax.post(`/api/common/ZXB/uploadSpeedMapping`, param)
  return uploadSpeedMapping
}
async function verifyPassword(param) {
  let verifyPassword = await ajax.post(`/api/user/verifyPassword`, param)
  return verifyPassword
}
//修改密码
async function modifyPassword(param) {
  let modifyPassword = await ajax.post(`/api/user/modifyPassword`, param)
  return modifyPassword
}
const manage = {
  modifyPassword,
  verifyPassword,
  getSpeedMapping,
  uploadSpeedMapping,
  login: login,
  latestWords: latestWords,
  getSearchList: getSearchList,
  getUserList: getUserList,
  getPDF: getPDF,
  getPDFList: getPDFList,
  updateUser: updateUser,
  getCareList: getCareList,
  careOrNot: careOrNot,
  zhongxinbao: zhongxinbao,
  zhongxinbaoApply: zhongxinbaoApply,
  zhongxinbaoApprove: zhongxinbaoApprove,
  directSearchList: directSearchList,
  getCareStatus: getCareStatus,
  getArea: getArea,
  getUserInfo: getUserInfo,
  getCodeInfo: getCodeInfo,
  getCodeInfoByUserId: getCodeInfoByUserId,
  getNewCompany: getNewCompany,
  getHtml: getHtml,
  getData: getData,
  getIndustry: getIndustry,
  getLiteRatingPDF: getLiteRatingPDF,
  getBaseInfo: getBaseInfo,
  getCompanyInfoByName: getCompanyInfoByName,
  getLiteRatingList: getLiteRatingList,
  getReportList: getReportList,
  getRiskScreenHtml: getRiskScreenHtml,
  getCityInvRatingHtml: getCityInvRatingHtml,
  getRegionRatingHtml: getRegionRatingHtml,
  getBlackList: getBlackList,
  getRegionInfo: getRegionInfo,
  getShareInfo: getShareInfo,
  getBusinessInfo: getBusinessInfo,
  getAllBusinessInfo: getAllBusinessInfo,
  getAllBusinessInfoNoToken: getAllBusinessInfoNoToken,
  getNationCode: getNationCode,
  verifyPermissions: verifyPermissions,
  getUserCompany: getUserCompany,
  // getUserRole: getUserRole,
  getEnablePermission: getEnablePermission,
  userExists: userExists,
  updateUserStatus: updateUserStatus,
  getLatestFinancialDeminingHtml: getLatestFinancialDeminingHtml,
  getPDFListAll: getPDFListAll,
  getApplyProgressList: getApplyProgressList,
  getApplyProgressListNoToken: getApplyProgressListNoToken,
  logPath: logPath,
  searchApplyList: searchApplyList,
  getAllCompanyLevel: getAllCompanyLevel,
  getCompanyIDVerification: getCompanyIDVerification,
  getAllRole: getAllRole,
  saveOrEditRole: saveOrEditRole,
  getRolePermission: getRolePermission,
  getRole: getRole,
  roleNameExists: roleNameExists,
  // getUserManual:getUserManual,
  getReviewer: getReviewer,
  saveInitialScreeningOfMerchants: saveInitialScreeningOfMerchants,
  getSearchFillInInfo: getSearchFillInInfo,
  getMerchantsViewResults: getMerchantsViewResults,
  getIsBlack: getIsBlack,
  getAllBlackListResultList: getAllBlackListResultList,
  downloadDocument: downloadDocument,
  getCompayNameAndCreditCode: getCompayNameAndCreditCode,
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  saveOrEdit: saveOrEdit,
  getBlacklistApprovalList: getBlacklistApprovalList,
  getCompayNameList: getCompayNameList,
  getEventTypeList: getEventTypeList,
  getRealTimeWarning: getRealTimeWarning,
  getZCXCompayNameList: getZCXCompayNameList,
  getPlatformNews: getPlatformNews,
  getRiskMorningPost: getRiskMorningPost,
  getMorningNews: getMorningNews,
  getCompanyStatus: getCompanyStatus,
  // savePAFCUser:savePAFCUser,
  addPAFCUser: addPAFCUser,
  updatePAFCUser: updatePAFCUser,
  deletePAFCUser: deletePAFCUser,
  savePAFCVersion: savePAFCVersion,
  savePAFCPoints: savePAFCPoints,
  getPAFCVersionList: getPAFCVersionList,
  getPAFCPointsList: getPAFCPointsList,
  getPAFCUserInfoList: getPAFCUserInfoList,
  getRecipientInfoList: getRecipientInfoList,
  syncODSCompany2PAFCCompany: syncODSCompany2PAFCCompany,
  getBlackListDetailList: getBlackListDetailList,
  // getBlackListAll:getBlackListAll,
  getGreyList: getGreyList,
  getIsGrey: getIsGrey,
  getLV2Company: getLV2Company,
  getTokenList: getTokenList,
  updateOpenAPIStatus: updateOpenAPIStatus,
  getTokenRelation: getTokenRelation,
  saveTokenRelation: saveTokenRelation,
  saveToken: saveToken,
  getInterfaceLimitList: getInterfaceLimitList,
  saveInterfaceLimit: saveInterfaceLimit,
  getReportFromFTP: getReportFromFTP,
  deleteTokenRelation: deleteTokenRelation,
  tokenValidate: tokenValidate,
  tokenPrefixValidate: tokenPrefixValidate,
  deleteInterfaceLimit: deleteInterfaceLimit,
  reportExist: reportExist,
  getClientNoMaintainList: getClientNoMaintainList,
  saveXbMapping: saveXbMapping,
  getXbMapping: getXbMapping,
  getHrOrg,
  SaveHrOrg,
  getHrOrgEnable,
  checkCompany,
}

export default manage
