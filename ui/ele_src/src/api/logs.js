import {request} from "@/utils/logs";
import {notice} from "@/utils/core";
import { WAF_API_URL } from "@/api/const";
export function get_logs(type) {
  switch (type) {
    case "all":
      return all_logs();
      break;
    case "web":
      return web_logs();
      break;
    case "attack":
      return attack_logs();
      break;
    case "flag":
      return flag_logs();
    case "flag_eye_to_eye":
      return flag_eye_to_eye();
  }
}
/**
 * 获取所有请求日志
 *
 * @param params 请求参数
 * @returns 返回请求结果
 */
export function all_logs(params) {
  return request({
    url: WAF_API_URL + "waf/logs",
    method: "get",
    params: {
      type: "all_requests",
    },
  });
}
/**
 * 获取web日志
 *
 * @param params 参数对象
 * @returns 返回请求结果
 */
export function web_logs(params) {
  return request({
    url: WAF_API_URL + "waf/logs",
    method: "get",
    params: {
      type: "web_log",
    },
  });
}
/**
 * 获取被攻击日志
 *
 * @param params 参数对象
 * @returns 返回请求结果
 */
export function attack_logs(params) {
  return request({
    url: WAF_API_URL + "waf/logs",
    method: "get",
    params: {
      type: "under_attack_log",
    },
  });
}
/**
 * Flag日志
 * @param {*} params
 * @returns
 */
export function flag_logs(params) {
  return request({
    url: WAF_API_URL + "waf/logs",
    method: "get",
    params: {
      type: "flag_eye_to_eye",
    },
  });
}
/**
 * 获取Flag标记的日志信息
 *
 * @param params 参数对象
 * @returns 返回请求结果
 */
export function flag_eye_to_eye(params) {
  return request({
    url: WAF_API_URL + "waf/logs",
    method: "get",
    params: {
      type: "flag_eye_to_eye",
    },
  });
}
