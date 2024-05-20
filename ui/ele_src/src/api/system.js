import request from "@/utils/request";
import { WAF_API_URL } from "@/api/const";

/**
 * 获取 WAF 相关信息
 */
export function waf_info() {
  return request({
    url: WAF_API_URL + "waf/info",
    method: "get",
  });
}
/**
 * 初始化 WAF。
 * @param data 初始化数据。
 */
export function waf_init(data) {
  return request({
    url: WAF_API_URL + "waf/init",
    method: "post",
    data,
  });
}

/**
 * 上传文检测
 *
 * @returns
 */
export function check_upload() {
  return request({
    url: WAF_API_URL + "waf/check/upload",
    method: "get",
  });
}
/**
 * waf_replay 函数
 *
 * @returns 返回一个请求对象，该对象包含WAF API的replay接口请求的配置信息
 */
export function waf_replay() {
  return request({
    url: WAF_API_URL + "waf/replay",
    method: "get",
  });
}

/**
 * 检查WAF是否存在
 *
 * @returns 返回请求结果
 */
export function waf_check_existence() {
  return request({
    url: WAF_API_URL + "waf/check/existence",
    method: "get",
  });
}

/**
 * 定时杀死所有进程
 *
 */
export function scheduled_kill_all() {
  return request({
    url: WAF_API_URL + "scheduled/kill/all",
    method: "get",
  });
}

/**
 * 更新系统
 *
 * @returns
 */
export function update() {
  return request({
    url: WAF_API_URL + "sys/upgrade",
    method: "get",
  });
}

/**
 * 发布版本
 * @returns 
 */
export function build_version() {
  return request({
    url: WAF_API_URL + "sys/build",
    method: "get",
  });
}

/**
 * 更新服务器
 * @returns
 */
export function update_server() {
  return request({
    url: WAF_API_URL + "sys/upgrade/server",
    method: "get",
  });
}
/**
 * 获取角色列表
 */
export function api_list() {
  return request({
    url: WAF_API_URL + "api/list",
    method: "get",
  });
}
