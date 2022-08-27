import {getRetailersIds, filter_weights, filter_thc, filter_cbd, getAllProducts, GetAllRetailerIds} from '../utils/querys.js';
const container_products = document.querySelector('#container-products');
const groupRadio = document.getElementsByName('filter_lineage');
const groupWeigths = document.getElementsByName('filter_weights');
let radio_all = document.querySelector('#filter_all_lineage');
let radio_indica = document.querySelector('#filter_indica');
let radio_sativa = document.querySelector('#filter_sativa');
let radio_hybrid = document.querySelector('#filter_hybrid');
let radio_high_cbd = document.querySelector('#filter_high_cbd');
let radio_not_applicable = document.querySelector('#filter_not_applicable');

const storage_local = window.localStorage;


window.addEventListener('DOMContentLoaded', async () => {
        const result = await getRetailersIds();

        console.table(result.data.retailers);




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


    // const createProductsAll = Array_products => {
    //         Array_products.map(product => {
    //
    //         //div que encierra toda la card
    //         let div_col = createElementHtml('div');
    //         div_col.className= 'col product-item';
    //         //segundo div de la card
    //         let div_product_card = createElementHtml('div');
    //         div_product_card.className='card rounded-0 product-card';
    //         //tercer div card_body
    //         let div_card_body = createElementHtml('div');
    //         div_card_body.className='card-body';
    //
    //         let div_product_info = createElementHtml('div');
    //         div_product_info.className='product-info';
    //
    //         let container_image = createElementHtml('a');
    //         container_image.href=`/views/product-details.html?id=${product.id}`;
    //
    //         let image = createElementHtml('img');
    //         image.className='card-img-top';
    //         image.id='imagen-product';
    //         image.src=`${product.image !== null ? product.image : '../assets/images/errors-images/image-not-found.jpeg'}`;
    //         image.alt=`${product.name}`;
    //
    //         let link_a_item_brand = createElementHtml('a');
    //         link_a_item_brand.href=`/views/product-details.html?id=${product.id}`;
    //
    //         let etiqueta_p_item_brand = createElementHtml('p');
    //         etiqueta_p_item_brand.className='product-catergory font-13 mb-1 itembrand';
    //
    //         let etiqueta_p_item_brand_sub_type = createElementHtml('p');
    //         etiqueta_p_item_brand_sub_type.className='product-catergory font-13 mb-1 itemsubtype';
    //         etiqueta_p_item_brand_sub_type.id='itemsubtype';
    //
    //         let etiqueta_a_link_item_name = createElementHtml('a');
    //         etiqueta_a_link_item_name.href=`/views/product-details.html?id=${product.id}`;
    //
    //         let etiqueta_h6_item_name = createElementHtml('h6');
    //         etiqueta_h6_item_name.className='product-name mb-2 itemname';
    //         etiqueta_h6_item_name.textContent=`${product.name}`;
    //
    //         let div_container_info_price = createElementHtml('div');
    //         div_container_info_price.className='d-flex align-items-center';
    //
    //         let div_container_span = createElementHtml('div');
    //         div_container_span.className='mb-1 product-price itemprice jcitemprice';
    //
    //         let span_text_cad = createElementHtml('span');
    //         span_text_cad.className='fs-5 currencyformat jcpriceformat';
    //         span_text_cad.textContent='CAD ';
    //
    //         let span_text_price = createElementHtml('span');
    //         span_text_price.className='fs-5 jcpricingnw';
    //         span_text_price.textContent=`${product.variants[0].priceMed}`;
    //
    //         let span_text_weights = createElementHtml('span');
    //         span_text_weights.className='er-each jceachformat';
    //         span_text_weights.textContent=`/${product.variants[0].option}`;
    //
    //         let div_content_action = createElementHtml('div');
    //         div_content_action.className='product-action mt-2';
    //         div_content_action.id='content';
    //
    //         let div_content_etiqueta_a = createElementHtml('div');
    //         div_content_etiqueta_a.className='d-grid gap-2';
    //
    //         let add_to_cart = createElementHtml('a');
    //         add_to_cart.className='btn btn-dark btn-ecomm';
    //         add_to_cart.id='add_to_cart_btn';
    //         add_to_cart.textContent='add to cart';
    //
    //         let icon_add_to_cart = createElementHtml('i');
    //         icon_add_to_cart.className='bx bxs-cart-add';
    //
    //         let btn_product_details = createElementHtml('a');
    //         btn_product_details.className='btn btn-light btn-ecomm';
    //         btn_product_details.href=`/views/product-details.html?id=${product.id}`;
    //         btn_product_details.textContent='Product Details';
    //
    //
    //         appendElementHtml(div_col, div_product_card);
    //         appendElementHtml(div_product_card, container_image);
    //         appendElementHtml(container_image, image);
    //         appendElementHtml(div_product_card, div_card_body);
    //         appendElementHtml(div_card_body, div_product_info);
    //         // div product info iran todos los demas elementos que se encuentran dentro de el div product info
    //         // a exepcion de el container de la imagen ese va fuera de el div product info
    //         appendElementHtml(div_product_info, link_a_item_brand);
    //         appendElementHtml(link_a_item_brand, etiqueta_p_item_brand);
    //         appendElementHtml(link_a_item_brand, etiqueta_p_item_brand_sub_type);
    //         appendElementHtml(div_product_info, etiqueta_a_link_item_name);
    //         appendElementHtml(etiqueta_a_link_item_name, etiqueta_h6_item_name);
    //         appendElementHtml(div_product_info, div_container_info_price);
    //         appendElementHtml(div_container_info_price, div_container_span);
    //         appendElementHtml(div_container_span, span_text_cad);
    //         appendElementHtml(div_container_span, span_text_price);
    //         appendElementHtml(div_container_span, span_text_weights);
    //         appendElementHtml(div_product_info, div_content_action);
    //         appendElementHtml(div_content_action, div_content_etiqueta_a);
    //         appendElementHtml(div_content_etiqueta_a, add_to_cart);
    //         appendElementHtml(add_to_cart, icon_add_to_cart);
    //         appendElementHtml(div_content_etiqueta_a, btn_product_details);
    //         //container principal que almacena a TODO el card
    //
    //     }).join(' ');
    //
    //
    // }

    const renderProductAll = (container_products, array_products) => {
        container_products.innerHTML = `
        
            ${ array_products.map( product =>  `
            
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
                            <div class="product-action mt-2" id="content">
                               <div class="d-grid gap-2">
                                    <a class="btn btn-dark btn-ecomm" id="add_to_cart_btn" ><i class="bx bxs-cart-add"></i>add to cart</a>
                                    <a href="/views/product-details.html?id=${product.id}" class="btn btn-light btn-ecomm">Product Details</a>
                               </div> 
                            </div> 
                        </div>
                    </div>
                </div>
             </div>  
            
            `).join('')}
        
        `;
    };


    const createProductFilter = (container_products, array_products) => {
        container_products.innerHTML = `
            ${array_products.map( product =>  `
            
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
                            <div class="product-action mt-2" id="content">
                               <div class="d-grid gap-2">
                                    <a class="btn btn-dark btn-ecomm" id="add_to_cart_btn" ><i class="bx bxs-cart-add"></i>add to cart</a>
                                    <a href="/views/product-details.html?id=${product.id}" class="btn btn-light btn-ecomm">Product Details</a>
                               </div> 
                            </div> 
                        </div>
                    </div>
                </div>
             </div>  
            
            `).join('')}
        
        `;
    };




  // <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype">${(item.brand_subtype) === null || undefined ? '' : item.brand_subtype}</p>







