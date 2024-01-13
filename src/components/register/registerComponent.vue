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

                    <!-- INICIO CPF/CNPJ -->
                    <div>
                        <label for="">CPF/CNPJ</label>
                        <Field
                            type="cnpj"
                            id="cnpj"
                            name="cnpj"
                            class="form-control mb-2"
                            placeholder="digite seu CPF/CNPJ"
                            v-model="formUser.pessoaJuridica[0].cnpj"

                        />
                        <ErrorMessage name="email"
                        class="form-control is-invalid text-danger"
                        />
                    </div>
                    <!-- CPF/CNPJ FIM -->
                    
                    <!-- INICIO Nome Fantasia -->
                    <div v-if="formUser.pessoaJuridica[0].cnpj.length > 11" v-on:condicao-verdadeira="formUser.tipo = 'PJ'">
                        <label for="nomeFantasia">Nome Fantasia</label>
                        <Field
                            type="text"
                            id="nomeFantasia"
                            name="nomeFantasia"
                            class="form-control mb-2"
                            placeholder="Digite o nome fantasia"
                            v-model="formUser.pessoaJuridica[0].nomeFantasia"
                        />
                        <ErrorMessage
                            name="nomeFantasia"
                            component="div"
                            class="form-control is-invalid text-danger"
                        />
                        <label for="razaoSocial">Razão Social </label>
                        <Field
                            type="text"
                            id="razaoSocial"
                            name="razaoSocial"
                            class="form-control mb-2"
                            placeholder="Digite a razão social"
                            v-model="formUser.pessoaJuridica[0].razaoSocial"

                        />
                        <ErrorMessage
                            name="razaoSocial"
                            component="div"
                            class="form-control is-invalid text-danger"
                        />
                    </div>
                    <!-- Nome Fantasia FIM -->


                    
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
    "nomeUsuario": "nomeTeste888",
    "email":"teste22@teste87w37.com",
    "tipo": "PJ",
    "saldo": 0.00,
    "senha":"teste",
    "role":[
        {
            "id": 1,
            "permissao": "ROLE_ADMIN"
        }
        ],
    "pessoaFisica":[],
    "pessoaJuridica":[{
        "nomeFantasia":"44",
        "razaoSocial":"aa",
        "cnpj":"13386640000123"
    }]
}*/

        components:{Form,Field,ErrorMessage},
        name:'Register',
        data(){
            return{
                formUser:{
                        nomeUsuario: '',
                        email: '',
                        tipo: 'PJ',
                        saldo: '0.0',
                        senha: '',
                        role: [{
                            id: '1', 
                            permissao: 'ROLE_ADMIN' 
                        }],
                        pessoaFisica: [],
                        pessoaJuridica: [{ 
                            nomeFantasia: '', 
                            razaoSocial: '', 
                            cnpj: ''
                        }],
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
                
            }

        }
}
</script>