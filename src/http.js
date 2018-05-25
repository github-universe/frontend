import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
function get(url, params) {
  return axios.request({
    url,
    method: 'GET',
    headers: {
      'Content-Type': 'applicaftion/json',
    },
    params,
  })
}

function post(url, data) {
  return axios.request({
    url,
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'applicaftion/json',
    },
    data
  })
}

export { post, get }
export default { post, get }

Vue.prototype.get = get
Vue.prototype.post = post