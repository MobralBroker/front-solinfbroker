<template>
   <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mr-4">
        <div class="container d-flex align-items-center">
            <img src="../../assets/img/Img.svg" alt="" width="50">
            <a class="navbar-brand ml-2">Solinfbroker</a>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav"> </div>
            <a class="navbar-brand text-center">Bem vindo ao SolinfBroker!</a>

        </div>
    </nav>


        <div class="container">

            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                    <Form class=" border border-primary p-5"
                    style="margin-top: 70px;height: auto;padding-top: 100px;inportant;"
                    @submit.prevt="submitRegister">
                    
                    <!-- NOME INICIO -->
                    <div>
                        <label for="">Nome</label>
                        <Field
                            type="text"
                            id="nomeUsuario"
                            name="nomeUsuario"
                            class="form-control mb-2"
                            placeholder="digite seu nome"
                            v-model="formUser.nomeUsuario"
                        />

                        <Field
                            type="text"
                            id="nome"
                            name="nome"
                            class="form-control mb-2"
                            placeholder="digite seu nome"
                            style="display: none;"
                            :value="nomeUsuario"
                            v-model="dates"
                        />
                        
                        <ErrorMessage name="nomeUsuario"
                        class="form-control is-invalid text-danger"
                        />
                    </div>
                    <!-- NOME FIM -->

                    <!-- EMAIL INICIO -->
                    <div>
                        <label for="">Email</label>
                        <Field
                            type="email"
                            id="emai"
                            name="email"
                            class="form-control mb-2"
                            placeholder="digite seu email"
                            :rules="validateEmail"
                            v-model="formUser.email"

                        />
                        <ErrorMessage name="email"
                        class="form-control is-invalid text-danger"
                        />
                    </div>
                    <!-- EMAIL FIM -->
                    
                    <!-- INICIO SENHA -->
                    <div>
                        <label for="">Senha</label>
                        <Field
                        type="password"
                        id="senha"
                        name="senha"
                        class="form-control mb-2"
                        placeholder="Digite sua senha"
                        :rules="validatePassword"
                        v-model="formUser.senha"
                        />

                        <ErrorMessage name="senha"
                        class="form-control is-invalid text-danger"
                        />

                    </div>
                    
                    <!-- SENHA FIM -->

                    <!-- INICIO CPF -->
                    <div>
                        <label for="">CPF</label>
                        <Field
                        type="text"
                        id="cpf"
                        name="cpf"
                        class="form-control mb-2"
                        placeholder="Digite seu CPF sem pontos ou traços"
                        :rules="validateCPF"
                        v-model="formUser.pessoaFisica[0].cpf"
                        />

                        <ErrorMessage name="senha"
                        class="form-control is-invalid text-danger"
                        />

                    </div>
                    <!-- CPF FIM -->

                   <!-- DATA -->
                    <div>
                        <label for="date-input">Data de Nascimento:</label>
                        <Field
                        type="text"
                        id="datanascimento"
                        name="datanascimento"
                        class="form-control mb-2"
                        placeholder="Data de Nascimento 'dd/mm/aaaa'"
                        v-model="formUser.pessoaFisica[0].dataNascimento"
                        />         
                    </div>                    
                    <!-- DATA FIM -->
    

                    <div class="d-grid gap-2 col-6 mx-auto"
                    style="margin-top: 20px;">
                        <button @click="RegisterUser"
                        class="btn btn-primary ">
                        Cadastrar
                        </button>
                    </div>

                    <p class="text-center my-2"> 
                        <router-link
                            to="/"
                            style="color:black;">
                            Login
                        </router-link>
                    </p>

                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import swal from 'sweetalert';
    import service from '../../service/controller'
    import{Form,Field,ErrorMessage, validate} from 'vee-validate'


    export default{

/*   OBJECT CADASTRO
{
{
  "email": "predri@gmail.com",
  "senha": "alexnadre",
  "role": [ { "id": 0, "permissao": "ROLE_ADMIN" } ],
  "nomeUsuario": "alere souto",
  "pessoaFisica":[ { 
		"id": 0, 
		"cpf": "18756678061",
		"nome":"alexandresouto", 
		"dataNascimento": "27/10/1988" 
    }] 
}
}*/
        components:{Form,Field,ErrorMessage},
        name:'Register',
        data(){
            return{
                formUser:{
                        email: '',
                        senha: '',
                        role: [{
                            id: '1', 
                            permissao: 'ROLE_ADMIN' 
                        }],
                        nomeUsuario:'',
                        saldo: '0.0',
                        pessoaFisica:[{ 
                            id: 0, 
                            cpf: '',
                            nome:'', 
                            dataNascimento:''
                        }] 
                }
            };
        },
        methods:{
            submitRegister(){},
            async RegisterUser(){
                try{
                    await service.register(this.formUser)
                    swal({
                        title: 'Excelente!',
                        text: 'Usuário(a) cadastrado com sucesso!',
                        icon: 'success',
                    }).then(()=>{
                        this.$router.push('/');
                    })
                }catch(error){
                        swal({
                        title: 'Erro!',
                        text: 'Nome ou Email ja cadastrados!!',
                        icon: 'error',
                    });
                }     
            },

            validateEmail(value){                
                const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                if (!regex.test(value)) {
                    return 'Este tipo de Email é invalido!';
                }
                // All is good
                return true;
            },
            
            validatePassword(value){
                
                if(!value){
                    return 'Campo obrigatorio!'
                }
                
                if(value.includes(' ')){
                    return "Senha não pode obter espaços"
                }
                if(value.length<=8 && value.length>=3){
                    return true
                }
                return 'A senha deve obter entre 3 e 8 caracters!'
                
            },            
            validateCPF(value){
            
                //TODO VALIDAt  E CPF

                
            }
            
        }
    }

</script>
