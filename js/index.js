import {GetAllProducts, GetAllRetailerIds} from '../utils/fetch_querys.js';
import { createElementHtml, appendElementHtml } from '../utils/elements_html.js';
const storage_local = window.localStorage;
const Ashario_Centre_point_Mall = JSON.parse(storage_local.getItem('Ashario_Centrepoint_Mall'));

GetAllRetailerIds();

GetAllProducts(Ashario_Centre_point_Mall.id).then( items => {

    console.log(items);
    let information = items.menu.products;

    information.map( products => {
        console.log(products);
    })

})
