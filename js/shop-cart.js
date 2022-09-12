import {get_count_product, getAllProducts, addItemCart} from '../utils/querys.js';
import {FadeOut} from "../utils/utils.js";

const storage_local = window.localStorage;
let count = 0;
let cart = {};



const btn_action_dropdown_mini_cart = document.getElementById('btn_mini_cart_action');
const mini_cart_items = document.getElementById('content_items_list_mini_cart');
const view_text_count_items_mini_cart = document.getElementById('items_in_mini_cart');
const icon_cart_count = document.querySelector('.alert-count');
const btn_checkout_mini_cart = document.getElementById('btn_checkout_mini_cart');
const btn_clear_cart = document.getElementById('clear_cart');
const btn_refresh_cart = document.getElementById('refresh_cart');
const view_subtotal_pay_products = document.getElementById('total_pay_products');
const view_total_pay_products = document.getElementById('total_price_pay');
const btn_checkout_cart = document.getElementById('btn-checkout-cart');
const contenedor_products = document.getElementById('contenedor_products_cart');
const div_loader = document.querySelector('.content-loader');
const content_price_total_subtotal = document.getElementById('content_total_subtotal');

const id_store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centre_point_Mall'));
const checkoutId = JSON.parse(storage_local.getItem('cart_centre_point_mall'));


window.addEventListener('DOMContentLoaded', async () => {

        let quantity_product = await get_count_product(id_store_centre_point_mall.id);
        let data = await getAllProducts(id_store_centre_point_mall.id, 0, quantity_product);

        if (storage_local.getItem('cart')) {
            cart = JSON.parse(storage_local.getItem('cart'));
        }

        if (storage_local.getItem('count')) {
            count = parseInt(storage_local.getItem('count'));
        }

        console.log(cart);
        console.log(quantity_product);
        if (data !== undefined && data.length !== 0) {
            FadeOut(div_loader);
        }

        if (Object.entries(cart).length === 0) {
            let template_empty_mini_cart = '';
            console.log('el mini cart esta vacio');
            template_empty_mini_cart += `
                    <div >
                        <div class="d-flex align-items-center">
                            <div class="flex-grow-1">
                                <h6 class="cart-product-title">You don't have products in your cart.</h6>
                            </div>
                        </div>
                    </div>`;
            contenedor_products.innerHTML = template_empty_mini_cart;
            btn_checkout_cart.classList.add('disabled');
            btn_checkout_mini_cart.classList.add('disabled');
        } else {
            render_products_cart(contenedor_products, data.products);
            update_icon_cart();
            btn_action_dropdown_mini_cart.addEventListener('click', () => {
                if (Object.entries(cart).length === 0) {
                    let template_empty_mini_cart = '';
                    console.log('el mini cart esta vacio');
                    template_empty_mini_cart += `
                            <div class="dropdown-item">
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1">
                                        <h6 class="cart-product-title">You don't have products in your cart.</h6>
                                    </div>
                                </div>
                            </div>`;
                    mini_cart_items.innerHTML = template_empty_mini_cart;
                    document.getElementById('btn_checkout_mini_cart').disabled = true;
                } else {
                    mini_cart_render(data.products);
                    document.getElementById('btn_checkout_mini_cart').disabled = false;
                }
            });
            btn_checkout_cart.classList.remove('disabled');
            btn_checkout_cart.addEventListener('click', async () => {

                console.log(cart);


                for (let item in cart) {

                    await addItemCart(id_store_centre_point_mall.id, checkoutId.id, cart[item].product_id, cart[item].value_quantity, cart[item].value_weight).then(result => {

                        if (result.data.addItem === null) {
                          const error = result.errors[0];
                          console.log(error);
                          Swal.fire({
                            icon: 'error',
                            text: `Sorry! You've reached the 30g purchase limit for cannabis due to provincial regulations.`,
                            confirmButtonColor: '#3e3e3e',
                          });
                        }else {
                            window.location.href = `${checkoutId.redirectUrl}`;
                        }
                        console.log(checkoutId);
                    });
                }
            });

        }





});


