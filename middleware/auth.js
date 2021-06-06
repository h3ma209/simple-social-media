// import Api from "@/services/api";
import API from '@/middleware/api'

export default {
  Login (payload) {
    return API().post('api/login', {

        email: payload.email,
        password: payload.password

    })
  }
}
