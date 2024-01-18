<template>
    <div class="dashboard-container">

        <aside class="sidebar">
            <div class="logo">
                <img src="../../assets/img/solinftec.png" alt="Logo">
            </div>
            <ul>
                <li><a><router-link to="/dashboard">📊 Dashboard</router-link></a></li>
                <li><a><router-link to="/book">📄 Book</router-link></a></li>
                <li><a><router-link to="/panel">💹 Investimentos</router-link></a></li>
                <li class="active"><a><router-link to="/wallet">💸 Carteira</router-link></a></li>
                <li><a @click="logout">🚪 Sair</a></li>
            </ul>
        </aside>

        <main>
            <h2>💼 Saldo</h2>

            <section>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Reais (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="saldo in saldo" :key="saldo.saldo">
                                <td>{{ saldo.saldo }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </section>

            <h2>💸 Ativos</h2>

            <section>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Ativo</th>
                                <th>Quantidade</th>
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
            saldo: [
                { saldo: '100,00' }
            ],
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
    background-color: #fff;
}

table tr:nth-child(even) {
    background-color: #f2f2f2;
}

table tr:hover {
    background-color: #ddd;
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

button:hover {
    background-color: #0f7c00;
}

button.historico {
    background-color: #6c757d;
}

button.historico:hover {
    background-color: #5a6268;
}

.sidebar li.active {
    font-weight: bold;
    background-color: #e9ecef;
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

section{
    margin-bottom: 25px;
}
</style>