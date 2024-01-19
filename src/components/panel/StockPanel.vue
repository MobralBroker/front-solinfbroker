<template>
  <div class="dashboard-container">

    <aside class="sidebar">
      <div class="logo">
        <img src="../../assets/img/solinftec.png" alt="Logo">
      </div>

      <div class="dadosuser">
        <div>👤 {{ usuario }}</div>
        <div class="logout" @click="logout">(Sair)</div>
      </div>

      <ul>
        <li><a><router-link to="/dashboard">📊 Dashboard</router-link></a></li>
        <li><a><router-link to="/book">📄 Book</router-link></a></li>
        <li class="active"><a><router-link to="/panel">💹 Investimentos</router-link></a></li>
        <li><a><router-link to="/wallet">💸 Carteira</router-link></a></li>
      </ul>
    </aside>

    <main>
      <h2>💹 Painel de Investimentos</h2>

      <!-- Seção de Compra -->
      <div class="sections-container">

        <!-- Seção de Compra -->
        <section class="section">
          <h3 class="hsection">Compra de Ações</h3>
          <div>
            <label for="stockSymbol">Ativos:</label>
            <input type="text" id="stockSymbol" v-model="buy.stockSymbol" />
            <!-- Adicionando um botão para buscar detalhes do ativo -->
            <button @click="getDetalhesAtivo">Buscar Detalhes</button>

            <label for="quantity">Quantidade:</label>
            <input type="number" id="quantity" v-model="buy.quantity" />

            <label for="price">Preço:</label>
            <input type="number" id="price" v-model="buy.price" />

            <button class="buttonComprar" @click="buyStock">Comprar Ações</button>
          </div>
        </section>

        <!-- Seção de Venda -->
        <section class="section">
          <h3 class="hsection">Venda de Ações</h3>
          <div>
            <label for="sellStockSymbol">Ativos:</label>
            <input type="text" id="sellStockSymbol" v-model="sell.stockSymbol" />

            <label for="sellQuantity">Quantidade:</label>
            <input type="number" id="sellQuantity" v-model="sell.quantity" />

            <label for="sellPrice">Preço:</label>
            <input type="number" id="sellPrice" v-model="sell.price" />

            <button class="buttonComprar" @click="sellStock">Vender Ações</button>
          </div>
        </section>
      </div>

      <!-- Lista de Ações Possuídas -->
      <section v-if="ownedStocks.length > 0">
        <h3>Ações Possuídas</h3>
        <ul>
          <li v-for="(stock, index) in ownedStocks" :key="index">
            {{ stock.symbol }} - Quantidade: {{ stock.quantity }} - Preço Médio: {{ stock.avgPrice }}
          </li>
        </ul>
      </section>

    </main>
  </div>
</template>

<script>
import ordemController from '../../service/ordemController';
import swal from 'sweetalert';

