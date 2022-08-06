import {GetProduct} from '../utils/fetch_querys.js';
const urlParams = new URLSearchParams(window.location.search);
const storage_local = window.localStorage;
const id_store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centrepoint_Mall'));
const id_product = urlParams.get('id');

console.log('aqui el id', id_product);

GetProduct(id_store_centre_point_mall.id, id_product).then( item => {

}).catch(error => console.log(error.message));

