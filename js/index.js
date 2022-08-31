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
import {FadeOut} from '../utils/utils.js'
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
const btn_shop_cart_link = document.querySelector('.cart-link');
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
let page_next = 0;
//fin de variables


window.addEventListener('DOMContentLoaded', async () => {

        await getRetailersIds().then( async result => {

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
                btn_shop_cart_link.setAttribute('href', result.redirectUrl);
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


            let countProducts = get_count_product(store_centre_point_mall.id);
            countProducts.then(response => {console.log(response);} ).catch(error => console.log('Error en el count ', error.message));
            let data = await getAllProducts(store_centre_point_mall.id, 0, 50);
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
                ViewQuantity();
                ViewWeigths(data);
            }

            if (radio_indica.checked && radio_indica.value === 'indica') {
                cartProduct(container_products, filter_indica.products);
                ViewQuantity();
                ViewWeigths(filter_indica);
            }
            if (radio_sativa.checked && radio_sativa.value === 'sativa') {
                cartProduct(container_products, filter_sativa.products);
                ViewQuantity();
                ViewWeigths(filter_sativa);
            }
            if (radio_hybrid.checked && radio_hybrid.value === 'hybrid') {
                cartProduct(container_products, filter_hybrid.products);
                ViewQuantity();
                ViewWeigths(filter_hybrid.products);
            }
            if (radio_high_cbd.checked && radio_high_cbd.value === 'high_cbd') {
                cartProduct(container_products, filter_high_cbd.products);
                ViewQuantity();
                ViewWeigths(filter_high_cbd);
            }
            if (radio_not_applicable.checked && radio_not_applicable.value === 'not_applicable') {
                cartProduct(container_products, filter_not_applicable.products);
                ViewQuantity();
                ViewWeigths(filter_not_applicable);
            }


            groupRadio.forEach( (radio) => {
                radio.addEventListener('change', () => {
                    if (radio.checked  && radio.value === 'all') {
                        cartProduct(container_products, data.products);
                        ViewQuantity();
                        ViewWeigths(data);
                    }
                    if (radio.value === 'indica' && radio.checked) {
                        cartProduct(container_products, filter_indica.products);
                        ViewQuantity();
                        ViewWeigths(filter_indica);
                    }
                    if (radio.value === 'sativa' && radio.checked){
                        cartProduct(container_products, filter_sativa.products);
                        ViewQuantity();
                        ViewWeigths(filter_sativa);
                    }
                    if (radio.value === 'hybrid' && radio.checked) {
                        cartProduct(container_products, filter_hybrid.products);
                        ViewQuantity();
                        ViewWeigths(filter_hybrid);
                    }
                    if (radio.value === 'high_cbd' && radio.checked) {
                        console.log('entro a high_cbd');
                        cartProduct(container_products, filter_high_cbd.products);
                        ViewQuantity();
                        ViewWeigths(filter_high_cbd);
                    }
                    if (radio.value === 'not_applicable' && radio.checked) {
                        console.log('entro a not applicable');
                        cartProduct(container_products, filter_not_applicable.products);
                        ViewQuantity();
                        ViewWeigths(filter_not_applicable);
                    }
                })
            });

            groupWeigths.forEach(weights => {
                weights.addEventListener('change', () => {
                    if (weights.checked  && weights.value === 'all') {
                        cartProduct(container_products, data.products);
                        ViewQuantity();
                        ViewWeigths(data);
                    }
                    if (weights.value === '3.5G' && weights.checked) {
                        cartProduct(container_products, filter_35G.products);
                        ViewQuantity();
                        // ViewWeigths(filter_35G);
                        ViewWeigthsSpecial(filter_35G, "3.5g");
                    }
                    if (weights.value === '28G' && weights.checked) {
                        cartProduct(container_products, filter_28G.products);
                        ViewQuantity();
                        // ViewWeigths(filter_28G);
                        ViewWeigthsSpecial(filter_28G, "28g");
                    }

                    if (weights.value === '1G' && weights.checked) {
                        cartProduct(container_products, filter_1G.products);
                        ViewQuantity();
                        // ViewWeigths(filter_1G);
                        ViewWeigthsSpecial(filter_1G, "1g");
                    }
                    if (weights.value === '7G' && weights.checked) {
                        cartProduct(container_products, filter_7G.products);
                        ViewQuantity();
                        // ViewWeigths(filter_7G);
                        ViewWeigthsSpecial(filter_7G, "7g");
                    }
                    if (weights.value === '14G' && weights.checked) {
                        cartProduct(container_products, filter_14G.products);
                        ViewQuantity();
                        // ViewWeigths(filter_14G);
                        ViewWeigthsSpecial(filter_14G, "14g");
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
                    ViewQuantity();
                    ViewWeigths(filt_thc);
                });

                btn_cbd.addEventListener('click', async () => {
                    let data_cbd = slider_cbd.noUiSlider.get();

                    const filt_cbd = await filter_cbd(store_centre_point_mall.id, data_cbd[0], data_cbd[1]);

                    cartProduct(container_products, filt_cbd.products);
                    ViewQuantity();
                    ViewWeigths(filt_cbd);
                });

                btn_reset_thc.addEventListener('click', () => {
                    slider_thc.noUiSlider.reset();
                    cartProduct(container_products, data.products);
                    ViewQuantity();
                    ViewWeigths(data);
                });

                btn_reset_cbd.addEventListener('click', () => {
                    slider_cbd.noUiSlider.reset();
                    cartProduct(container_products, data.products);
                    ViewQuantity();
                    ViewWeigths(data);
                });

                // search filter
                render_search_products(store_centre_point_mall.id, 'searchBox');
                // const filter_search = document.getElementById('searchBox');
                // const div_container_search = createElementHtml('div');
                // div_container_search.className='input-group mb-3';
                // const input_type_text_search = createElementHtml('input');
                // input_type_text_search.type='text';
                // input_type_text_search.className='form-control';
                // input_type_text_search.placeholder='Search for products';
                // input_type_text_search.id='search_product';
                // const button_search = createElementHtml('button');
                // button_search.type='button';
                // button_search.className='btn btn-outline-dark';
                // button_search.id='btn_search_product';
                // const icon_search = createElementHtml('i');
                // icon_search.className='bx bx-search-alt-2 bx-rotate-90';
                //
                // appendElementHtml(div_container_search, input_type_text_search);
                // appendElementHtml(div_container_search, button_search);
                // appendElementHtml(button_search, icon_search);
                // appendElementHtml(filter_search, div_container_search);

                //<i class='bx bx-search-alt-2 bx-rotate-90' ></i>



                const btn_add_cart_grid = document.querySelectorAll('#add_to_cart_btn');
                const checkout_id = JSON.parse(storage_local.getItem('cart_centre_point_mall'));

                btn_add_cart_grid.forEach( btn => {
                    btn.addEventListener('click', () => {


                        let product_id = btn.getAttribute('id_product');
                        let quantity = parseInt(document.getElementById('quantity').value);
                        let option = btn.getAttribute('option_product');
                        addItemCart(store_centre_point_mall.id, checkout_id.id, product_id, quantity, option).then( result => {
                            console.log(result);

                            const results = result.data.addItem.items;

                            let card_view_product = results.find(item => item.productId === product_id);

                            Swal.fire({
                            title: 'Added to cart!',
                            text: `${card_view_product.product.name}`,
                            imageUrl: `${card_view_product.product.image}`,
                            imageWidth: 250,
                            imageHeight: 300,
                            imageAlt: `${card_view_product.product.name}`,
                            });
                        });
                    });
                });


        }).catch(error => {
            console.log('Error query', error.message);
            ViewEmpty(container_products);
        })

        // setTimeout(async () => {
        //
        //     await GetAllRetailerIds();
        //     const store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario _Centrepoint_Mall'));
        //
        //     console.log(store_centre_point_mall);
        //
        //     let data = await getAllProducts(store_centre_point_mall.id);
        //     let filter_indica = await filter_strain_type_lineage(store_centre_point_mall.id, 'indica');
        //     let filter_sativa = await filter_strain_type_lineage(store_centre_point_mall.id, 'sativa');
        //     let filter_hybrid = await filter_strain_type_lineage(store_centre_point_mall.id, 'hybrid');
        //     let filter_high_cbd = await filter_strain_type_lineage(store_centre_point_mall.id, 'high_cbd');
        //     let filter_not_applicable = await filter_strain_type_lineage(store_centre_point_mall.id, 'not_applicable');
        //
        //     let filter_35G = await filter_weights(store_centre_point_mall.id, 3.5);
        //     let filter_28G = await filter_weights(store_centre_point_mall.id, 28);
        //     let filter_1G = await filter_weights(store_centre_point_mall.id, 1);
        //     let filter_7G = await filter_weights(store_centre_point_mall.id, 7);
        //     let filter_14G = await filter_weights(store_centre_point_mall.id, 14);
        //
        //     setTimeout(()=> {
        //         if (radio_all.checked && radio_all.value === 'all'){
        //             renderProductAll(container_products, data.products);
        //         }
        //
        //         if (radio_indica.checked && radio_indica.value === 'indica') {
        //             renderProductAll(container_products, filter_indica.products);
        //         }
        //         if (radio_sativa.checked && radio_sativa.value === 'sativa') {
        //             renderProductAll(container_products, filter_sativa.products);
        //         }
        //         if (radio_hybrid.checked && radio_hybrid.value === 'hybrid') {
        //             renderProductAll(container_products, filter_hybrid.products);
        //         }
        //         if (radio_high_cbd.checked && radio_high_cbd.value === 'high_cbd') {
        //             renderProductAll(container_products, filter_high_cbd.products);
        //         }
        //         if (radio_not_applicable.checked && radio_not_applicable.value === 'not_applicable') {
        //             renderProductAll(container_products, filter_not_applicable.products);
        //         }
        //     }, 100);
        //
        //
        //     groupRadio.forEach( (radio) => {
        //         radio.addEventListener('change', () => {
        //             if (radio.checked  && radio.value === 'all') {
        //                 renderProductAll(container_products, data.products);
        //             }
        //             if (radio.value === 'indica' && radio.checked) {
        //                 createProductFilter(container_products, filter_indica.products);
        //             }
        //             if (radio.value === 'sativa' && radio.checked){
        //                 createProductFilter(container_products, filter_sativa.products);
        //             }
        //             if (radio.value === 'hybrid' && radio.checked) {
        //                 createProductFilter(container_products, filter_hybrid.products);
        //             }
        //             if (radio.value === 'high_cbd' && radio.checked) {
        //                 console.log('entro a high_cbd');
        //                 createProductFilter(container_products, filter_high_cbd.products);
        //             }
        //             if (radio.value === 'not_applicable' && radio.checked) {
        //                 console.log('entro a not applicable');
        //                 createProductFilter(container_products, filter_not_applicable.products);
        //             }
        //         })
        //     });
        //
        //     groupWeigths.forEach(weights => {
        //         weights.addEventListener('change', () => {
        //             if (weights.checked  && weights.value === 'all') {
        //                 renderProductAll(container_products, data.products);
        //             }
        //             if (weights.value === '3.5G' && weights.checked) {
        //                 console.log(filter_35G);
        //                 createProductFilter(container_products, filter_35G.products);
        //             }
        //             if (weights.value === '28G' && weights.checked) {
        //                 createProductFilter(container_products, filter_28G.products);
        //             }
        //
        //             if (weights.value === '1G' && weights.checked) {
        //                 createProductFilter(container_products, filter_1G.products);
        //             }
        //             if (weights.value === '7G' && weights.checked) {
        //                 createProductFilter(container_products, filter_7G.products);
        //             }
        //             if (weights.value === '14G' && weights.checked) {
        //                 createProductFilter(container_products, filter_14G.products);
        //             }
        //
        //         });
        //     });
        //
        //     let slider_thc = document.querySelector('#slider_thc');
        //     let thc = document.querySelector('#title_slider_thc');
        //     let btn_thc = document.querySelector('#btn-filter-thc');
        //     let btn_reset_thc = document.querySelector('#btn-reset-filter-thc');
        //
        //     let slider_cbd = document.querySelector('#slider_cbd');
        //     let cbd = document.querySelector('#title_slider_cbd');
        //     let btn_cbd = document.querySelector('#btn-filter-cbd');
        //     let btn_reset_cbd = document.querySelector('#btn-reset-filter-cbd');
        //
        //     noUiSlider.create(slider_thc, {
        //         start: [0, 36],
        //         behaviour: 'snap',
        //         step: 1,
        //         connect: true,
        //         format: wNumb({
        //           decimals: 0
        //         }),
        //         range: {
        //             min: 0,
        //             max: 36
        //         }
        //     });
        //
        //     noUiSlider.create(slider_cbd, {
        //         start: [0, 16],
        //         behaviour: 'snap',
        //         step: 1,
        //         connect: true,
        //         format: wNumb({
        //             decimals: 0
        //         }),
        //         range: {
        //             min: 0,
        //             max: 16
        //         }
        //     });
        //
        //
        //     slider_thc.noUiSlider.on('update', function (values) {
        //         thc.innerHTML = `${values.join(' % - ')} %`;
        //     });
        //
        //     slider_cbd.noUiSlider.on('update', function (values) {
        //         cbd.innerHTML = `${values.join(' % - ')} %`;
        //     });
        //
        //     btn_thc.addEventListener('click', async () => {
        //         const store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centrepoint_Mall'));
        //         let data_thc = slider_thc.noUiSlider.get();
        //         console.log('position 0', data_thc[0], 'position 1', data_thc[1]);
        //
        //         const filt_thc = await filter_thc(store_centre_point_mall.id, data_thc[0], data_thc[1]);
        //         console.log(filt_thc.products);
        //
        //         createProductFilter(container_products, filt_thc.products);
        //
        //     });
        //
        //     btn_cbd.addEventListener('click', async () => {
        //         const store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centrepoint_Mall'));
        //         let data_cbd = slider_cbd.noUiSlider.get();
        //         console.log('position 0', data_cbd[0], 'position 1', data_cbd[1]);
        //
        //         const filt_cbd = await filter_cbd(store_centre_point_mall.id, data_cbd[0], data_cbd[1]);
        //         console.log(filt_cbd.products);
        //
        //         createProductFilter(container_products, filt_cbd.products);
        //     });
        //
        //     btn_reset_thc.addEventListener('click', () => {
        //         slider_thc.noUiSlider.reset();
        //         renderProductAll(container_products, data.products);
        //     });
        //
        //     btn_reset_cbd.addEventListener('click', () => {
        //         slider_cbd.noUiSlider.reset();
        //         renderProductAll(container_products, data.products);
        //     });
        // }, 400);

});

    const ViewEmpty = (container_products) => {
        container_products.innerHTML= `
            <div class=" d-flex justify-content-center align-content-center align-items-center">
                <p class="text-uppercase font-18 text-black ">Empty Result</p>
            </div>
            `;
    };

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
                            <a href="/views/product-details.html?id=${product.id}">
                                <p class="product-catergory font-13 mb-1 itembrand">${product.brand.name}</p>
                                <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype"></p>
                            </a>
                            <a href="/views/product-details.html?id=${product.id}">
                                <h6 class="product-name mb-2 itemname">${product.name}</h6>
                            </a>
                            <div class="d-flex align-items-center">
                                <div class="mb-1 product-price itemprice jcitemprice">
                                    <span class="fs-5 currencyformat jcpriceformat">CAD </span>
                                    <span class="fs-5 jcpricingnw">$ ${product.variants[0].priceRec}</span>
                                    <span class="er-each jceachformat" style="align-items: flex-end;">/${product.variants[0].option}</span>
                                </div>
                            </div>
                            <div class="d-flex align-content-center align-items-center justify-content-center mt-1">
                                <div class="me-4" id="container_quantity">
                                    <label class="form-label">Quantity</label>
                                    <select class="form-select form-select-sm" id="quantity" count_quantity="${product.variants[0].quantity}"></select>
                                </div>
                                <div class="" id="container_weight">
                                    <label class="form-label">weight</label>
                                    <select class="form-select form-select-sm" id="select-weight" product_id="${product.id}"></select>
                                </div>
                            </div>
                            <div class="product-action mt-2" id="content">
                               <div class="d-grid gap-2">
                                    <a class="btn btn-dark btn-ecomm" id="add_to_cart_btn" id_product="${product.id}" option_product="${product.variants[0].option}"><i class="bx bxs-cart-add"></i>add to cart</a>
                                    <a href="/views/product-details.html?id=${product.id}" class="btn btn-light btn-ecomm">Product Details</a>
                               </div> 
                            </div> 
                        </div>
                    </div>
                </div>
             </div>  
            
            `
        ).join('')}`;
    };

    function ViewQuantity () {
        const container_select_quantitys = document.querySelectorAll('#quantity');

        container_select_quantitys.forEach(items => {
            const get_quantity = items.getAttribute('count_quantity');

            for (let quantity_select = 1; quantity_select <= get_quantity; quantity_select++) {
                const options_quantity_select = createElementHtml('option');
                options_quantity_select.value = quantity_select;
                options_quantity_select.text = quantity_select;
                appendElementHtml(items, options_quantity_select)
            }

        });


    }

    function ViewWeigths (array_products) {
        const container_select_weights = document.querySelectorAll('#select-weight');

        container_select_weights.forEach(items => {
            const get_id_product_weights = items.getAttribute('product_id');
            console.log(get_id_product_weights);

            let weights_product = array_products.products.find(item => item.id === get_id_product_weights);
            console.log(weights_product);
            for (let i of weights_product.variants){
                console.log(i);
                const option_weigths = createElementHtml('option');
                option_weigths.value = i.option;
                option_weigths.text = i.option;
                appendElementHtml(items, option_weigths);
            }
        });
    }

    function ViewWeigthsSpecial (array_products, variant) {

        const container_select_weights = document.querySelectorAll('#select-weight');

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
                FormatWeigths("3.5g");


            }else if (get_variant.option === "28g") {

                const option_weigths = createElementHtml('option');
                option_weigths.value = get_variant.option;
                option_weigths.text = get_variant.option;
                appendElementHtml(items, option_weigths);
                FormatWeigths("28g");

            }else if (get_variant.option === "1g") {

                const option_weigths = createElementHtml('option');
                option_weigths.value = get_variant.option;
                option_weigths.text = get_variant.option;
                appendElementHtml(items, option_weigths);
                FormatWeigths("1g");

            }else if (get_variant.option === "7g") {

                const option_weigths = createElementHtml('option');
                option_weigths.value = get_variant.option;
                option_weigths.text = get_variant.option;
                appendElementHtml(items, option_weigths);
                FormatWeigths("7g");

            }else if (get_variant.option === "14g") {

                const option_weigths = createElementHtml('option');
                option_weigths.value = get_variant.option;
                option_weigths.text = get_variant.option;
                appendElementHtml(items, option_weigths);
                FormatWeigths("14g");

            }


        });
    }

    function FormatWeigths (variant) {
        const format_weights = document.querySelectorAll('.jceachformat');
        format_weights.forEach(items => {

            if (variant === "3.5g") {
                items.textContent='/3.5g'

            }else if (variant === "28g") {
                items.textContent='/28g'

            }else if (variant === "1g") {

                items.textContent='/1g'

            }else if (variant === "7g") {

                items.textContent='/7g'

            }else if (variant === "14g") {

                items.textContent='/14g'

            }
        });
    }

    const render_search_products = (retailerId, id_container_search) => {
        let search = '';
        const filter_search = document.getElementById(`${id_container_search}`);

        search += `
           <div class="input-group mb-3 ms-1 me-1">
              <input type="text" class="form-control" placeholder="Search for products" id="input_search_text">
              <button class="btn btn-outline-dark" type="button" id="button_search_products"><i class='bx bx-search-alt-2 bx-rotate-90' ></i></button>
           </div>
        `;

        filter_search.innerHTML= search;

        const btn_search = document.getElementById('button_search_products');
        btn_search.addEventListener('click', () => {
            let get_text_input_search = document.getElementById('input_search_text').value;

            if (get_text_input_search === "") {
                console.log('El input esta vacio')
            }

            const result = filter_search_product(retailerId, get_text_input_search.toString(), 0, 50);

            result.then( response => {
                console.log(response);
            }).catch(error => console.log('error en el search', error.message));

        });


    }



  // <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype">${(item.brand_subtype) === null || undefined ? '' : item.brand_subtype}</p>







