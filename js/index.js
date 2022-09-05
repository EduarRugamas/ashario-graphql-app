import {
    addItemCart,
    createCheckout,
    filter_cbd,
    filter_strain_type_lineage,
    filter_thc,
    filter_weights,
    filter_search_product,
    getAllProducts,
    getRetailersIds,
    get_count_product
} from '../utils/querys.js';
import {FadeOut, FadeIn} from '../utils/utils.js'
import {appendElementHtml, createElementHtml} from "../utils/elements_html.js";

// contenedor principal de productos
const container_products = document.querySelector('#container-products');
const div_loader = document.querySelector('.content-loader');
// fin contenedor principal de productos

// declacion de botones de filtro lineage and weights
const groupRadio = document.getElementsByName('filter_lineage');
const groupWeigths = document.getElementsByName('filter_weights');
let radio_all = document.querySelector('#filter_all_lineage');
let radio_indica = document.querySelector('#filter_indica');
let radio_sativa = document.querySelector('#filter_sativa');
let radio_hybrid = document.querySelector('#filter_hybrid');
let radio_high_cbd = document.querySelector('#filter_high_cbd');
let radio_not_applicable = document.querySelector('#filter_not_applicable');
// fin declacion de botones de filtro lineage and weights

//declaracion de botones o contenedores no principales

// fin declaracion de botones o contenedores no principales
const btn_shop_cart_link = document.querySelector('#btn_mini_cart_actionn');
const icon_cart_count = document.querySelector('.alert-count');
const mini_cart_items = document.getElementById('content_items_list_mini_cart');
const view_items_mini_cart = document.getElementById('items_in_mini_cart');
let count = 0;
let cart = {};
let items_products_storage_local = {};
// declaracion de variable local storage
const storage_local = window.localStorage;
// fin declaracion de variable local storage

// declaraciones de filtros range thc and cbd
let slider_thc = document.querySelector('#slider_thc');
let thc = document.querySelector('#title_slider_thc');
let btn_thc = document.querySelector('#btn-filter-thc');
let btn_reset_thc = document.querySelector('#btn-reset-filter-thc');

let slider_cbd = document.querySelector('#slider_cbd');
let cbd = document.querySelector('#title_slider_cbd');
let btn_cbd = document.querySelector('#btn-filter-cbd');
let btn_reset_cbd = document.querySelector('#btn-reset-filter-cbd');
// fin declaraciones de filtros range thc and cbd
//variables de paginacion
let page_previous = 0;
let page_next = 20;
let all_produts;

import { url_base, secret_key} from '../config/config.js';

//fin de variables


