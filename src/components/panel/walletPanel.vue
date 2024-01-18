<template>
    <div class="dashboard-container">

        <asside class="sidebar">
            <ul>
                <li><a @click="navigateTo('Investimentos')">Investimentos</a></li>
                <li><a @click="navigateTo('Book')">Book</a></li>
                <li><a @click="navigateTo('Carteira')">Carteira</a></li>
            </ul>
        </asside>

        <main>

            <h2>Carteira de Investimentos</h2>

            <!-- Seção de Compra -->
            <section>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Ativo</th>
                                <th>Quantidadee</th>
                                <th>Valor da Compra</th>
                                <th>Data da Compra</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.id">
                                <td>{{ item.ativo }}</td>
                                <td>{{ item.quantidade }}</td>
                                <td>{{ item.valorcompra }}</td>
                                <td>{{ item.datacompra }}</td>
                                <td class="acoes-historico">
                                    <button @click="sellStock">Vender</button>
                                    <button class="historico" @click="verHistorico">Histórico</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </section>

        </main>

    </div>
</template>
  
<script>
export default {
    data() {
        return {
            items: [
                { ativo: 'ABC001', quantidade: '25', valorcompra: '25,35', datacompra: '10/12/1993' },
                { ativo: 'ABC001', quantidade: '25', valorcompra: '25,35', datacompra: '10/12/1993' },
                { ativo: 'ABC001', quantidade: '25', valorcompra: '25,35', datacompra: '10/12/1993' },
                { ativo: 'ABC001', quantidade: '25', valorcompra: '25,35', datacompra: '10/12/1993' },
                { ativo: 'ABC001', quantidade: '25', valorcompra: '25,35', datacompra: '10/12/1993' },
                { ativo: 'ABC001', quantidade: '25', valorcompra: '25,35', datacompra: '10/12/1993' },
                { ativo: 'ABC001', quantidade: '25', valorcompra: '25,35', datacompra: '10/12/1993' },
                { ativo: 'ABC001', quantidade: '25', valorcompra: '25,35', datacompra: '10/12/1993' }
            ]
        };
    }
};
</script>
  
<style>
html,
body {
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
}

table {
    background-color: #fff;
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.acoes-historico{
    text-align: center;
    background-color: #f2f2f2;
}

.historico{
    background-color: #88bd8a;
}

th {
    background-color: #f2f2f2;
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
    margin-right: 5px;
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
</style>