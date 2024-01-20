import { authenticationApi, crudApi } from "./api"

export default{
    
            /*   MS-AUTH  */

    async register(data){
        console.log(data)
        const response=await authenticationApi.post('/auth/register', data)
    },

    async login(user){
            
        const response = await authenticationApi.post('auth/login',user)
        return  response.data
          
    },
    
    async getUserProfile(email){
        
        const token = localStorage.getItem('token');        
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }
        const response = await authenticationApi.get('/auth/usuario/' + email)
        return response.data;
    },



    /*   MS-CRUD GERAL  */

    async sentOrder(data){
        
        const token = localStorage.getItem('token');        
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }

        const response = await crudApi.post('/ordem', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        
    },


    async getAtivos(){
        
        const token = localStorage.getItem('token');        
        if (!token) {
            console.error('Token não encontrado. Faça o login para obter o token.');
            return;
        }
        const response = await crudApi.get('/ativo',{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        return response.data;
    },
    
}