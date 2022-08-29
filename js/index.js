import {
    addItemCart,
    createCheckout,
    filter_cbd,
    filter_strain_type_lineage,
    filter_thc,
    filter_weights,
    getAllProducts,
    getRetailersIds
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

            let data = await getAllProducts(store_centre_point_mall.id);
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
                ViewQuantityWeight();
            }

            if (radio_indica.checked && radio_indica.value === 'indica') {
                cartProduct(container_products, filter_indica.products);
                ViewQuantityWeight();
            }
            if (radio_sativa.checked && radio_sativa.value === 'sativa') {
                cartProduct(container_products, filter_sativa.products);
                ViewQuantityWeight();
            }
            if (radio_hybrid.checked && radio_hybrid.value === 'hybrid') {
                cartProduct(container_products, filter_hybrid.products);
                ViewQuantityWeight();
            }
            if (radio_high_cbd.checked && radio_high_cbd.value === 'high_cbd') {
                cartProduct(container_products, filter_high_cbd.products);
                ViewQuantityWeight();
            }
            if (radio_not_applicable.checked && radio_not_applicable.value === 'not_applicable') {
                cartProduct(container_products, filter_not_applicable.products);
                ViewQuantityWeight();
            }


            groupRadio.forEach( (radio) => {
                radio.addEventListener('change', () => {
                    if (radio.checked  && radio.value === 'all') {
                        cartProduct(container_products, data.products);
                        ViewQuantityWeight();
                    }
                    if (radio.value === 'indica' && radio.checked) {
                        cartProduct(container_products, filter_indica.products);
                        ViewQuantityWeight();
                    }
                    if (radio.value === 'sativa' && radio.checked){
                        cartProduct(container_products, filter_sativa.products);
                        ViewQuantityWeight();
                    }
                    if (radio.value === 'hybrid' && radio.checked) {
                        cartProduct(container_products, filter_hybrid.products);
                        ViewQuantityWeight();
                    }
                    if (radio.value === 'high_cbd' && radio.checked) {
                        console.log('entro a high_cbd');
                        cartProduct(container_products, filter_high_cbd.products);
                        ViewQuantityWeight();
                    }
                    if (radio.value === 'not_applicable' && radio.checked) {
                        console.log('entro a not applicable');
                        cartProduct(container_products, filter_not_applicable.products);
                        ViewQuantityWeight();
                    }
                })
            });

            groupWeigths.forEach(weights => {
                weights.addEventListener('change', () => {
                    if (weights.checked  && weights.value === 'all') {
                        cartProduct(container_products, data.products);
                        ViewQuantityWeight();
                    }
                    if (weights.value === '3.5G' && weights.checked) {
                        cartProduct(container_products, filter_35G.products);
                        ViewQuantityWeight();
                    }
                    if (weights.value === '28G' && weights.checked) {
                        cartProduct(container_products, filter_28G.products);
                        ViewQuantityWeight();
                    }

                    if (weights.value === '1G' && weights.checked) {
                        cartProduct(container_products, filter_1G.products);
                        ViewQuantityWeight();
                    }
                    if (weights.value === '7G' && weights.checked) {
                        cartProduct(container_products, filter_7G.products);
                        ViewQuantityWeight();
                    }
                    if (weights.value === '14G' && weights.checked) {
                        cartProduct(container_products, filter_14G.products);
                        ViewQuantityWeight();
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
                    ViewQuantityWeight();
                });

                btn_cbd.addEventListener('click', async () => {
                    let data_cbd = slider_cbd.noUiSlider.get();

                    const filt_cbd = await filter_cbd(store_centre_point_mall.id, data_cbd[0], data_cbd[1]);

                    cartProduct(container_products, filt_cbd.products);
                    ViewQuantityWeight();
                });

                btn_reset_thc.addEventListener('click', () => {
                    slider_thc.noUiSlider.reset();
                    cartProduct(container_products, data.products);
                    ViewQuantityWeight();
                });

                btn_reset_cbd.addEventListener('click', () => {
                    slider_cbd.noUiSlider.reset();
                    cartProduct(container_products, data.products);
                    ViewQuantityWeight();
                });


                const btn_add_cart_grid = document.querySelectorAll('#add_to_cart_btn');
                const checkout_id = JSON.parse(storage_local.getItem('cart_centre_point_mall'));

                btn_add_cart_grid.forEach( btn => {
                    btn.addEventListener('click', () => {
                        let product_id = btn.getAttribute('id_product');
                        let quantity = 1;
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

                // const container_select_quantitys = document.querySelectorAll('#quantity');
                //
                // container_select_quantitys.forEach(items => {
                //     const get_quantity = items.getAttribute('count_quantity');
                //
                //     for (let quantity_select = 1; quantity_select <= get_quantity; quantity_select++) {
                //         const options_quantity_select = createElementHtml('option');
                //         options_quantity_select.value = quantity_select;
                //         options_quantity_select.text = quantity_select;
                //         items.appendChild(options_quantity_select);
                //         appendElementHtml(items, options_quantity_select)
                //     }
                //
                // });
                ViewQuantityWeight();


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


    // const renderProductAll = (container_products, array_products) => {
    //     container_products.innerHTML = `
    //
    //         ${ array_products.map( product =>  `
    //
    //          <div class="col">
    //             <div class="card rounded-0 product-card">
    //                     <a href="/views/product-details.html?id=${product.id}" id="container_carrousel_imgs">
    //                         <img src="${product.image !== null ? product.image : '../assets/images/errors-images/image-not-found.jpeg'}" class="card-img-top" alt="${product.name}" id="imagen-product">
    //                     </a>
    //                 <div class="card-body">
    //                     <div class="product-info">
    //                         <a href="product-details.html?id=${product.id}">
    //                             <p class="product-catergory font-13 mb-1 itembrand">${product.brand.name}</p>
    //                             <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype"></p>
    //                         </a>
    //                         <a href="product-details.html?objectID=${product.id}">
    //                             <h6 class="product-name mb-2 itemname">${product.name}</h6>
    //                         </a>
    //                         <div class="d-flex align-items-center">
    //                             <div class="mb-1 product-price itemprice jcitemprice">
    //                                 <span class="fs-5 currencyformat jcpriceformat">CAD </span>
    //                                 <span class="fs-5 jcpricingnw">$ ${product.variants[0].priceRec}</span>
    //                                 <span class="er-each jceachformat" style="align-items: flex-end;">/${product.variants[0].option}</span>
    //                             </div>
    //                         </div>
    //                         <div class="d-flex align-content-center align-items-center justify-content-center mt-1">
    //                             <div class="me-4" id="container_quantity">
    //                                 <label class="form-label">Quantity</label>
    //                                 <select class="form-select form-select-sm" id="quantity" count_quantity="${product.variants[0].quantity}"></select>
    //                             </div>
    //                             <div class="" id="container_weight">
    //                                 <label class="form-label">weight</label>
    //                                 <select class="form-select form-select-sm" id="select-weight" id_product="${product.id}"></select>
    //                             </div>
    //                         </div>
    //                         <div class="product-action mt-2" id="content">
    //                            <div class="d-grid gap-2">
    //                                 <a class="btn btn-dark btn-ecomm" id="add_to_cart_btn" id_product="${product.id}" option_product="${product.variants[0].option}"><i class="bx bxs-cart-add"></i>add to cart</a>
    //                                 <a href="/views/product-details.html?id=${product.id}" class="btn btn-light btn-ecomm">Product Details</a>
    //                            </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //          </div>
    //
    //         `).join('')}
    //
    //     `;
    // };

    // const createProductFilter = (container_products, array_products) => {
    //     container_products.innerHTML = `
    //         ${array_products.map( product =>  `
    //
    //          <div class="col">
    //             <div class="card rounded-0 product-card">
    //                     <a href="/views/product-details.html?id=${product.id}" id="container_carrousel_imgs">
    //                         <img src="${product.image !== null ? product.image : '../assets/images/errors-images/image-not-found.jpeg'}" class="card-img-top" alt="${product.name}" id="imagen-product">
    //                     </a>
    //                 <div class="card-body">
    //                     <div class="product-info">
    //                         <a href="product-details.html?id=${product.id}">
    //                             <p class="product-catergory font-13 mb-1 itembrand">${product.brand.name}</p>
    //                             <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype"></p>
    //                         </a>
    //                         <a href="product-details.html?objectID=${product.id}">
    //                             <h6 class="product-name mb-2 itemname">${product.name}</h6>
    //                         </a>
    //                         <div class="d-flex align-items-center">
    //                             <div class="mb-1 product-price itemprice jcitemprice">
    //                                 <span class="fs-5 currencyformat jcpriceformat">CAD </span>
    //                                 <span class="fs-5 jcpricingnw">$ ${product.variants[0].priceRec}</span>
    //                                 <span class="er-each jceachformat" style="align-items: flex-end;">/${product.variants[0].option}</span>
    //                             </div>
    //                         </div>
    //                         <div class="d-flex align-content-center align-items-center justify-content-center mt-1">
    //                             <div class="me-4" id="container_quantity">
    //                                 <label class="form-label">Quantity</label>
    //                                 <select class="form-select form-select-sm" id="quantity" count_quantity="${product.variants[0].quantity}"></select>
    //                             </div>
    //                             <div class="" id="container_weight">
    //                                 <label class="form-label">weight</label>
    //                                 <select class="form-select form-select-sm" id="select-weight" id_product="${product.id}"></select>
    //                             </div>
    //                         </div>
    //                         <div class="product-action mb-3" id="content">
    //                            <div class="d-grid gap-2">
    //                                 <a class="btn btn-dark btn-ecomm" id="add_to_cart_btn" ><i class="bx bxs-cart-add"></i>add to cart</a>
    //                                 <a href="/views/product-details.html?id=${product.id}" class="btn btn-light btn-ecomm">Product Details</a>
    //                            </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //          </div>
    //
    //         `).join('')}
    //
    //     `;
    // };

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
                            <a href="product-details.html?id=${product.id}">
                                <p class="product-catergory font-13 mb-1 itembrand">${product.brand.name}</p>
                                <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype"></p>
                            </a>
                            <a href="product-details.html?objectID=${product.id}">
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
                                    <select class="form-select form-select-sm" id="select-weight" product_variants="${JSON.stringify(product.variants)}"></select>
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

    function ViewQuantityWeight () {
        const container_select_quantitys = document.querySelectorAll('#quantity');
        const container_select_weights = document.querySelectorAll('#select-weight');

        container_select_quantitys.forEach(items => {
            const get_quantity = items.getAttribute('count_quantity');

            for (let quantity_select = 1; quantity_select <= get_quantity; quantity_select++) {
                const options_quantity_select = createElementHtml('option');
                options_quantity_select.value = quantity_select;
                options_quantity_select.text = quantity_select;
                appendElementHtml(items, options_quantity_select)
            }

        });
        container_select_weights.forEach(items => {
            const get_weights = JSON.stringify(items.getAttribute('product_variants'));
            console.log(get_weights);
        });

    }



  // <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype">${(item.brand_subtype) === null || undefined ? '' : item.brand_subtype}</p>







