### Configuração em .src/api.js

#### Alterar host e porta de conexão de acordo com as APIs.


#### const authenticationApi = axios.create({ baseURL: 'localhost:8080' });
#### const crudApi = axios.create({ baseURL: 'localhost:8081' });


#### FIX
--> Logica de Post | Get na tela Painel de investimentos sem funcionar! Validar comunicação com API CRUD