import { authenticationApi, crudApi } from "./api"

export default{
    async register(data){
        console.log(data)
        const response=await authenticationApi.post('/auth/register', data)
    },

    async login(user){
            
        const response = await authenticationApi.post('auth/login',user)
        return  response.data
          
    },

    async sentOrder(data){
        
        const token = localStorage.getItem('token');
        console.log(token);
        
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }

        const response = await crudApi.post('/ordem', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        
    }
}