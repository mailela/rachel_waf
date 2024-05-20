import request from '@/utils/request'
import {WAF_API_URL} from '@/api/const'

/**
 * 获取设置信息
 *
 * @returns 返回请求结果
 */
export function get_setting(type) {
  return request({
    url: WAF_API_URL+'waf/settings',
    method: 'get',
    params:{
      type:type
    }
  })
}
/**
 * 设置 WAF 设置
 *
 * @param params 设置参数
 * @returns 返回请求结果
 */
export function set_setting(data) {
  return request({
    url: WAF_API_URL+'waf/save',
    method: 'post',
    data
  })
}
