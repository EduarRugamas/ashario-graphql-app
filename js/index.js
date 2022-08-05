import {public_key, secret_key, url_base} from '../config/config.js';
import {GetAllProducts, GetAllRetailerIds} from '../utils/fetch_querys.js';
const storage_local = window.localStorage;
const Ashario_Centre_point_Mall = JSON.parse(storage_local.getItem('Ashario_Centrepoint_Mall'));

GetAllRetailerIds();

GetAllProducts(Ashario_Centre_point_Mall.id);
