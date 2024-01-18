<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mr-4">
            <div class="container">
                <img src="../../assets/img/Img.svg" alt="" width="50">
                <a class="navbar-brand ">Solinfbroker</a>

                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="#">Home</a>
                    <a class="nav-item nav-link" href="#">Orders</a>
                    <a class="nav-item nav-link" href="#">Carteira</a>
                    </div>
                </div>
                
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav" >
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="btn btn-outline-danger"  @click="logOutUser">SAIR</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <body>
        <div class="parent">
            <br>
        <br>
        <br>
        <div class="text-center">
            <div class="card-header">
                Bem Vindo!
            </div>
            <div class="card-body">
                <img src="../../assets/img/solinftec.png" alt="Logotipo" class="logo-img" height="auto">
            </div>
        </div>

        <div class="div1"> </div>
        <button class="buttonComprar" @click="Order">Vender Ações</button>

        <div class="div2"> </div>
        <div class="div3"> </div>
        <div class="div4"> </div>
        </div>
    </body>
    <footer class="footer fixed-bottom text-center bg-light p-2">
        <p class="mb-0 text-muted">© Project Mobral 2024.</p>
    </footer>
</template>
<script>

import service from '../../service/controller'
import swal from 'sweetalert';


    export default{
        name:'Home',

        data(){
            return{
                
                sell: {
                    idCliente: 1,
                    idAtivo: 1,
                    tipoOrdem: "ORDEM_VENDA",
                    valorOrdem: 1.00,
                    quantidadeOrdem: 1
                }
            }
        },
        methods:{
            
            //  getUser(){
                
            //     const token = localStorage.getItem('token');
            //     console.log("home ::: ", token)
            //     const tokenDecoded = VueJwtDecode.decode(token);
            //     console.log("home ::: ", tokenDecoded)

            //     //this.user = tokenDecoded;
            // },


          async Order(){
                try {
                    
                    await service.sentOrder(this.sell);

                // Atualizar a lista de ações possuídas
                swal('Sucesso', 'Ações compradas com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao comprar ações:', error);
                swal('Erro', 'Ocorreu um erro ao comprar ações', 'error');
            }

            
            
            },
            logOutUser(){
                swal({
                    title: 'Você quer mesmo sair T.T ?',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true
                    })
                    .then((result) => {
                            if (result) {
                                swal('Saindo da broker', 'Retornado ao login', 'success');
                                localStorage.removeItem('token')
                                this.$router.push('/')
                                
                            } else {
                                swal('Cancelado', 'Cotinuar no broker', 'info');
                            }
                    });
                    
            }
        },
        mounted(){

        }
    }
</script>
