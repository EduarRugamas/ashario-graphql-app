import {public_key, secret_key, url_base} from '../config/config.js';
import {GetAllProducts, GetAllRetailerIds} from '../utils/fetch_querys.js';
const storage_local = window.localStorage;
const retailerID_Ashario_Centrepoint_Mall = storage_local.getItem('Ashario_Centrepoint_Mall');

console.log(retailerID_Ashario_Centrepoint_Mall.id);

GetAllRetailerIds();

GetAllProducts(retailerID_Ashario_Centrepoint_Mall.id);
