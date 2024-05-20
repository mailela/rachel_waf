/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str,callback) {
  if((str||"").length >= 5){
    callback()
  }else{
    callback(new Error("帐户名长度不能小于5位"))
  }
}
export function validPassword(str,callback) {
  if((str||"").length >= 6){
    callback()
  }else{
    callback(new Error("密码长度不能小于6位"))
  }
}
