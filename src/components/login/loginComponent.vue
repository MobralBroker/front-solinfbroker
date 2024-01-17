<template>
    <div>
        <div class="login-page">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                        <div class="container text-center">
                            <img src="../../assets/img/solinftec.png" alt="Logotipo" class="logo-img">
                        </div>

                        <Form class=" border border-primary p-5"
                        style="margin-top: 70px;height: auto;padding-top: 100px;inportant;"
                        @submit.prevent="loinUser(e)">
                        <div>
                            <label for="">Email</label>
                            <Field
                                type="email"
                                id="emai"
                                name="email"
                                class="form-control mb-2"
                                placeholder="digite seu email"
                                :rules="validateEmail"
                                v-model="email"
                            />
                            <ErrorMessage name="email" 
                            class="form-control is-invalid text-danger"/>
                        </div>
                        <div>
                            <label for="">Password</label>
                            <Field
                            type="password"
                            id="password"
                            name="password"
                            class="form-control mb-2"
                            placeholder="Digite sua senha"
                            :rules="validate"
                            v-model="senha"
                            />
                            <ErrorMessage name="password"
                            class="form-control is-invalid text-danger"
                            />
                        </div>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button @click="loinUser"
                            class="btn btn-primary btn-custom my-2 ">
                            ENTRAR
                            </button>
                        </div>

                        <p class="text-center my-2"> 
                            <router-link
                                to="/register"
                                style="color:black;">
                                Crie sua conta agora!
                            </router-link>
                        </p>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import swal from 'sweetalert'
    import sevice from '../../service/controller'
    import{Form,Field,ErrorMessage} from 'vee-validate'

    export default{
        
        components:{Field,Form,ErrorMessage},
        name:'Login',
        data(){
            return{
                
                email:null,
                senha:null
            
            }
        },
        methods:{
            async loinUser(e){
                e.preventDefault();
                
                const data ={
                    email:this.email,
                    senha:this.senha
                }
                try{
                    const token = await sevice.login(data)
                    
                    console.log("login ::: ",token)

                    localStorage.setItem('token', token)

                    swal({
                        title: 'Sucesso!',
                        text: 'Usuário(a) logado com sucesso!',
                        icon: 'success',
                    }).then(()=>{
                        this.$router.push('/home')
                    })
                }
                catch(err){
                    swal({
                        title: 'Oops!',
                        text: 'Senha ou Email incorretos',
                        icon: 'error',
                    })
                }
            },
            validateEmail(value) {
      
                if (!value) {
                    return 'Campo obrigatorio';
                }
                
                // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                // if (!regex.test(value)) {
                //     return 'Este tipo de Email é invalido!';
                // }
                
                return true;
            },
            validate(value){
                
                
                if(!value ){
                    return 'campo obrigatorio'
                }
                if(value.includes(' ')){
                    return "Senha não pode obter espaços"
                }
                
                if(value.length>=1 && value.length<=12){
                   return true 
                }

                return 'A senha deve obter entre 6 e 8 caracters!'
            }
        }
}
</script>

<style>

.login-page {
  height: 90vh;
  display: flex;
  align-items: center;
  background-image: url('../../assets/img/white.png');
  background-size: cover;
  background-position: center;
}
.btn-custom {
    background-color: #14a401;
    border: 2px solid #ffffff;
}
</style>