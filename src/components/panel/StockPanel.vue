<template>
  <div class="dashboard-container">
    <!-- Painel Lateral -->
    <aside class="sidebar">
      <ul>
        <li><a @click="navigateTo('Investimentos')">Investimentos</a></li>
        <li><a @click="navigateTo('Book')">Book</a></li>
        <li><a @click="navigateTo('Carteira')">Carteira</a></li>
      </ul>
    </aside>
    <main>
      <h2>Painel de Investimentos</h2>

      <!-- Seção de Compra -->
      <section>
        <h3>Compra de Ações</h3>
        <div>
          <label for="stockSymbol">Símbolo da Ação:</label>
          <input type="text" id="stockSymbol" v-model="buy.stockSymbol" />

          <label for="quantity">Quantidade:</label>
          <input type="number" id="quantity" v-model="buy.quantity" />

          <label for="price">Preço:</label>
          <input type="number" id="price" v-model="buy.price" />

          <button @click="buyStock">Comprar Ações</button>
        </div>
      </section>

      <!-- Seção de Venda -->
      <section>
        <h3>Venda de Ações</h3>
        <div>
          <label for="sellStockSymbol">Símbolo da Ação:</label>
          <input type="text" id="sellStockSymbol" v-model="sell.stockSymbol" />

          <label for="sellQuantity">Quantidade:</label>
          <input type="number" id="sellQuantity" v-model="sell.quantity" />

          <label for="sellPrice">Preço:</label>
          <input type="number" id="sellPrice" v-model="sell.price" />

          <button @click="sellStock">Vender Ações</button>
        </div>
      </section>

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

    <!-- Botão de Logout -->
    <button @click="logout" class="logout-button">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buy: {
        stockSymbol: "",
        quantity: 0,
        price: 0,
      },
      sell: {
        stockSymbol: "",
        quantity: 0,
        price: 0,
      },
      ownedStocks: [],
    };
  },
  methods: {
    navigateTo(section) {
      console.log(`Navigating to ${section}`);
    },
    buyStock() {
      const { stockSymbol, quantity, price } = this.buy;
      const totalCost = quantity * price;

      if (totalCost <= 0) {
        console.error("Invalid purchase details.");
        return;
      }

      this.ownedStocks.push({
        symbol: stockSymbol,
        quantity,
        avgPrice: totalCost / quantity,
      });

      this.buy = {
        stockSymbol: "",
        quantity: 0,
        price: 0,
      };
    },
    sellStock() {
      const { stockSymbol, quantity, price } = this.sell;

      const stockIndex = this.ownedStocks.findIndex(stock => stock.symbol === stockSymbol);
      if (stockIndex === -1 || this.ownedStocks[stockIndex].quantity < quantity) {
        console.error("Invalid sell details.");
        return;
      }

      const profit = quantity * (price - this.ownedStocks[stockIndex].avgPrice);

      this.ownedStocks[stockIndex].quantity -= quantity;

      if (this.ownedStocks[stockIndex].quantity === 0) {
        this.ownedStocks.splice(stockIndex, 1);
      }

      this.sell = {
        stockSymbol: "",
        quantity: 0,
        price: 0,
      };
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  html, body {
    height: 100%;
    margin: 0;
  }

  body {
    background-image: url('../../assets/img/white.png');
    background-size: cover;
    background-position: center;
    font-family: Arial, sans-serif;
  }

  .dashboard-container {
    max-width: 800px;
    margin: 0 auto;
    position: relative; /* Adiciona posição relativa para posicionar o botão de logout */
  }

  h2 {
    color: #333;
  }

  h3 {
    color: #555;
    margin-top: 20px;
  }

  section {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    background-color: #eee;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
  }

  .logout-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff3333;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
</style>

