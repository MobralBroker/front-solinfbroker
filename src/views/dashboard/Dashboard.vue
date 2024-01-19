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
                  <CTableHeaderCell class="bg-body-secondary text-center">
                  </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center" > Ativo </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Hora </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Max. </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Min.</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Valor </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              
              
              <CTableBody>
                
                <CTableRow v-for="item in tableExample" :key="item.name">
                  
                  <CTableDataCell class="text-center">
                  
                  </CTableDataCell>
                  
                  <CTableDataCell class="text-center" >
                    <div>{{ item.user.name }}</div>
                  </CTableDataCell>
                  
                  <CTableDataCell class="text-center">
                    <div>{{ "17:53:26" }}</div>
                  </CTableDataCell>
                  
                  <CTableDataCell class="text-center">
                      <div class="fw-semibold">{{ "50,53" }}</div>
                  </CTableDataCell>
                  
                  
                  <CTableDataCell class="text-center">
                    <div class="fw-semibold">{{ "40,53" }}</div>
                  </CTableDataCell>
                  
                  <CTableDataCell>
                    <div class="small text-body-secondary text-center ">Último Valor</div>
                    <div class="fw-semibold text-nowrap text-center ">{{ item.activity }}
                    </div>
                  </CTableDataCell>
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
import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'
import MainChart from './MainChart'
import service from '../../service/controller';
import swal from 'sweetalert';

export default {
  name: 'Dashboard',
  components: {
    MainChart,
  },
  setup() {
    
    const tableExample = [
      {
        avatar: { src: avatar1, status: 'success' },
        user: {
          name: 'Banco Itau'
        },
        country: { name: 'USA', flag: 'cif-us' },
        usage: {
          value: 50,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'success',
        },
        payment: { name: 'Mastercard', icon: 'cib-cc-mastercard' },
        activity: '10 sec ago',
      },


      
      {
        avatar: { src: avatar2, status: 'danger' },
        user: {
          name: 'Avram Tarasios',
          new: false,
          registered: 'Jan 1, 2023',
        },
        country: { name: 'Brazil', flag: 'cif-br' },
        usage: {
          value: 22,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'info',
        },
        payment: { name: 'Visa', icon: 'cib-cc-visa' },
        activity: '5 minutes ago',
      },
      {
        avatar: { src: avatar3, status: 'warning' },
        user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
        country: { name: 'India', flag: 'cif-in' },
        usage: {
          value: 74,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'warning',
        },
        payment: { name: 'Stripe', icon: 'cib-cc-stripe' },
        activity: '1 hour ago',
      },
      {
        avatar: { src: avatar4, status: 'secondary' },
        user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
        country: { name: 'France', flag: 'cif-fr' },
        usage: {
          value: 98,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'danger',
        },
        payment: { name: 'PayPal', icon: 'cib-cc-paypal' },
        activity: 'Last month',
      },
      {
        avatar: { src: avatar5, status: 'success' },
        user: {
          name: 'Agapetus Tadeáš',
          new: true,
          registered: 'Jan 1, 2023',
        },
        country: { name: 'Spain', flag: 'cif-es' },
        usage: {
          value: 22,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'primary',
        },
        payment: { name: 'Google Wallet', icon: 'cib-cc-apple-pay' },
        activity: 'Last week',
      },
      {
        avatar: { src: avatar6, status: 'danger' },
        user: {
          name: 'Friderik Dávid',
          new: true,
          registered: 'Jan 1, 2023',
        },
        country: { name: 'Poland', flag: 'cif-pl' },
        usage: {
          value: 43,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'success',
        },
        payment: { name: 'Amex', icon: 'cib-cc-amex' },
        activity: 'Last week',
      },
    ]

    return {
      tableExample,
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
              await service.getAtivos();
          } catch(error){

          }
    }
  }
}
</script>
