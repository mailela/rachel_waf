import request from '@/utils/request'
import {WAF_API_URL} from '@/api/const'
export function login(data) {
  return request({
    url: WAF_API_URL+'user/login',
    method: 'post',
    data
  })
}
export function change_user(data) {
  return request({
    url: WAF_API_URL+'user/change',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: WAF_API_URL+'user/info',
    method: 'get',
    params: { token }
  })
}
export function getOnline(token) {
  return request({
    url: WAF_API_URL+'users/online',
    method: 'get',
    params: { token }
  })
}
export function getUserList(token) {
  return request({
    url: WAF_API_URL+'users/list',
    method: 'get',
    params: { token }
  })
}
export function getRoleList(token) {
  return request({
    url: WAF_API_URL+'roles/list',
    method: 'get',
    params: { token }
  })
}
export function getRole(data) {
  return request({
    url: WAF_API_URL+'roles/get',
    method: 'post',
    data
  })
}
export function getUser(data) {
  return request({
    url: WAF_API_URL+'users/get',
    method: 'post',
    data
  })
}

export function add_user(data) {
  return request({
    url: WAF_API_URL+'users/add',
    method: 'post',
    data
  })
}
export function edit_user(data) {
  return request({
    url: WAF_API_URL+'users/edit',
    method: 'post',
    data
  })
}
export function add_roles(data) {
  return request({
    url: WAF_API_URL+'roles/add',
    method: 'post',
    data
  })
}
export function edit_roles(data) {
  return request({
    url: WAF_API_URL+'roles/edit',
    method: 'post',
    data
  })
}
export function del_user(data) {
  return request({
    url: WAF_API_URL+'users/remove',
    method: 'post',
    data
  })
}
export function del_role(data) {
  return request({
    url: WAF_API_URL+'roles/remove',
    method: 'post',
    data
  })
}
/**
 * 登出函数
 *
 * @returns 返回请求登出的结果
 */
export function logout() {
  return request({
    url: WAF_API_URL+'user/logout',
    method: 'post'
  })
}
/**
 * 踢除帐户
 *
 * @returns 返回登出请求的结果
 */
export function kickOut(data) {
  return request({
    url: WAF_API_URL+'user/kick/out',
    method: 'post',
    data
  })
}