export default {
  data() {
    return {
      buy: {
        stockSymbol: '',
        quantity: 0,
        price: 0,
      },
      sell: {
        stockSymbol: '',
        quantity: 0,
        price: 0,
      },
      ownedStocks: [],
      detalhesAtivo: null, 
    };
  },

  methods: {
    async getDetalhesAtivo(symbol) {
      try {
        const detalhesAtivo = await ordemController.getDetalhesAtivo(symbol);

        // Armazenar os detalhes do ativo para referência posterior
        this.detalhesAtivo = detalhesAtivo;

        console.log('Detalhes do Ativo:', detalhesAtivo);
      } catch (error) {
        console.error('Erro ao obter detalhes do ativo:', error);
        swal('Erro', 'Erro ao obter detalhes do ativo.', 'error');
      }
    },

    async buyStock() {
      const { stockSymbol, quantity, price } = this.buy;

      if (!stockSymbol || quantity <= 0 || price <= 0) {
        console.error('Detalhes de compra inválidos.');
        swal('Erro', 'Detalhes de compra inválidos.', 'error');
        return;
      }

      try {
        // Verificar se os detalhes do ativo foram obtidos
        if (!this.detalhesAtivo) {
          await this.getDetalhesAtivo(stockSymbol);
        }

        // Usar os detalhes do ativo para criar a ordem de compra
        await ordemController.criarOrdemCompra({
          symbol: stockSymbol,
          quantity,
          price,
          detalhesAtivo: this.detalhesAtivo, // Passar os detalhes do ativo para o serviço
        });

        // Atualizar a lista de ações possuídas
        this.updateOwnedStocks();
        swal('Sucesso', 'Ações compradas com sucesso!', 'success');
      } catch (error) {
        console.error('Erro ao comprar ações:', error);
        swal('Erro', 'Ocorreu um erro ao comprar ações', 'error');
      }

      this.buy = {
        stockSymbol: '',
        quantity: 0,
        price: 0,
      };
    },

    // async sellStock() {
    //   const { stockSymbol, quantity, price } = this.sell;

    //   if (!stockSymbol || quantity <= 0 || price <= 0) {
    //     console.error('Detalhes de venda inválidos.');
    //     swal('Erro', 'Detalhes de venda inválidos.', 'error');
    //     return;
    //   }

    //   try {
    //     await ordemController.criarOrdemVenda({
    //       symbol: stockSymbol,
    //       quantity,
    //       price,
    //     });

    //     // Atualizar a lista de ações possuídas
    //     this.updateOwnedStocks();
    //     swal('Sucesso', 'Ações vendidas com sucesso!', 'success');
    //   } catch (error) {
    //     console.error('Erro ao vender ações:', error);
    //     swal('Erro', 'Ocorreu um erro ao vender ações', 'error');
    //   }

    //   this.sell = {
    //     stockSymbol: '',
    //     quantity: 0,
    //     price: 0,
    //   };
    // },
    // logout() {
    //   localStorage.removeItem('token');
    //   this.$router.push('/');
    // },
  },
};
</script>

<style>
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-image: url('../../assets/img/white.png');
    background-size: cover;
    background-position: center;
}

.dashboard-container {
    display: flex;
    min-height: 100vh;
}

.logo {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 25px;
}

.logo img {
    width: 100%;
    margin-right: 10px;
}

.sidebar {
    background-color: #f8f9fa;
    width: 250px;
    padding: 20px;
    box-sizing: border-box;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar ul li a {
    display: block;
    padding: 8px 16px;
    color: #6c757d;
    text-decoration: none;
    border-radius: 5px;
}

.sidebar ul li a:hover {
    background-color: #e9ecef;
    color: #495057;
}

main {
    flex-grow: 1;
    padding: 20px;
    box-sizing: border-box;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th,
table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
}

table th {
    background-color: #f8f9fa;
}

.acoes-historico {
    display: flex;
    justify-content: space-around;
}

label,
input,
button {
    display: block;
    margin-bottom: 10px;
}

input {
    height: 60px;
    font-size: 30px;
}

button {
    background-color: #14a401;
    color: white;
    border: none;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    font-weight: bold;
}

.sections-container {
    display: flex;
    justify-content: space-between;
}

.section {
    width: 49%;
    background-color: #f8f9fa;
    border-radius: 15px;
    padding: 50px;
}

section .hsection {
    text-align: center;
    margin-bottom: 40px;
    font-weight: bold;
}

button.historico {
    background-color: #6c757d;
}

button.historico:hover {
    background-color: #5a6268;
}

section .buttonComprar {
    margin: 0px;
    margin-top: 25px;
    font-size: 20px;
    font-weight: bold;
}

.sidebar li.active {
    font-weight: bold;
    background-color: #e9ecef;
    border-radius: 5px;
}

.dadosuser {
    color: #fff;
    background-color: #14a401;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    height: 90px;
}

.logout {
    margin-left: 5px;
    text-decoration: underline;
    cursor: pointer;
}
</style>
