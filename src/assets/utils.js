// 从cookie中获取token
function getCookie () {
    var cookie,
        token,
        arr = []
    cookie = document.cookie
    arr = cookie.split(';')
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].match(/token/g)) {
            token = arr[i].split('=')[1]
            break
        } else {
            token = ''
        }
    }

    return token
}

//设置cookie名称
function getCookieKey () {
    return 'token'
}

function stringToByte (str) {
    var bytes = new Array()
    var len, c
    len = str.length
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i)
        if (c >= 0x010000 && c <= 0x10ffff) {
            bytes.push(((c >> 18) & 0x07) | 0xf0)
            bytes.push(((c >> 12) & 0x3f) | 0x80)
            bytes.push(((c >> 6) & 0x3f) | 0x80)
            bytes.push((c & 0x3f) | 0x80)
        } else if (c >= 0x000800 && c <= 0x00ffff) {
            bytes.push(((c >> 12) & 0x0f) | 0xe0)
            bytes.push(((c >> 6) & 0x3f) | 0x80)
            bytes.push((c & 0x3f) | 0x80)
        } else if (c >= 0x000080 && c <= 0x0007ff) {
            bytes.push(((c >> 6) & 0x1f) | 0xc0)
            bytes.push((c & 0x3f) | 0x80)
        } else {
            bytes.push(c & 0xff)
        }
    }
    return bytes
}

function byteToString (arr) {
    if (typeof arr === 'string') {
        return arr
    }
    var str = '',
        _arr = arr
    for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/)
        if (v && one.length == 8) {
            var bytesLength = v[0].length
            var store = _arr[i].toString(2).slice(7 - bytesLength)
            for (var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2)
            }
            str += String.fromCharCode(parseInt(store, 2))
            i += bytesLength - 1
        } else {
            str += String.fromCharCode(_arr[i])
        }
    }
    return str
}

Date.prototype.Format = function (fmt) {
    //author: meizz
    const o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return fmt
}

function formatDate (dateStr, formatter = 'yyyy-MM-dd hh:mm:ss') {
    if (!dateStr) {
        return ''
    }
    if (typeof dateStr === 'string') {
        if (dateStr.indexOf('.') > -1) {
            // 有些日期接口返回带有.0。
            dateStr = dateStr
                .replace(/T/g, ' ')
                .replace(/-/g, '/')
                .replace(/\.[\d]{3}Z/, '')
        }
        // 解决IOS上无法从dateStr parse 到Date类型问题
        dateStr = dateStr.replace(/-/g, '/')
    }
    return new Date(dateStr).Format(formatter)
}

// let Base64 = require('js-base64').Base64

// const Base64Utils = {
//     encode: str => {
//         return Base64.encode(str)
//     },
//     encodeURI: str => {
//         return Base64.encodeURI(str)
//     },
//     decode: str => {
//         return Base64.decode(str)
//     }
// }

function getUUID () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
}

export { getCookie, getCookieKey, stringToByte, byteToString, formatDate, getUUID }
