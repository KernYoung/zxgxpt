import axios from 'axios'
import Qs from 'qs'
import Cookies from 'js-cookie'
import { getCookieKey, getCookie } from '../assets/utils.js'
import router from '@/router'

//url拼接
function redirectAjax (url, param) {
    var tro = Qs.stringify(param)
    return url + '?' + tro
}

/**
 * 获取一个新的自定义的axios实例
 */
let ajax = new axios.create({
   timeout: 600000,
    //设置Content-Type
    headers: {
        'content-type': 'application/json',
    }
})

//请求拦截器
ajax.interceptors.request.use(
    function (config) {
        let loginSession = window.sessionStorage.loginSession
        if (Cookies.get(getCookieKey())) {
            // 在发送请求之前做些什么，例如加入token
            ajax.defaults.headers.common['token'] = Cookies.get(getCookieKey())
            config.headers['token'] = Cookies.get(getCookieKey())
            return config
        } else {
            return config
        }
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

//相应拦截器
ajax.interceptors.response.use(
    function (response) {
        // response.data.code == 49998 || response.data.code == 49999 || response.data.code == 50000
        let param = {
            tokenIsOut: false,
        }
        if(response && response.data && (response.data.code == 49998 || response.data.code == 49999 || response.data.code == 50000)){
            param.tokenIsOut = true;

            router.push({
                path: '/',
                query: param
            })
            // var r = confirm("您的帐号在另一地点登录，您已被迫下线");
            // if (r == true) {
            //     router.push({
            //         path: '/',
            //           query: param
            //     })
            // } else {
            //    router.push({
                //         path: '/',
                //           query: param
                //     })
            // }
        }
        // 在接收响应做些什么，例如跳转到登录页
        if (response && response.data && response.data.code == 401) {

            router.push({
                path: '/',
                query: param
            })
        }
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

/**
 * 获取一个新的自定义的axios实例
 */
let fileAjax = new axios.create({
    // timeout: 600000,
    //设置Content-Type
    headers: {
        'content-type': 'application/json'
    },
    responseType: 'blob',
})

//请求拦截器
fileAjax.interceptors.request.use(
    function (config) {
        if (Cookies.get(getCookieKey())) {
            // 在发送请求之前做些什么，例如加入token
            ajax.defaults.headers.common['token'] = Cookies.get(getCookieKey())
            config.headers['token'] = Cookies.get(getCookieKey())
            console.log(config)
            return config
        } else {
            return config
        }
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

//相应拦截器
fileAjax.interceptors.response.use(
    function (response) {
        // 在接收响应做些什么，例如跳转到登录页
        if (response && response.data && response.data.code == 401) {

            router.push({
                path: '/'
            })
        }
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

/**
 * 获取一个新的自定义的axios实例
 */
let upLoadFile = new axios.create({
    // timeout: 600000,
    //设置Content-Type
    headers: {
        'content-type': 'multipart/form-data'
    },
    responseType: 'blob',
})

//请求拦截器
upLoadFile.interceptors.request.use(
    function (config) {
        if (Cookies.get(getCookieKey())) {
            // 在发送请求之前做些什么，例如加入token
            ajax.defaults.headers.common['token'] = Cookies.get(getCookieKey())
            config.headers['token'] = Cookies.get(getCookieKey())
            console.log(config)
            return config
        } else {
            return config
        }
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

//相应拦截器
upLoadFile.interceptors.response.use(
    function (response) {
        // 在接收响应做些什么，例如跳转到登录页
        if (response && response.data && response.data.code == 401) {

            router.push({
                path: '/'
            })
        }
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

/**
 * 获取一个新的自定义的axios实例
 */
let newAjax = new axios.create({
    // timeout: 600000,
    //设置Content-Type
    headers: {
        'content-type': 'application/json',
    }
})

//请求拦截器
newAjax.interceptors.request.use(
    function (config) {
		// 在发送请求之前做些什么，例如加入token
        newAjax.defaults.headers.common['Authorization'] = 'a092a8e2-12d7-4ad2-8d07-e9d4a07525cb'
		config.headers['Authorization'] = 'a092a8e2-12d7-4ad2-8d07-e9d4a07525cb'
		return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

//相应拦截器
newAjax.interceptors.response.use(
    function (response) {
        // 在接收响应做些什么，例如跳转到登录页
        if (response && response.data && response.data.code == 401) {

            router.push({
                path: '/'
            })
        }
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)
export { ajax, redirectAjax, fileAjax,upLoadFile ,newAjax}
