<template>
  <div>
    
  
    <CRow>
      <CCol :md="12">
      <CCard class="mb-4">

    <CCardHeader>Compra & Venda de Ativos</CCardHeader>
    <CCol :xs="12" class="mb-4">
      <CCard>
        <CCardBody>
          <CCardBody>
            <CRow>
              <CCol :xs="6">

                <!-- Compra/Venda -->
                <CListGroup>
                  <CListGroupItem active>Ordem</CListGroupItem>
                  <CFormInput placeholder="Ativo" autocomplete="Ativo" v-model="selectedAtivo.sigla"> </CFormInput>
                  <CFormInput placeholder="Valor" autocomplete="Valor" v-model="selectedAtivo.valor"/>
                  <CFormInput placeholder="Quantidade" autocomplete="username" />
                  <CFormSwitch :switch="{ color: 'success' }" size="xl" label="Vender" id="formSwitchCheckDefaultXL"/>
                </CListGroup>
                <br>
                <CButton color="success" shape="rounded-pill" class="px-8" @click="Order" style="color: white;">Enviar Oderm</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCardBody>
      </CCard>
    </CCol>
         

                        
        </CCard>
      </CCol>
    </CRow>



    <CRow>
      
      <CCol :md="12">
        
        <CCard class="mb-4">
          <CCardHeader>Destaques de Mercado</CCardHeader>

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
    </CRow>
  
  
  
  
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
          sell: {
                    idCliente: 1,
                    idAtivo: 1,
                    tipoOrdem: "ORDEM_VENDA",
                    valorOrdem: 1,
                    quantidadeOrdem: 1
          },
          buy: {
            
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
          }
    }
  },
  methods:{

    handleItemAtivo(item){
      this.selectedAtivo.id = item.id
      this.selectedAtivo.sigla = item.nome
      this.selectedAtivo.atualizacao = item.atualizacao
      this.selectedAtivo.quantidadesPapeis = item.quantidadesPapeis
      this.selectedAtivo.valorMax = item.valorMax
      this.selectedAtivo.valorMin = item.valorMin
      this.selectedAtivo.valor = item.valor
      },

    async Order(){
                try {
                    await service.sentOrder(this.sell);
                    swal('Sucesso', 'Ações compradas com sucesso!', 'success');
                    } catch (error) {
                        console.error('Erro ao comprar ações:', error);
                        swal('Erro', 'Ocorreu um erro ao comprar ações', 'error');
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
      try{
        this.userProfile = {   
            id: response.id,
            nomeUsuario: response.nomeUsuario,
            saldo: response.saldo,
            email: response.email
        }
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
