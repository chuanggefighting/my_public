import axios from 'axios'
import router from '@/router'
import store from './store'
// import { getSign } from './utils';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_URL + "apigateway",
  // timeout: 10000,            // 请求超时时间
  responseType: "json",
})

// 请求拦截器
service.interceptors.request.use(
  config => {
      // config.headers['Content-Type'] = 'multipart/form-data'
      // console.log(config)
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

// 购买页面


// 保单查询查询
export function getOrderNo(data){
  return _request('/orderPlyController/order/getOrderNoByCCertfCde', 'post', data, undefined)
}
// 理赔单号查询
export function getClaimNo(data){
  return _request('/claims/getClaimNoByplyNo', 'post', data, undefined)
}

// 理赔资料上传
export function uploadFile(data){
  return _request('/UploadController/batchFileUpload', 'post', data, undefined)
}


export function _request (url, methods, data = undefined, params = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: methods,
      url: url,
      data: data,
      params: Object.assign(params)
    }).then((response) => {
      return resolve(response.data)
    }).catch((error) => {
      return reject(error)
    })
  })
}


