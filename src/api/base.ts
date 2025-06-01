import axios from 'axios'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
const service = axios.create({
  baseURL: 'http://127.0.0.1:4523',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      // 状态码200，返回数据
      return response.data
    } else {
      // 状态码非200，返回null
      // 提示错误原因
      toast.error('Error', {
        description: response.data.data.msg
      })
      return null;
    }
  },
  error => {
    // 1.网络错误
    const message = ref('网络链接失败！')
    // 2.服务器无响应
    if (error.request) {
      message.value = '服务器无响应！'
    }
    // 3.请求超时
    if (error.code === 'ECONNABORTED') {
      message.value = '请求超时！'
    }
    toast.error('Error', {
      description: message.value
    })
    return null;
  }
)

export default service