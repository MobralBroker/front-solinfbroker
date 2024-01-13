
import API from "./api"

export default{
    async register(data){
        console.log(data)
        const response=await API().post('/auth/register', data)
    },

    async login(user){
            
        const response = await API().post('auth/login',user)
        return  response.data
          
    },

}