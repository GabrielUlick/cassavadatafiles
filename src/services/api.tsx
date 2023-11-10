import axios from 'axios';


const Api = axios.create({
     baseURL: 'https://api.olhai.me/v1/',
});

export default Api;