// import Api from "@/services/api";
import API from '@/middleware/api'
import AUTH from '@/middleware/authapi'
import { AuthAx } from '@/middleware/authtest'

export default {

  Login (payload) {
    const resp = AUTH().post('api/authme', {
        email: payload.email,
        password: payload.password
    })
    resp.then(function (result) {
      console.log(result)
    })
    return resp
  },
  CheckToken (token) {
    return AuthAx(token).get('api/profile')
  },
  Register (payload) {
    return API().post('api/register', {
      email: payload.email,
      password: payload.password
    })
  }
}
