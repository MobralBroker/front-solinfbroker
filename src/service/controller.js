
// import API from "./api"
import { authenticationApi, crudApi } from './api';

export default{
    async register(data){
        console.log(data)
        const response=await authenticationApi.post('/auth/register', data)
    },

    async login(user){
            
        const response = await authenticationApi.post('auth/login',user)
        return  response.data
          
    },

}
