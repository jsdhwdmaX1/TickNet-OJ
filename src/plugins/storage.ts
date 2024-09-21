//约定一个通用的键名
const info_key = 'ticknet_oj_info'

//获取个人信息
export const getInfo = () => {
    const defaultObj = {token: "",userName: ""}
    const result = localStorage.getItem(info_key)
    return result ? JSON.parse(result) : defaultObj
}

//设置个人信息
export const setInfo = (obj : any) => {
    localStorage.setItem(info_key, JSON.stringify(obj))
}

//移除个人信息
export const removeInfo = () => {
    localStorage.removeItem(info_key)
}