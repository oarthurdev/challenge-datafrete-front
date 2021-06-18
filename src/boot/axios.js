import Vue from 'vue'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://localhost/challenge-datafrete-api'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.defaults.adapter = httpAdapter

axios.interceptors.request.use(function (config) {
  var hash = localStorage.getItem('token');

  if (hash !== null) {
    config.headers['Authorization'] = hash
    config.headers = config.headers || {}
  } else {
    localStorage.clear()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    localStorage.clear()
    router.push({path: '/login'})
  }
  // Do something with response error
  return Promise.reject(error)
})