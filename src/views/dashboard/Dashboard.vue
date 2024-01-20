<template>
  <div>
    
  
    <WidgetsStatsD class="mb-4" />
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

                <!-- Compra -->
                <CListGroup>
                  <CListGroupItem active>Compra</CListGroupItem>
                  <CFormInput placeholder="Ativo" autocomplete="Ativo" />
                  <CFormInput placeholder="Valor" autocomplete="Valor" />
                  <CFormInput placeholder="Quantidade" autocomplete="username" />

                </CListGroup>
              <br>
                <CButton color="success" shape="rounded-pill" class="px-8" @click="Order" style="color: white;">Comprar</CButton>
              </CCol>
              <CCol :xs="6">

                <!-- Venda -->
                <CListGroup>
                  <CListGroupItem active>Venda</CListGroupItem>
                  <CFormInput placeholder="Ativo" autocomplete="Ativo" />
                  <CFormInput placeholder="Valor" autocomplete="Valor" />
                  <CFormInput placeholder="Quantidade" autocomplete="username" />
                </CListGroup>
                <br>
                <CButton color="danger" shape="rounded-pill" class="px-8" @click="Ativos()" style="color: white;">Vender</CButton>

              </CCol>
            </CRow>
          </CCardBody>
        </CCardBody>
      </CCard>
    </CCol>
         

                

        
        
        </CCard>
      </CCol>
    </CRow>



    <WidgetsStatsA class="mb-4" />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">

          <CCardFooter>



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




          </CCardFooter>
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
    vetorAtivos: []
    return {
          sell: {
                    idCliente: 1,
                    idAtivo: 1,
                    tipoOrdem: "ORDEM_VENDA",
                    valorOrdem: 1,
                    quantidadeOrdem: 1
          },
          buy: {
            
          }
    }
  },
  methods:{

    handleItemAtivo(item){
      console.log(item)
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
              const responseData = response.data

             if (Array.isArray(responseData)) {

              this.vetorAtivos = responseData.map(item => {   
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
  
  },

  /*  FINISH FUNC'S    */

  mounted() {
    this.Ativos();
  },
}
</script>
