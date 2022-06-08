//访问日志模块
import { ajax, redirectAjax, fileAjax,upLoadFile ,newAjax } from './ajax.js'

//系统访问次数折线图
async function getUserVisitn (param) {
    let api = await ajax.post(`/api/visitLog/getUserVisitn`, param)
    return api
}

const visitLog={
    getUserVisitn,
}

export default visitLog