const render_products_cart = (contenedor, arreglo_productos) => {
    let template_items_products = '';
    let sum = 0;
    for (let product in cart) {

        let get_information_product = arreglo_productos.find(item => item.id === cart[product].product_id);

        template_items_products += `
         <div class="row align-items-center g-3">
             <div class="col-12 col-lg-6">
                 <div class="d-lg-flex align-items-center gap-2">
                     <div class="cart-img text-center text-lg-start">
                        <img src="${get_information_product.image}" width="110" alt="${get_information_product.name}">
                     </div>
                     <div class="cart-detail text-center text-lg-start">
                        <h6 class="mb-2">${get_information_product.name}</h6>
                        <p class="mb-0">Quantity: 
                            <span id="string_quantity" product_id="${get_information_product.id}">${cart[product].value_quantity}</span>
                        </p>
                        <p class="mb-2">Weight: 
                            <span>${cart[product].value_weight}</span>
                        </p>
                        <h5 class="mb-0" id="string_price_variant" product_id="${get_information_product.id}">$</h5>
                     </div>
                 </div>
             </div>
             <div class="col-12 col-lg-3">
                 <div class="cart-action text-center">
                    <input type="number" class="form-control rounded-0 input_quantity" id="input_quantity_${get_information_product.id}" value="${cart[product].value_quantity}" min="1" product_id="${get_information_product.id}">
                 </div>
             </div>
             <div class="col-12 col-lg-3">
                 <div class="text-center">
                     <div class="d-flex gap-2 justify-content-center justify-content-lg-end">
                        <a class="btn btn-dark rounded-0 btn-ecomm" id="remove_item_product" product_id="${get_information_product.id}">
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

    const get_string_price = document.querySelectorAll('#string_price_variant');
    const get_string_quantity = document.querySelectorAll('#string_quantity');

    get_string_price.forEach( span => {
       const get_value_product_id = span.getAttribute('product_id');
       console.log(get_value_product_id);
       const get_value_weight = cart[get_value_product_id].value_weight;
       let get_information_product = arreglo_productos.find(item => item.id === get_value_product_id);
       console.log(get_information_product);
       let get_information_price = get_information_product.variants.find(item => item.option === get_value_weight);
       console.log(get_information_price);
       let calc = (cart[get_value_product_id].value_quantity * get_information_price.priceRec).toFixed(2);
       span.textContent = `$${calc}`;
    });

    get_string_quantity.forEach(span => {
        const get_value_product_id = span.getAttribute('product_id');
        span.setAttribute('quantity_item', cart[get_value_product_id].value_quantity);
        span.textContent = cart[get_value_product_id].value_quantity;
    });


    const inputs_quantity = document.querySelectorAll('.input_quantity');
    inputs_quantity.forEach(input => {
        console.log(input.value);
        const get_id_product = input.getAttribute('product_id');
        console.log(get_id_product);
        input.addEventListener('change', () => {
            console.log(input.value)
            cart[get_id_product].value_quantity = parseInt(input.value);
            storage_local.setItem('cart', JSON.stringify(cart));
            console.log(cart);
            get_string_price.forEach( span => {
                const get_value_product_id = span.getAttribute('product_id');
                console.log(get_value_product_id);
                const get_value_weight = cart[get_value_product_id].value_weight;
                let get_information_product = arreglo_productos.find(item => item.id === get_value_product_id);
                console.log(get_information_product);
                let get_information_price = get_information_product.variants.find(item => item.option === get_value_weight);
                console.log(get_information_price);
                let calc = (cart[get_value_product_id].value_quantity * get_information_price.priceRec).toFixed(2);
                span.textContent = `$${calc}`;
            });

            get_string_quantity.forEach(span => {
                const get_value_product_id = span.getAttribute('product_id');
                span.setAttribute('quantity_item', cart[get_value_product_id].value_quantity);
                span.textContent = cart[get_value_product_id].value_quantity;
            });


            renderInvoice(get_string_price);

            get_string_quantity.forEach(span => {
                const get_value_product_id = span.getAttribute('product_id');
                span.setAttribute('quantity_item', cart[get_value_product_id].value_quantity);
                span.textContent = cart[get_value_product_id].value_quantity;
            });

            renderInvoice(get_string_price);
        });

    });
    renderInvoice();
    remove_item_cart('remove_item_product', arreglo_productos);
};

const mini_cart_render = (array_productos) => {
    let template_item_mini_cart = '';
    for (let product in cart) {
        let information_product = array_productos.find(item => item.id === cart[product].product_id);
        template_item_mini_cart += `
            <div class="dropdown-item">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <h6 class="cart-product-title">${information_product.name}</h6>
                        <p class="cart-product-price">${cart[product].value_quantity} X $${(cart[product].value_quantity * information_product.variants[0].priceRec).toFixed(2)}</p>
                    </div>
                    <div class="position-relative">
                        <a class="cart-product-cancel position-absolute" product_id="${information_product.id}" id="btn-remove-item">
                            <i class='bx bx-x'></i>
                        </a>
                        <div class="cart-product">
                            <img src="${information_product.image}" class="" alt="product image">
                        </div>
                    </div>
                </div>
            </div>`;
        mini_cart_items.innerHTML = template_item_mini_cart;
    }
    view_text_count_items_mini_cart.textContent= `${count} ITEMS`;
    remove_item_mini_cart('btn-remove-item', array_productos);

};

const remove_item_mini_cart = (id_btn_remove, array_productos) => {
    const button_remove_mini_cart = document.querySelectorAll(`#${id_btn_remove}`);
    button_remove_mini_cart.forEach( btn => {

        const get_product_id_remove = btn.getAttribute('product_id');
        btn.addEventListener('click', () => {
            console.log('product a elimminar', get_product_id_remove);
            let template_empty_mini_cart = '';
            delete cart[get_product_id_remove];
            storage_local.setItem('cart', JSON.stringify(cart));
            count--;
            update_icon_cart();
            mini_cart_render(array_productos);
            render_products_cart(contenedor_products, array_productos);
            if (Object.entries(cart).length === 0) {
                console.log('el mini cart esta vacio');
                template_empty_mini_cart+= `
                <div class="dropdown-item">
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <h6 class="cart-product-title">You don't have products in your cart.</h6>
                        </div>
                    </div>
                </div>
            `;
                contenedor_products.innerHTML = template_empty_mini_cart;
                mini_cart_items.innerHTML = template_empty_mini_cart;
                btn_checkout_mini_cart.classList.add('disabled');
            }

        });
    });
};
const remove_item_cart = (id_btn_remove, array_productos) => {
    const btn_remove_item_cart = document.querySelectorAll(`#${id_btn_remove}`);
    btn_remove_item_cart.forEach(btn => {

        const get_product_id_remove = btn.getAttribute('product_id');
        btn.addEventListener('click', () => {
            console.log('product a elimminar', get_product_id_remove);
            let template_empty_mini_cart = '';
            delete cart[get_product_id_remove];
            storage_local.setItem('cart', JSON.stringify(cart));
            count--;
            update_icon_cart();
            render_products_cart(contenedor_products, array_productos);
            mini_cart_render(array_productos);
            if (Object.entries(cart).length === 0) {
                console.log('el mini cart esta vacio');
                template_empty_mini_cart+= `
                <div>
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <h6 class="cart-product-title">You don't have products in your cart.</h6>
                        </div>
                    </div>
                </div>
            `;
                contenedor_products.innerHTML = template_empty_mini_cart;
                btn_checkout_cart.classList.add('disabled');
            }
        });
    });
};

const update_icon_cart = () => {
    icon_cart_count.textContent = count;
    storage_local.setItem('count', count);
};

const renderInvoice = (get_string_price) => {
    let subtotal = 0;
    let taxes = 0;

    get_string_price.forEach(quantity => {
        subtotal += parseFloat(quantity.innerHTML.replace("$", ""));
    });

    view_subtotal_pay_products.innerHTML = numberToMonery(subtotal);
    view_total_pay_products.innerHTML = numberToMonery(subtotal + taxes);
};

const numberToMonery = (number) => {
    return "$" + (number).toFixed(2);
};


// if (Object.entries(cart).length === 0) {
//     let template_empty_mini_cart = '';
//     console.log('el mini cart esta vacio');
//     template_empty_mini_cart += `
//                 <div class="dropdown-item">
//                     <div class="d-flex align-items-center">
//                         <div class="flex-grow-1">
//                             <h6 class="cart-product-title">You don't have products in your cart.</h6>
//                         </div>
//                     </div>
//                 </div>`;
//     mini_cart_items.innerHTML = template_empty_mini_cart;
//     document.getElementById('btn_checkout_mini_cart').disabled = true;
// } else {
//     mini_cart_render(array_products);
//     document.getElementById('btn_checkout_mini_cart').disabled = false;
// }

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
