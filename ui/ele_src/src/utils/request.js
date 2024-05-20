import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import CryptoJS, { SHA1 } from "crypto-js";

/**
 * 对响应进行解密
 *
 * @param response 响应对象
 * @returns 返回解密后的文本
 */
function decrypt(response) {
  let text = response.data;
  let key = response.headers["x-code"] || "";
  try {
    if (key === "") {
      return text;
    }
    key = CryptoJS.enc.Utf8.parse(key);
    let iv = SHA1(key).toString().substring(0, 16);
    iv = CryptoJS.enc.Utf8.parse(iv);
    text = CryptoJS.AES.decrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
    text = JSON.parse((text || "").replace(/\s/g, ""));
  } catch (e) {
    console.log(e);
    return text;
  }
  return text;
}
/**
 * 加密函数
 *
 * @param word 要加密的字符串
 * @param keyStr 加密密钥
 * @returns 返回加密后的字符串
 */
function encrypt(word, keyStr) {
  keyStr = keyStr ? keyStr : SHA1(Math.random()).substring(0, 16);
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let str = CryptoJS.enc.Utf8.parse(word);
  let iv = SHA1(keyStr).toString().substring(0, 16);
  iv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.AES.encrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["X-Token"] = getToken();
    }
    if (store.getters.config.encode) {
      let key = SHA1(Math.random()).toString().substring(0, 16);
      config.headers["x-Code"] = key;
      if (config.data) {
        config.data = encrypt(JSON.stringify(config.data), key);
      }
    }
    return config;
  },
  (error) => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    let res = decrypt(response);
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      // Message({
      //   message: res.msg || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 201) {
        // to re-login
        MessageBox.confirm(
          "会话已经失效，您可以继续留在该页面，或者重新登录",
          "会话失效",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }  else {
        Message({
          message: res.msg || "Error",
          type: "error",
          duration: 5 * 1000,
        });
      }
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    // console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
