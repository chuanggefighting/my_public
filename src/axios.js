import axios from 'axios'
import router from '@/router'
import store from './store'
import { crypto, random, randomWord } from './assets/js/tool.js';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  // timeout: 10000,            // 请求超时时间
  responseType: "json",
})

// 请求拦截器
service.interceptors.request.use(
  config => {
      // 1：加密
      if(config.headers.level == 1){  
          const KP = {
            key: randomWord(true, 16, 16),  // 秘钥
            iv: randomWord(true, 16, 16)    // 偏移量
          };
          config.data = crypto.AESEnc(JSON.stringify(config.data), KP.key)

          Object.assign(config.headers, {
            "Content-Type": "application/json;charset=utf-8",
            dataFormat: "json",
            authMethod: "no",
            signAlgo: "NO",
            transAlgo: "AES",
            shareKey: KP.key,
            timestamp: new Date().getTime(),
            nonce: String(random(0, 100))
          })
      }
      // store.commit('showLoad', { status: 1, msg: "" })
      return config
  },
  error => {
      // store.commit('showLoad', { status: 2, msg: "" })
      return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
      response.data = JSON.parse(crypto.AESDec(response.data, response.config.headers.shareKey))
      // if(response.data.CResultCde == "0000"){
      //   store.commit('hideLoad')
      // }else{
      //   store.commit('showLoad', { status: 2, msg: response.data.CResultMsg })
      // }
      return Promise.resolve(response)
  },
  error => {
      // store.commit('showLoad', { status: 2, msg: "" })
      return Promise.reject(error)
  }
)

// 测试
export function getPlyNoByCCertfCde(data){
  const headers = { 
    level: 1, 
    module: "orderPlyAction", 
    method: "getPlyNoByCCertfCde" 
  }
  return _request('', 'post', data, headers)
}


// 产品购买
export function getProduct(data){
  const headers = { 
    level: 1,     
    module: "prodAction", 
    method: "getProductInfoList"
  }
  return _request('', 'post', data, headers)
}

// 保单查询
export function getOrderNo(data){
  const headers = { 
    level: 1,     
    module: "orderPlyAction", 
    method: "getPlyNoByCCertfCde"
  }
  return _request('', 'post', data, headers)
}

// 保单详情
export function getOrderDetail(data){
  const headers = { 
    level: 1,     
    module: "orderPlyAction", 
    method: "getPlyDetailByPlyNo"
  }
  return _request('', 'post', data, headers)
}


// 理赔申请 EdrInfoAction cnlPolcy
export function applyPayment(data){
  const headers = { 
    level: 1,     
    module: "claimsAction",  
    method: "claimApplication" 
  }
  return _request('', 'post', data, headers)
}

 
// 取消服务
export function cancelService(data){  
  const headers = { 
    level: 1,     
    module: "EdrInfoAction",  
    method: "cnlPolcy" 
  }
  return _request('', 'post', data, headers)
}

// 理赔单号查询
export function getClaimNo(data){
  const headers = { 
    level: 1,     
    module: "claimsAction",  
    method: "getClaimNoByplyNo" 
  }
  return _request('', 'post', data, headers)
}

// 理赔资料上传
export function batchFileUpload(data, progressfn){
  return form_upload('/extra/UploadController/batchFileUpload', data, progressfn)
}



// 文件数据上传
function form_upload(url, data, progressfn){
  // formData 需要纯净的 axios 请求
  const formAxios = axios.create({
    baseURL: process.env.VUE_APP_URL,
    responseType: "json",
    // timeout: 10000,
  })

  return new Promise((resolve, reject) => {
    formAxios({
      method: 'post',
      data: data,
      headers: {
        'Content-Type': "multipart/form-data"
      },
      onUploadProgress(progressEvent) { // 原生获取上传进度的事件
        if (progressEvent.lengthComputable) {
          // lengthComputable 主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          // 如果 lengthComputable: false，就获取不到 progressEvent.total、progressEvent.loaded
          progressfn(progressEvent);
        }
      },

    }).then(response => {
      return resolve(response.data)
    }).catch(error => {
      return reject(error)
    })
  })
}

// 表单数据上传
function _request (url, methods, data, headers = { level: 1 }, params = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: methods,
      url: headers.level == 1 ? "/api" : url,
      data: data,
      params: Object.assign(params),
      headers: Object.assign(headers),
      responseType: headers.level == 1 ? "text" : "json"

    }).then(response => {
      return resolve(JSON.parse(response.data.extBody))
    }).catch(error => {
      return reject(error)
    })
  })
}



