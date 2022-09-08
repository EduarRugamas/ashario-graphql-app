import {getAllProducts, get_count_product} from '../utils/querys.js';
const storage_local = window.localStorage;
let count = 0;
let cart = {};


const btn_action_dropdown_mini_cart = document.getElementById('btn_mini_cart_action');
const view_text_count_items_mini_cart = document.getElementById('items_in_mini_cart');
const btn_checkout_mini_cart = document.getElementById('btn_checkout_mini_cart');
const btn_clear_cart = document.getElementById('clear_cart');
const btn_refresh_cart = document.getElementById('refresh_cart');
const view_subtotal_pay_products = document.getElementById('total_pay_products');
const view_total_pay_products = document.getElementById('total_price_pay');
const btn_checkout_cart = document.getElementById('btn-checkout-cart');
const contenedor_products = document.getElementById('contenedor_products_cart');

const store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centre_point_Mall'));
const checkout_id = JSON.parse(storage_local.getItem('cart_centre_point_mall'));


window.addEventListener('DOMContentLoaded', async () => {

        let quantity_product = await get_count_product(store_centre_point_mall.id);
        let data = await getAllProducts(store_centre_point_mall.id, 0, quantity_product);

        if (storage_local.getItem('cart')) {
            cart = JSON.parse(storage_local.getItem('cart'));
        }else {
            storage_local.setItem('cart', cart);
        }

        if (storage_local.getItem('count')) {
            count = parseInt(storage_local.getItem('count'));
        }else {
            storage_local.setItem('count', count);
        }

        console.log(cart);
        console.log(quantity_product);
        render_products_cart(contenedor_products, data.products);

});


const render_products_cart = (contenedor, arreglo_productos) => {
    let template_items_products = '';

    for (let product in cart) {

        let get_information_product = arreglo_productos.find(item => item.id === cart[product].product_id);

        template_items_products += `
         <div class="row align-items-center g-3">
             <div class="col-12 col-lg-6">
                 <div class="d-lg-flex align-items-center gap-2">
                     <div class="cart-img text-center text-lg-start">
                        <img src="${get_information_product.image}" width="130" alt="${get_information_product.name}">
                     </div>
                     <div class="cart-detail text-center text-lg-start">
                        <h6 class="mb-2">${get_information_product.name}</h6>
                        <p class="mb-0">Size: 
                            <span>Medium</span>
                        </p>
                        <p class="mb-2">Color: 
                            <span>Black</span>
                        </p>
                        <h5 class="mb-0">$14.00</h5>
                     </div>
                 </div>
             </div>
             <div class="col-12 col-lg-3">
                 <div class="cart-action text-center">
                    <input type="number" class="form-control rounded-0" value="1" min="1">
                 </div>
             </div>
             <div class="col-12 col-lg-3">
                 <div class="text-center">
                     <div class="d-flex gap-2 justify-content-center justify-content-lg-end">
                        <a class="btn btn-dark rounded-0 btn-ecomm" id="remove_item_product">
                            <i class='bx bx-x-circle'></i>
                            Remove
                        </a>
                     </div>
                 </div>
             </div>
         </div>
         <div class="my-4 border-top"></div>
         `;

         contenedor.innerHTML = template_items_products;
    }


}






// template for cart items

// <div class="row align-items-center g-3">
//     <div class="col-12 col-lg-6">
//         <div class="d-lg-flex align-items-center gap-2">
//             <div class="cart-img text-center text-lg-start">
//                 <img src="assets/images/products/09.png" width="130" alt="">
//             </div>
//             <div class="cart-detail text-center text-lg-start">
//                 <h6 class="mb-2">Men Black Hat Cap</h6>
//                 <p class="mb-0">Size: <span>Medium</span>
//                 </p>
//                 <p class="mb-2">Color: <span>Black</span>
//                 </p>
//                 <h5 class="mb-0">$14.00</h5>
//             </div>
//         </div>
//     </div>
//     <div class="col-12 col-lg-3">
//         <div class="cart-action text-center">
//             <input type="number" class="form-control rounded-0" value="1" min="1">
//         </div>
//     </div>
//     <div class="col-12 col-lg-3">
//         <div class="text-center">
//             <div class="d-flex gap-2 justify-content-center justify-content-lg-end">
//                 <a class="btn btn-dark rounded-0 btn-ecomm" id="remove_item_product">
//                     <i class='bx bx-x-circle'></i>
//                     Remove
//                 </a>
//             </div>
//         </div>
//     </div>
// </div>
// <div class="my-4 border-top"></div>