window.addEventListener('DOMContentLoaded', async () => {

        await getRetailersIds().then( async result => {

            if (storage_local.getItem('count')){
                count = parseInt( storage_local.getItem('count') );
            }

            if (storage_local.getItem('cart')) {
                items_products_storage_local = JSON.parse(storage_local.getItem('cart'));
            }

            result.find(item => {
                if (item.name === 'Ashario - Centrepoint Mall') {
                    let store_centre_point_mall = {
                        name: item.name,
                        id: item.id,
                        menuTypes: item.menuTypes,
                        address: item.address
                    }

                    console.log(item);

                    storage_local.setItem('Ashario_Centre_point_Mall', JSON.stringify(store_centre_point_mall));
                    console.log('se guardo en el local storage');
                }

                if (item.name === 'Ashario - Aurora') {
                    let store_aurora = {
                        name: item.name,
                        id: item.id,
                        menuTypes: item.menuTypes,
                        address: item.address
                    }

                    console.log(item);

                    storage_local.setItem('Ashario_Aurora', JSON.stringify(store_aurora));
                    console.log('se guardo en el local storage');
                }

                if (item.name === 'Ashario - North York') {
                    let store_north_york = {
                        name: item.name,
                        id: item.id,
                        menuTypes: item.menuTypes,
                        address: item.address
                    }

                    console.log(item);

                    storage_local.setItem('Ashario_North_York', JSON.stringify(store_north_york));
                    console.log('se guardo en el local storage');
                }
            });

            const store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centre_point_Mall'));

            const response = createCheckout(store_centre_point_mall.id, 'PICKUP', 'RECREATIONAL');
            response.then( result => {
                console.log(result);
                // const url_retorno = result.redirectUrl;
                // btn_shop_cart_link.setAttribute('href', url_retorno);
                let cart_centre_point_mall = {
                    id: result.id,
                    items: result.items,
                    pricingType: result.pricingType,
                    redirectUrl: result.redirectUrl
                };
                storage_local.setItem('cart_centre_point_mall', JSON.stringify(cart_centre_point_mall));

            }).catch(error => {
                console.log('error query', error.message);
            });

            let count_Products = get_count_product(store_centre_point_mall.id);
            console.log(count_Products)
            let data = await getAllProducts(store_centre_point_mall.id, page_previous, 489);
            let filter_indica = await filter_strain_type_lineage(store_centre_point_mall.id, 'indica');
            let filter_sativa = await filter_strain_type_lineage(store_centre_point_mall.id, 'sativa');
            let filter_hybrid = await filter_strain_type_lineage(store_centre_point_mall.id, 'hybrid');
            let filter_high_cbd = await filter_strain_type_lineage(store_centre_point_mall.id, 'high_cbd');
            let filter_not_applicable = await filter_strain_type_lineage(store_centre_point_mall.id, 'not_applicable');

            let filter_35G = await filter_weights(store_centre_point_mall.id, 3.5);
            let filter_28G = await filter_weights(store_centre_point_mall.id, 28);
            let filter_1G = await filter_weights(store_centre_point_mall.id, 1);
            let filter_7G = await filter_weights(store_centre_point_mall.id, 7);
            let filter_14G = await filter_weights(store_centre_point_mall.id, 14);


            if (radio_all.checked && radio_all.value === 'all'){

                if (data === undefined && data.length === 0) {
                    FadeOut(div_loader);
                }

                cartProduct(container_products, data.products);

            }

            if (radio_indica.checked && radio_indica.value === 'indica') {
                cartProduct(container_products, filter_indica.products);
            }
            if (radio_sativa.checked && radio_sativa.value === 'sativa') {
                cartProduct(container_products, filter_sativa.products);
            }
            if (radio_hybrid.checked && radio_hybrid.value === 'hybrid') {
                cartProduct(container_products, filter_hybrid.products);
            }
            if (radio_high_cbd.checked && radio_high_cbd.value === 'high_cbd') {
                cartProduct(container_products, filter_high_cbd.products);
            }
            if (radio_not_applicable.checked && radio_not_applicable.value === 'not_applicable') {
                cartProduct(container_products, filter_not_applicable.products);
            }


            groupRadio.forEach( (radio) => {
                radio.addEventListener('change', () => {
                    if (radio.checked  && radio.value === 'all') {
                        cartProduct(container_products, data.products);
                    }
                    if (radio.value === 'indica' && radio.checked) {
                        cartProduct(container_products, filter_indica.products);
                    }
                    if (radio.value === 'sativa' && radio.checked){
                        cartProduct(container_products, filter_sativa.products);
                    }
                    if (radio.value === 'hybrid' && radio.checked) {
                        cartProduct(container_products, filter_hybrid.products);
                    }
                    if (radio.value === 'high_cbd' && radio.checked) {
                        console.log('entro a high_cbd');
                        cartProduct(container_products, filter_high_cbd.products);
                    }
                    if (radio.value === 'not_applicable' && radio.checked) {
                        console.log('entro a not applicable');
                        cartProduct(container_products, filter_not_applicable.products);
                    }
                })
            });

            groupWeigths.forEach(weights => {
                weights.addEventListener('change', () => {
                    if (weights.checked  && weights.value === 'all') {
                        cartProduct(container_products, data.products);
                    }
                    if (weights.value === '3.5G' && weights.checked) {
                        cartProduct(container_products, filter_35G.products);
                        ViewWeigthsSpecial(filter_35G.products, '3.5g');
                    }
                    if (weights.value === '28G' && weights.checked) {
                        cartProduct(container_products, filter_28G.products);
                        ViewWeigthsSpecial(filter_28G.products, '28g');
                    }
                    if (weights.value === '1G' && weights.checked) {
                        cartProduct(container_products, filter_1G.products);
                        ViewWeigthsSpecial(filter_1G.products, '1g');
                    }
                    if (weights.value === '7G' && weights.checked) {
                        cartProduct(container_products, filter_7G.products);
                        ViewWeigthsSpecial(filter_7G.products, '7g');
                    }
                    if (weights.value === '14G' && weights.checked) {
                        cartProduct(container_products, filter_14G.products);
                        ViewWeigthsSpecial(filter_14G.products, '14g');
                    }

                });
            });


                noUiSlider.create(slider_thc, {
                    start: [0, 36],
                    behaviour: 'snap',
                    step: 1,
                    connect: true,
                    format: wNumb({
                      decimals: 0
                    }),
                    range: {
                        min: 0,
                        max: 36
                    }
                });

                noUiSlider.create(slider_cbd, {
                    start: [0, 16],
                    behaviour: 'snap',
                    step: 1,
                    connect: true,
                    format: wNumb({
                        decimals: 0
                    }),
                    range: {
                        min: 0,
                        max: 16
                    }
                });


                slider_thc.noUiSlider.on('update', function (values) {
                    thc.innerHTML = `${values.join(' % - ')} %`;
                });

                slider_cbd.noUiSlider.on('update', function (values) {
                    cbd.innerHTML = `${values.join(' % - ')} %`;
                });

                btn_thc.addEventListener('click', async () => {
                    let data_thc = slider_thc.noUiSlider.get();

                    const filt_thc = await filter_thc(store_centre_point_mall.id, data_thc[0], data_thc[1]);
                    cartProduct(container_products, filt_thc.products);
                });

                btn_cbd.addEventListener('click', async () => {
                    let data_cbd = slider_cbd.noUiSlider.get();

                    const filt_cbd = await filter_cbd(store_centre_point_mall.id, data_cbd[0], data_cbd[1]);
                    cartProduct(container_products, filt_cbd.products);

                });

                btn_reset_thc.addEventListener('click', () => {
                    slider_thc.noUiSlider.reset();
                    cartProduct(container_products, data.products);
                });

                btn_reset_cbd.addEventListener('click', () => {
                    slider_cbd.noUiSlider.reset();
                    cartProduct(container_products, data.products);
                });

                // search filter
                render_search_products( container_products ,store_centre_point_mall.id, 'searchBox', data);

        }).catch(error => {
            console.log('Error query', error.message);
            ViewEmpty(container_products);
        })

});

    const cartProduct = (container_products, array_products) => {
        container_products.innerHTML = `
        
            ${ array_products.map( product => `
            
             <div class="col">
                <div class="card rounded-0 product-card">
                        <a href="/views/product-details.html?id=${product.id}" id="container_carrousel_imgs">
                            <img src="${product.image !== null ? product.image : '../assets/images/errors-images/image-not-found.jpeg'}" class="card-img-top" alt="${product.name}" id="imagen-product">
                        </a>
                    <div class="card-body">
                        <div class="product-info">
                            <a href="/views/product-details.html?id=${product.id}" id="content_text_brand">
                                <p class="product-catergory font-13 mb-1 content-badge-strain" badge_id="${product.id}" id="badge-straint-${product.id}"></p>
                                <p class="product-catergory font-13 mb-1 itembrand text-center">${product.brand.name}</p>
                                <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype"></p>
                            </a>
                            <a href="/views/product-details.html?id=${product.id}">
                                <h6 class="product-name mb-2 itemname">${product.name}</h6>
                            </a>
                            <div class="d-flex align-items-center content_item_price">
                                <div class="mb-1 product-price itemprice jcitemprice">
                                    <span class="fs-5 currencyformat jcpriceformat">CAD 
                                        <span id="cad-${product.id}" style="font-weight: 700; color: #000; font-size: 1.25rem!important;"></span>
                                         / 
                                         <span id="current-weight-${product.id}"></span></span>
                                    </span>
                                    <span class="fs-5 jcpricingnw"></span>
                                    <span class="er-each jceachformat" style="align-items: flex-end;"></span>
                                </div>
                            </div>
                            <div class="d-flex align-content-center align-items-center justify-content-center mt-1">
                                <div class="me-4" id="container_quantity">
                                    <label class="form-label">Quantity</label>
                                    <select class="form-select form-select-sm select-quantity" id="quantity-${product.id}" product_id="${product.id}">
                                        ${numberToArray(parseInt(product.variants[0].quantity) + 1).map(q => `<option>${q}</option>`)}
                                    </select>
                                </div>
                                <div class="" id="container_weight">
                                    <label class="form-label">weight</label>
                                    <select class="form-select form-select-sm select-weight" id="select-weight-${product.id}" product_id="${product.id}">
                                        ${product.variants.map(variant => `<option>${variant.option}</option>`)}
                                    </select>
                                </div>
                            </div>
                            <div class="product-action mt-2" id="content">
                               <div class="d-grid gap-2">
                                    <a class="btn btn-dark btn-ecomm" id="add_to_cart_btn" id_product="${product.id}"><i class="bx bxs-cart-add"></i>add to cart</a>
                                    <a href="/views/product-details.html?id=${product.id}" class="btn btn-light btn-ecomm">Product Details</a>
                               </div> 
                            </div> 
                        </div>
                    </div>
                </div>
             </div>  
            
            `
        ).join('')}`;

        array_products.forEach( item => {
            const tmpSelectQuantity = document.getElementById("quantity-" + item.id);
            const tmpSelectWeight = document.getElementById("select-weight-" + item.id);
            const tmpLabelCAD = document.getElementById("cad-" + item.id);
            const tmpLabelCurrentWeight = document.getElementById("current-weight-" + item.id);

            const UpdateCad = () => {
                const priceInstance = item.variants.filter(variant => variant.option.toLowerCase() === tmpSelectWeight.value.toLowerCase());

                let price;
                if (priceInstance != null) {
                    price = parseFloat(priceInstance[0].priceRec);
                }

                const total = price * parseInt(tmpSelectQuantity.value);

                tmpLabelCAD.innerHTML = '$' + (Math.round(total * 100) / 100).toFixed(2);
                tmpLabelCurrentWeight.innerHTML = (tmpSelectWeight.value).toUpperCase();
            };

            tmpSelectQuantity.addEventListener("change", UpdateCad);
            tmpSelectWeight.addEventListener("change", UpdateCad);

            UpdateCad();

        });


        const btn_add_cart_grid = document.querySelectorAll('#add_to_cart_btn');
        const checkout_id = JSON.parse(storage_local.getItem('cart_centre_point_mall'));
        const store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centre_point_Mall'));


        btn_add_cart_grid.forEach( btn => {
            btn.addEventListener('click', () => {


                const product_id = btn.getAttribute('id_product');
                const get_select_quantity = document.getElementById('quantity-' + product_id);
                const get_select_weight = document.getElementById('select-weight-' + product_id);

                console.log(`${store_centre_point_mall.id}, ${checkout_id.id}, ${product_id}, quantity:${get_select_quantity.value}, option: ${get_select_weight.value}`);
                const id_store = store_centre_point_mall.id;
                const checkout_id_store = checkout_id.id;
                const value_quantity = get_select_quantity.value;
                const value_weight = get_select_weight.value;



                if (product_id in cart) {

                    cart[product_id].value_quantity = value_quantity;
                    cart[product_id].value_weight = value_weight;
                    storage_local.setItem('cart', JSON.stringify(cart));
                    let card_view_product = array_products.find(item => item.id === product_id);
                    Swal.fire({
                        title: 'Update product!',
                        text: `${card_view_product.name}`,
                        imageUrl: `${card_view_product.image}`,
                        imageWidth: 250,
                        imageHeight: 300,
                        imageAlt: `${card_view_product.name}`,
                    });

                }else {
                    let data_product = {
                        id_store,
                        checkout_id_store,
                        product_id,
                        value_quantity,
                        value_weight
                    };
                    console.log('Objeto json a enviar a mini cart', data_product);

                    // cart[product_id].push(add_item_cart);
                    cart[product_id] = data_product;
                    count ++;
                    storage_local.setItem('cart', JSON.stringify(cart));
                    console.log(`Se guardo en el local_storage key --> ${JSON.stringify(cart[product_id])}`);
                    update_icon_cart();

                    let card_view_product = array_products.find(item => item.id === product_id);
                    console.log(card_view_product);

                    Swal.fire({
                         title: 'Added to cart!',
                         text: `${card_view_product.name}`,
                         imageUrl: `${card_view_product.image}`,
                         imageWidth: 250,
                         imageHeight: 300,
                         imageAlt: `${card_view_product.name}`,
                    });

                }






                // addItemCart(store_centre_point_mall.id, checkout_id.id, product_id, get_select_quantity.value, get_select_weight.value).then( result => {
                //     console.log(result);
                //     if (result.data.addItem === null ) {
                //         const error = result.errors[0];
                //         console.log(error);
                //         Swal.fire({
                //             icon: 'error',
                //             text: `Sorry! You've reached the 30g purchase limit for cannabis due to provincial regulations.`,
                //             confirmButtonColor: '#3e3e3e',
                //         });
                //     }
                //
                //     const results = result.data.addItem.items;
                //
                //     let card_view_product = results.find(item => item.productId === product_id);
                //
                //     count++;
                //     update_icon_cart();
                //
                //     Swal.fire({
                //         title: 'Added to cart!',
                //         text: `${card_view_product.product.name}`,
                //         imageUrl: `${card_view_product.product.image}`,
                //         imageWidth: 250,
                //         imageHeight: 300,
                //         imageAlt: `${card_view_product.product.name}`,
                //     });
                // });


            });
        });
        badge_strainType(array_products);
        update_icon_cart()

        btn_shop_cart_link.addEventListener('click', () => {
            mini_cart_render(array_products);
        })


    };

    const numberToArray = (number) => {
    const tmp = [];

    for (let i = 1; i <= number; i++) {
        tmp.push(i);
    }

    return tmp;
};

    const render_search_products = (container_products, retailerId, id_container_search, array_all_products) => {
        let search = '';
        const filter_search = document.getElementById(`${id_container_search}`);

        search += `
           <div class="input-group mb-3 ms-1 me-1">
              <input type="text" class="form-control shadow-none" style="outline: none; border-color: #000000;" placeholder="Search for products" id="input_search_text">
              <button class="btn btn-outline-dark shadow-none" style="outline: none;" type="button" id="clear_filter_search"><i class='bx bx-x'></i></button>
              <button class="btn btn-outline-dark shadow-none" style="outline: none;" type="button" id="button_search_products"><i class='bx bx-search-alt-2 bx-rotate-90' ></i></button>
           </div>
        `;

        filter_search.innerHTML = search;

        const btn_search = document.getElementById('button_search_products');
        btn_search.addEventListener('click', () => {
            let get_text_input_search = document.getElementById('input_search_text').value;

            if (get_text_input_search === "") {
                console.log('El input esta vacio');
            }

            const result = filter_search_product(retailerId, get_text_input_search.toString(), 0, 50);

            result.then( response => {
                if (response.products.length === 0 ){
                    console.log('sin resultados');
                    ViewEmpty(container_products);
                }
                console.log(response.products);
                cartProduct(container_products, response.products);



            }).catch(error => {
                console.log('error en el search', error);
                ViewEmpty(container_products);
            });

        });
        const btn_clear_search = document.getElementById('clear_filter_search');
        btn_clear_search.addEventListener('click', () => {
            document.getElementById('input_search_text').value="";
            cartProduct(container_products, array_all_products.products);
        });
        const input_search = document.getElementById('input_search_text');
        input_search.addEventListener('keyup', (event) => {
            console.log(input_search.value);
            const result = filter_search_product(retailerId, input_search.value.toString(), 0, 50);
            result.then( response => {
                if (response.products.length === 0 ){
                    console.log('sin resultados');
                    ViewEmpty(container_products);
                }
                console.log(response);
                cartProduct(container_products, response.products);



            }).catch(error => {
                console.log('error en el search', error.message);
                ViewEmpty(container_products);
            });
        });




    };
    const badge_strainType = (array_products) => {
        const content_strain_badge = document.querySelectorAll('.content-badge-strain');

        content_strain_badge.forEach( p => {
            const id_product = p.getAttribute('badge_id');
            const get_element_strain = document.getElementById('badge-straint-' + id_product);
            const get_information_strainType = array_products.find(item => item.id === id_product);
            p.setAttribute('strainType', get_information_strainType.strainType);
            const get_strainType = p.getAttribute('strainType');

            if (get_strainType === 'SATIVA') {
                p.className = 'badge bg-badge-strainType-sativa font-13 text-center';
                p.textContent = 'Uplift (SATIVA)';
            }else if (get_strainType === 'INDICA') {
                p.className = 'badge bg-badge-strainType-indica font-13 text-center';
                p.textContent = 'Unwind (INDICA)';
            }else if (get_strainType === 'HYBRID') {
                p.className = 'badge bg-badge-strainType-hybrid font-13 text-center';
                p.textContent = 'Connect (HYBRID/BLEND)';
            }else if (get_strainType === 'HIGH_CBD'){
                p.className = 'badge bg-badge-strainType-high-cbd font-13 text-center';
                p.textContent = 'Renew (HIGH CBD)';
            }



        });
    }

    const ViewEmpty = (container_products) => {
    container_products.innerHTML= `
            <div class=" d-flex justify-content-center align-content-center align-items-center">
                <p class="text-uppercase font-18 text-black ">Empty Result</p>
            </div>
            `;
};
    const update_icon_cart = () => {
        icon_cart_count.textContent = count;
        storage_local.setItem('count', count);
    };
    const mini_cart_render = (array_products) => {

        let template_item_mini_cart = '';


        if (storage_local.getItem('count')) {
            count = parseInt(storage_local.getItem('count'));
        }

        for (let product in items_products_storage_local) {

            console.log(product);

            let information_product = array_products.find(item => item.id === items_products_storage_local[product].product_id);
            console.log(information_product);

            template_item_mini_cart += `
            <a class="dropdown-item" href="javascript:;">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <h6 class="cart-product-title">${information_product.name}</h6>
                        <p class="cart-product-price">$${information_product.variants[0].priceRec}</p>
                    </div>
                    <div class="position-relative">
                        <div class="cart-product-cancel position-absolute">
                            <i class='bx bx-x'></i>
                        </div>
                        <div class="cart-product">
                            <img src="${information_product.image}" class="" alt="product image">
                        </div>
                    </div>
                </div>
            </a>
            `;

            mini_cart_items.innerHTML = template_item_mini_cart;
        }

        view_items_mini_cart.textContent= `${count} ITEMS`;

    };

    function ViewWeigthsSpecial(array_products, variant) {

    const container_select_weights = document.querySelectorAll('.select-weight');

    container_select_weights.forEach(items => {
        const get_id_product_weights = items.getAttribute('product_id');
        console.log('llego aqui', get_id_product_weights);
        let weights_product = array_products.products.find(item => item.id === get_id_product_weights);
        console.log(weights_product);
        let get_variant = weights_product.variants.find(option => option.option === variant)
        console.log(get_variant);

        if (get_variant.option === "3.5g") {

            const option_weigths = createElementHtml('option');
            option_weigths.value = get_variant.option;
            option_weigths.text = get_variant.option;
            appendElementHtml(items, option_weigths);
            // FormatWeigths("3.5g");


        } else if (get_variant.option === "28g") {

            const option_weigths = createElementHtml('option');
            option_weigths.value = get_variant.option;
            option_weigths.text = get_variant.option;
            appendElementHtml(items, option_weigths);
            // FormatWeigths("28g");

        } else if (get_variant.option === "1g") {

            const option_weigths = createElementHtml('option');
            option_weigths.value = get_variant.option;
            option_weigths.text = get_variant.option;
            appendElementHtml(items, option_weigths);
            // FormatWeigths("1g");

        } else if (get_variant.option === "7g") {

            const option_weigths = createElementHtml('option');
            option_weigths.value = get_variant.option;
            option_weigths.text = get_variant.option;
            appendElementHtml(items, option_weigths);
            // FormatWeigths("7g");

        } else if (get_variant.option === "14g") {

            const option_weigths = createElementHtml('option');
            option_weigths.value = get_variant.option;
            option_weigths.text = get_variant.option;
            appendElementHtml(items, option_weigths);
            // FormatWeigths("14g");

        }


    });
}

    function FormatWeigths(variant) {
    const format_weights = document.getElementById('.jceachformat');
    format_weights.forEach(items => {

        if (variant === "3.5g") {
            items.textContent = '/3.5g'

        } else if (variant === "28g") {
            items.textContent = '/28g'

        } else if (variant === "1g") {

            items.textContent = '/1g'

        } else if (variant === "7g") {

            items.textContent = '/7g'

        } else if (variant === "14g") {

            items.textContent = '/14g'

        }
    });
}




//  item de mini cart
// <a className="dropdown-item" href="javascript:;">
//     <div className="d-flex align-items-center">
//         <div className="flex-grow-1">
//             <h6 className="cart-product-title"></h6>
//             <p className="cart-product-price"></p>
//         </div>
//         <div className="position-relative">
//             <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i>
//             </div>
//             <div className="cart-product">
//                 <img src="" className="" alt="product image">
//             </div>
//         </div>
//     </div>
// </a>


  // <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype">${(item.brand_subtype) === null || undefined ? '' : item.brand_subtype}</p>







