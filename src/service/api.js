// import axios from 'axios'

//     export autenticationApi()=>axios.create({
//     baseURL: 'https://d4f0-2804-14c-4583-20a2-ae8-a2a0-41bf-43e8.ngrok-free.app'
// })

// const mainAxios = axios.create({
//     baseURL: 'https://d4f0-2804-14c-4583-20a2-ae8-a2a0-41bf-43e8.ngrok-free.app'
// })

import axios from 'axios';

const authenticationApi = axios.create({ baseURL: 'https://d4f0-2804-14c-4583-20a2-ae8-a2a0-41bf-43e8.ngrok-free.app' });
const crudApi = axios.create({ baseURL: '' });

export { authenticationApi, crudApi };
