<template>
  <div>
    
  
      
      <CCol :md="12">
        
        <CCard class="mb-4">
          <CCardHeader>Ordens</CCardHeader>

            <CTable align="middle" class="mb-0 border" hover responsive>
              <CTableHead class="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell class="bg-body-secondary text-center" > Ativo </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Atualização </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Max. </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Min.</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Valor </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in vetorAtivos" :key="item.id" v-on:click="(handleItemAtivo(item))" >
                <CTableDataCell class="text-center"> <div>{{ item.sigla }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div> {{ item.atualizacao }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div class="fw-semibold">{{ item.valorMax }}</div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div class="fw-semibold">{{ item.valorMin }}</div> </CTableDataCell> 
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center ">{{ item.valor }} </div> </CTableDataCell>
              </CTableRow>
              </CTableBody>
            </CTable>

        </CCard>
      </CCol>


            
                        

  
  
  
  </div>
</template>

<script>

import service from '../../service/controller';
import swal from 'sweetalert';

export default {
  name: 'Dashboard',
  components: {
    
  },
  data() {
    
    return {
          orderSellandBuy: {
                    idCliente:'',
                    idAtivo: '', 
                    tipoOrdem: '',
                    valorOrdem: '',
                    quantidadeOrdem: null
          },
          selectedAtivo: {
              id: null,
              sigla: '',
              nome: null,
              atualizacao: null,
              quantidadesPapeis: null,
              valorMax: null,
              valorMin:null,
              valor: null
          },

          vetorAtivos: [],
          
          userProfile: {
          },
          switchValue: false,
    }
  },
  methods:{

    handleItemAtivo(item){
      this.selectedAtivo.id = item.id
      this.selectedAtivo.sigla = item.sigla
      this.selectedAtivo.nome = item.nome
      this.selectedAtivo.atualizacao = item.atualizacao
      this.selectedAtivo.quantidadesPapeis = item.quantidadesPapeis
      this.selectedAtivo.valorMax = item.valorMax
      this.selectedAtivo.valorMin = item.valorMin
      this.selectedAtivo.valor = item.valor
      },

    async Order(){
                  console.log(this.switchValue.data)
              
                  if(this.switchValue == true){
                    this.orderSellandBuy.tipoOrdem = "ORDEM_VENDA"
                  }else{
                    this.orderSellandBuy.tipoOrdem = "ORDEM_COMPRA"
                  }
                  
                  this.orderSellandBuy.quantidadeOrdem = parseInt( this.orderSellandBuy.quantidadeOrdem , 10)
                   this.orderSellandBuy.idCliente = this.userProfile.id
                   this.orderSellandBuy.idAtivo = this.selectedAtivo.id
                   this.orderSellandBuy.valorOrdem = this.selectedAtivo.valor

                try {
                    console.log(this.orderSellandBuy)
                    await service.sentOrder(this.orderSellandBuy);
                    swal('Sucesso', 'Oderm submetidas com sucesso!', 'success');
                    } catch (error) {
                        console.error('Erro ao comprar ações:', error);
                        swal('Erro', 'Ocorreu um erro ao processar sua ordem T.T', 'error');
                    }

            },
    
    async Ativos(){
          try{
              const response = await service.getAtivos();
              if (Array.isArray(response)) {

                this.vetorAtivos = response.map(item => {   
                  return {
                    id: item.id,
                    sigla: item.sigla,
                    nome: item.nome,
                    atualizacao: item.atualizacao,
                    quantidadesPapeis: item.quantidadesPapeis,
                    valorMax: item.valorMax,
                    valorMin: item.valorMin,
                    valor: item.valor
                  };
                });
                console.log(this.vetorAtivos)
              }            
            } catch(error){
              console.log(error)
            }
    },

    async getProfile(){
      const email = localStorage.getItem('userMail')
      const response = await service.getUserProfile(email);
      console.log(response)
      try{
        this.userProfile = {   
            id: response.id,
            nomeUsuario: response.nomeUsuario,
            saldo: response.saldo,
            email: response.email
        }
        console.log(this.userProfile)
      } catch(error){
        console.log(error)
      }
  },

  },

  /*  FINISH FUNC'S    */

  mounted() {
    this.Ativos();
    this.getProfile();
  },
}
</script>
