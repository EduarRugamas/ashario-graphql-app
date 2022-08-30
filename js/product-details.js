'use strict';
import {getProduct} from '../utils/querys.js';
import {appendElementHtml, createElementHtml} from "../utils/elements_html.js";
const urlParams = new URLSearchParams(window.location.search);
const storage_local = window.localStorage;
const id_store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centre_point_Mall'));
const id_product = urlParams.get('id');
const container_product_details = document.getElementById('product-details');
const title_product = document.getElementById('title_name_product_details');
const btn_cart_link = document.querySelector('#btn_cart');

// GetProduct(id_store_centre_point_mall.id, id_product).then( item => {
//
//     console.log(item);
//
//     title_product.textContent=`${item.name}`
//
//     let section_container_second = createElementHtml('section');
//     section_container_second.className='py-4';
//
//     let div_container_section_second = createElementHtml('div');
//     div_container_section_second.className='container';
//
//     let div_product_details_card = createElementHtml('div');
//     div_product_details_card.className='product-detail-card';
//     let div_product_details_body = createElementHtml('div');
//     div_product_details_body.className='product-detail-body';
//     let div_content_row = createElementHtml('div');
//     div_content_row.className='row g-0';
//     let div_content_col_1 = createElementHtml('div');
//     div_content_col_1.className='col-12 col-lg-5';
//     let div_content_col_2 = createElementHtml('div');
//     div_content_col_2.className='col-12 col-lg-7';
//
//     let div_content_zoom_section = createElementHtml('div');
//     div_content_zoom_section.className='image-zoom-section';
//     let div_content_product_gallery = createElementHtml('div');
//     div_content_product_gallery.className='product-gallery owl-carousel owl-theme border mb-3 p-3 owl-loaded owl-drag';
//
//     let div_stage_outer = createElementHtml('div');
//     div_stage_outer.className='owl-stage-outer';
//     let div_owl_item = createElementHtml('div');
//     div_owl_item.className='owl-item';
//     div_owl_item.style='width: 400px; align-items: center; object-fit: cover;';
//     let div_content_img_item = createElementHtml('div');
//     div_content_img_item.className='item';
//     let img_carousel = createElementHtml('img');
//     img_carousel.className='img-fluid';
//     img_carousel.id='imagen_carusel';
//
//     let div_selector_imgs_products = createElementHtml('div');
//     div_selector_imgs_products.className='border mb-2 p-2';
//     div_selector_imgs_products.id='selector-imgs-products';
//
//     let div_content_product_info_section = createElementHtml('div');
//     div_content_product_info_section.className='product-info-section p-3';
//     let div_badge_category = createElementHtml('div');
//     div_badge_category.className='badge bg-badge-category mb-2';
//     let p_category_name = createElementHtml('p');
//     p_category_name.className='m-1 align-content-center font-14';
//     p_category_name.style='text-transform: uppercase;';
//     p_category_name.textContent=`${item.category}`;
//     let h3_item_name_product = createElementHtml('h3');
//     h3_item_name_product.className='mt-4 mt-lg-0 mb-0';
//     h3_item_name_product.textContent=`${item.name}`;
//     let div_content_brand = createElementHtml('div');
//     div_content_brand.className='d-inline-block mt-2';
//     let p_content_brand = createElementHtml('p');
//     p_content_brand.className='badge bg-success font-13';
//     p_content_brand.textContent=`${item.brand.name}`;
//     let p_content_brand_sub_type = createElementHtml('p');
//     p_content_brand_sub_type.className='badge bg-success font-13';
//     p_content_brand_sub_type.id='item_sub_type';
//
//     let div_container_price = createElementHtml('div');
//     div_container_price.className='d-flex align-items-center';
//     let div_content_price = createElementHtml('div');
//     div_content_price.className='mb-1 product-price itemprice jcitemprice';
//     let spand_cad = createElementHtml('span');
//     spand_cad.className='fs-5 currencyformat jcpriceformat';
//     spand_cad.textContent='CAD ';
//     let span_content_price = createElementHtml('span');
//     span_content_price.className='fs-5 jcpricingnw';
//     span_content_price.id='text_price';
//     let span_weight_format = createElementHtml('span');
//     span_weight_format.className='er-each jceachformat';
//     span_weight_format.id='text_weights_format';
//
//     let div_container_details = createElementHtml('div');
//     div_container_details.className='mt-3';
//     let h6_details = createElementHtml('h6');
//     h6_details.textContent='Details:';
//     let dl_content = createElementHtml('dl');
//     dl_content.className='row mt-3';
//     dl_content.id='container-details-dl';
//     let dt_content_product_id = createElementHtml('dt');
//     dt_content_product_id.className='col-sm-3';
//     dt_content_product_id.textContent='Product id';
//     let dd_content_id = createElementHtml('dd');
//     dd_content_id.className='col-sm-9';
//     dd_content_id.textContent=`# ${item.id}`;
//     let h6_description = createElementHtml('h6');
//     h6_description.textContent='Description:';
//     let p_content_description = createElementHtml('p');
//     p_content_description.className='mb-0';
//     p_content_description.textContent=`${item.description}`;
//
//     let div_container_quantity_weight = createElementHtml('div');
//     div_container_quantity_weight.className='row row-cols-auto align-items-center mt-3';
//
//     let div_content_quantity = createElementHtml('div');
//     div_content_quantity.className='col';
//     div_content_quantity.id='container_quantity';
//     let label_quantity = createElementHtml('label');
//     label_quantity.className='form-label';
//     label_quantity.textContent='Quantity';
//     let select_quantity = createElementHtml('select');
//     select_quantity.className='form-select form-select-sm';
//     select_quantity.id='quantity';
//
//     let div_content_weight = createElementHtml('div');
//     div_content_weight.class='col';
//     div_content_weight.id='container_weight';
//     let label_weight = createElementHtml('label');
//     label_weight.className='form-label';
//     label_weight.textContent='weight';
//     let select_weight = createElementHtml('select');
//     select_weight.className='form-select form-select-sm';
//     select_weight.id='select-weight';
//
//     let div_container_actions = createElementHtml('div');
//     div_container_actions.className='d-flex gap-2 mt-3';
//     let button_add_to_cart = createElementHtml('button');
//     button_add_to_cart.type='submit';
//     button_add_to_cart.className='btn btn-dark btn-ecomm';
//     button_add_to_cart.id='add-to-cart';
//     button_add_to_cart.textContent='Add to Cart';
//     let icon_add_to_cart = createElementHtml('i');
//     icon_add_to_cart.className='bx bxs-cart-add';
//
//
//     appendElementHtml(section_container_second, div_container_section_second);
//     appendElementHtml(div_container_section_second, div_product_details_card);
//     appendElementHtml(div_product_details_card, div_product_details_body);
//     appendElementHtml(div_product_details_body, div_content_row);
//
//     appendElementHtml(div_content_row, div_content_col_1);
//     appendElementHtml(div_content_row, div_content_col_2);
//
//     appendElementHtml(div_content_col_1, div_content_zoom_section);
//     appendElementHtml(div_content_zoom_section, div_content_product_gallery);
//     appendElementHtml(div_content_product_gallery, div_stage_outer);
//     appendElementHtml(div_stage_outer, div_owl_item);
//     appendElementHtml(div_owl_item, div_content_img_item);
//     appendElementHtml(div_content_img_item, img_carousel);
//     appendElementHtml(div_content_zoom_section, div_selector_imgs_products);
//
//     appendElementHtml(div_content_col_2, div_content_product_info_section);
//     appendElementHtml(div_content_product_info_section, p_category_name);
//     appendElementHtml(div_content_product_info_section, h3_item_name_product);
//     appendElementHtml(div_content_product_info_section, div_content_brand);
//     appendElementHtml(div_content_brand, p_content_brand);
//     appendElementHtml(div_content_brand, p_content_brand_sub_type);
//
//     appendElementHtml(div_content_product_info_section, div_container_price);
//     appendElementHtml(div_container_price, div_content_price);
//     appendElementHtml(div_content_price, spand_cad);
//     appendElementHtml(div_content_price, span_content_price);
//     appendElementHtml(div_content_price, span_weight_format);
//
//     appendElementHtml(div_content_product_info_section, div_container_details);
//
//     appendElementHtml(div_container_details, h6_details);
//     appendElementHtml(div_container_details, dl_content);
//     appendElementHtml(dl_content, dt_content_product_id);
//     appendElementHtml(dl_content, dd_content_id);
//     appendElementHtml(div_container_details, h6_description);
//     appendElementHtml(div_container_details, p_content_description);
//
//     appendElementHtml(div_content_product_info_section, div_container_quantity_weight);
//     appendElementHtml(div_container_quantity_weight, div_content_quantity);
//     appendElementHtml(div_content_quantity, label_quantity);
//     appendElementHtml(div_content_quantity, select_quantity);
//
//     appendElementHtml(div_container_quantity_weight, div_content_weight);
//     appendElementHtml(div_content_weight, label_weight);
//     appendElementHtml(div_content_weight, select_weight);
//
//     appendElementHtml(div_content_product_info_section, div_container_actions);
//     appendElementHtml(div_container_actions, button_add_to_cart);
//     appendElementHtml(button_add_to_cart, icon_add_to_cart);
//
//     //contenedores principales que almacenan el product details son dos section separados;
//     appendElementHtml(container_product_details, section_container_second);
//
//     const images = item.images;
//     let $container_img = document.querySelector('#imagen_carusel');
//     let miniatura_img = document.querySelector('#selector-imgs-products');
//
//     if (images.length === 0 ){
//         $container_img.src = '../assets/images/errors-images/image-not-found.jpeg';
//         miniatura_img.style='display: none;';
//     }else {
//         images.forEach( (miniatura,  index) => {
//             let img_miniatura = document.createElement('img');
//             img_miniatura.id='images_miniaturas';
//             img_miniatura.className='border p-1';
//             if (index === 0) {
//                 img_miniatura.className='active_item';
//                 $container_img.src=`${miniatura.url}`;
//             }
//             img_miniatura.src=`${miniatura.url}`;
//             miniatura_img.appendChild(img_miniatura);
//             const img_mini_all = document.querySelectorAll('#images_miniaturas');
//             img_mini_all.forEach(mini => {
//                 mini.addEventListener('click', function () {
//                     const active_item = document.querySelector('.active_item');
//                     active_item.classList.remove('active_item');
//                     this.classList.add('active_item');
//                     $container_img.src = this.src;
//                 });
//             });
//         })
//     }
//
//     // area de potency thc y cbd
//     if (item.potencyThc.hasOwnProperty('formatted') !== null) {
//         let dt_potency_thc = createElementHtml('dt');
//         dt_potency_thc.className='col-sm-3';
//         dt_potency_thc.textContent='THC';
//         let dd_potency_thc = createElementHtml('dd');
//         dd_potency_thc.className='col-sm-9';
//         dd_potency_thc.textContent=`${item.potencyThc.formatted}`;
//         appendElementHtml(dl_content, dt_potency_thc);
//         appendElementHtml(dl_content, dd_potency_thc);
//
//     }
//
//     if (item.potencyCbd.hasOwnProperty('formatted') !== null){
//         let dt_potency_cbd = createElementHtml('dt');
//         dt_potency_cbd.className='col-sm-3';
//         dt_potency_cbd.textContent='CBD';
//         let dd_potency_cbd = createElementHtml('dd');
//         dd_potency_cbd.className='col-sm-9';
//         dd_potency_cbd.textContent=`${item.potencyCbd.formatted}`;
//         appendElementHtml(dl_content, dt_potency_cbd);
//         appendElementHtml(dl_content, dd_potency_cbd);
//     }
//     //fin de area thc and cbd
//
//     //area de quantity y weight
//
//     //quantity
//     if (item.variants[0].quantity === 0 || item.variants[0].quantity === null ) {
//         console.log('No hay cantidad disponible para el carrito');
//     }else {
//         console.log('cantidad maxima para enviar al carrito: ', item.variants[0].quantity);
//
//         const container_select_quantity = document.querySelector('#quantity');
//         let max_cart_quantity = item.variants[0].quantity;
//
//         for (let quantity_select = 1; quantity_select <= max_cart_quantity; quantity_select++) {
//             console.log(quantity_select);
//             const options_quantity_select = createElementHtml('option');
//             options_quantity_select.value = quantity_select;
//             options_quantity_select.text = quantity_select;
//             appendElementHtml(container_select_quantity, options_quantity_select);
//         }
//     }
//
//     //weight
//     if (item.variants[0].option === null) {
//         let container_select_weight = document.querySelector('#container_weight');
//         container_select_weight.style='display: none;';
//         console.log('No existe ningun elemento en el available weight');
//     }else {
//         let container_select_weight = document.querySelector('#select-weight');
//
//         console.log('weight ', item.variants[0].option);
//         let option_weight_variant = item.variants[0].option;
//         const options_weight_select = createElementHtml('option');
//         options_weight_select.value = option_weight_variant;
//         options_weight_select.text = option_weight_variant;
//         appendElementHtml(container_select_weight, options_weight_select);
//     }
//
//     //fin de area de quantity and weight
//
//     //area de change precio segun cantidad seleccionada
//
//     const $select_weight = document.querySelector('#select-weight');
//     const $select_quantity = document.querySelector('#quantity');
//     let container_price = document.getElementById('text_price');
//     let text_weight_format = document.getElementById('text_weights_format');
//
//     let option_weight_current = document.getElementById('select-weight').value;
//     console.log(option_weight_current);
//
//     if (option_weight_current === '1g') {
//         container_price.textContent = `$ ${item.variants[0].priceRec}`;
//         text_weight_format.textContent = '/1G';
//     } else if (option_weight_current === '3.5g') {
//         container_price.textContent = `$ ${item.variants[0].priceRec}`;
//         text_weight_format.textContent = '/3.5G';
//     } else if (option_weight_current === '7g') {
//         container_price.textContent = `$ ${item.variants[0].priceRec}`;
//         text_weight_format.textContent = '/7G';
//     } else if (option_weight_current === '14g') {
//         container_price.textContent = `$ ${item.variants[0].priceRec}`;
//         text_weight_format.textContent = '/14G';
//     } else if (option_weight_current === '28g') {
//         container_price.textContent = `$ ${item.variants[0].priceRec}`;
//         text_weight_format.textContent = '/28G';
//     } else if (option_weight_current === "0.5g") {
//         container_price.textContent = `$ ${item.variants[0].priceRec}`;
//         text_weight_format.textContent = '/0.5G';
//     }
//
//     function selected_weight_change () {
//
//     }
//
//     function selected_quantity_change() {
//
//         let selec_option_quantity = parseInt(document.getElementById('quantity').value);
//         let select_option_weight = document.getElementById('select-weight').value;
//         let h4_price_replace = document.getElementById('text_price');
//         let price_each_int = item.variants[0].priceRec;
//
//
//         if (item.variants[0].option === 'each') {
//             let price_each_string = (price_each_int * selec_option_quantity).toFixed(2);
//             h4_price_replace.textContent = `$ ${price_each_string}`;
//         } else if (select_option_weight === '1g') {
//             let price_gram_int = item.variants[0].priceRec;
//             let price_gram_string = (price_gram_int * selec_option_quantity).toFixed(2);
//             h4_price_replace.textContent = `$ ${price_gram_string}`;
//
//         } else if (select_option_weight === '3.5g') {
//             let price_eighth_ounce_int = item.variants[0].priceRec;
//             let price_eighth_ounce_string = (price_eighth_ounce_int * selec_option_quantity).toFixed(2);
//             h4_price_replace.textContent = `$ ${price_eighth_ounce_string}`;
//
//         } else if (select_option_weight === '7g') {
//             let price_quarter_ounce_int = item.variants[0].priceRec;
//             let price_quarter_ounce_string = (price_quarter_ounce_int * selec_option_quantity).toFixed(2);
//             h4_price_replace.textContent = `$ ${price_quarter_ounce_string}`;
//
//         } else if (select_option_weight === '14g') {
//             let price_half_ounce_int = item.variants[0].priceRec;
//             let price_half_ounce_string = (price_half_ounce_int * selec_option_quantity).toFixed(2);
//             h4_price_replace.textContent = `$ ${price_half_ounce_string}`;
//
//         } else if (select_option_weight === '0.5g') {
//             let price_half_gram_int = item.variants[0].priceRec;
//             let price_half_gram_string = (price_half_gram_int * selec_option_quantity).toFixed(2);
//             h4_price_replace.textContent = `$ ${price_half_gram_string}`;
//
//         } else if (select_option_weight === '28g') {
//             let price_ounce_int = item.variants[0].priceRec;
//             let price_ounce_string = (price_ounce_int * selec_option_quantity).toFixed(2);
//             h4_price_replace.textContent = `$ ${price_ounce_string}`;
//
//         }
//
//     }
//
//     $select_quantity.addEventListener('change', selected_quantity_change);
//
//
//     //fin de area de cambio de precio segun cantidad seleccionada
//
//     //area de add to cart item product
//
//         let btn_add_to_cart = document.getElementById('add-to-cart');
//
//         let count = 0;
//
//         if (storage_local.getItem('count')) {
//             count = parseInt(storage_local.getItem('count'));
//         }
//
//
//         // btn_add_to_cart.addEventListener('click', btn_add_cart);
//         //
//         //
//         // function btn_add_cart () {
//         //
//         //     const product_id = item.id;
//         //     const quantity = parseInt(document.getElementById('quantity').value);
//         //     const option = document.getElementById('select-weight').value;
//         //
//         //     console.log('quantity:'+ ' ' + quantity + 'weight: '+ ' ' + option + 'productid:'+ ' ' + product_id)
//         //
//         //
//         //     CreateCheckout(id_store_centre_point_mall.id, "PICKUP", "RECREATIONAL").then( data => {
//         //
//         //         const { id, redirectUrl, pricingType, orderType  } = data.createCheckout;
//         //
//         //         console.log(data);
//         //
//         //         btn_cart_link.setAttribute('href', redirectUrl);
//         //
//         //         addItemCart(id_store_centre_point_mall.id, id, product_id, quantity, option).then(result => {
//         //             console.log(result);
//         //             console.table(result);
//         //         })
//         //     })
//         //
//         //
//         // }
//
//         function updateCount() {}
//
//     //fin de area add to cart product
//
//
//
//
// }).catch(error => console.log(error.message));


const product = getProduct(id_store_centre_point_mall.id, id_product);

product.then( (item) => {
    console.log(item);

    renderProduct(container_product_details, item);


}).catch(error => {
    console.log('Error en product details --> ',error.message)
});



const renderProduct = (container, informatio_product) => {
    let section_container_second = createElementHtml('section');
    section_container_second.className='py-4';

    let div_container_section_second = createElementHtml('div');
    div_container_section_second.className='container';

    let div_product_details_card = createElementHtml('div');
    div_product_details_card.className='product-detail-card';
    let div_product_details_body = createElementHtml('div');
    div_product_details_body.className='product-detail-body';
    let div_content_row = createElementHtml('div');
    div_content_row.className='row g-0';
    let div_content_col_1 = createElementHtml('div');
    div_content_col_1.className='col-12 col-lg-5';
    let div_content_col_2 = createElementHtml('div');
    div_content_col_2.className='col-12 col-lg-7';

    let div_content_zoom_section = createElementHtml('div');
    div_content_zoom_section.className='image-zoom-section';
    let div_content_product_gallery = createElementHtml('div');
    div_content_product_gallery.className='product-gallery owl-carousel owl-theme border mb-3 p-3 owl-loaded owl-drag';

    let div_stage_outer = createElementHtml('div');
    div_stage_outer.className='owl-stage-outer';
    let div_owl_item = createElementHtml('div');
    div_owl_item.className='owl-item';
    div_owl_item.style='width: 400px; align-items: center; object-fit: cover;';
    let div_content_img_item = createElementHtml('div');
    div_content_img_item.className='item';
    let img_carousel = createElementHtml('img');
    img_carousel.className='img-fluid';
    img_carousel.id='imagen_carusel';

    let div_selector_imgs_products = createElementHtml('div');
    div_selector_imgs_products.className='border mb-2 p-2';
    div_selector_imgs_products.id='selector-imgs-products';

    let div_content_product_info_section = createElementHtml('div');
    div_content_product_info_section.className='product-info-section p-3';
    let div_badge_category = createElementHtml('div');
    div_badge_category.className='badge bg-badge-category mb-2';
    let p_category_name = createElementHtml('p');
    p_category_name.className='m-1 align-content-center font-14';
    p_category_name.style='text-transform: uppercase;';
    p_category_name.textContent=`${informatio_product.category}`;
    let h3_item_name_product = createElementHtml('h3');
    h3_item_name_product.className='mt-4 mt-lg-0 mb-0';
    h3_item_name_product.textContent=`${informatio_product.name}`;
    let div_content_brand = createElementHtml('div');
    div_content_brand.className='d-inline-block mt-2';
    let p_content_brand = createElementHtml('p');
    p_content_brand.className='badge bg-success font-13';
    p_content_brand.textContent=`${informatio_product.brand.name}`;
    let p_content_brand_sub_type = createElementHtml('p');
    p_content_brand_sub_type.className='badge bg-success font-13';
    p_content_brand_sub_type.id='item_sub_type';

    let div_container_price = createElementHtml('div');
    div_container_price.className='d-flex align-items-center';
    let div_content_price = createElementHtml('div');
    div_content_price.className='mb-1 product-price itemprice jcitemprice';
    let spand_cad = createElementHtml('span');
    spand_cad.className='fs-5 currencyformat jcpriceformat';
    spand_cad.textContent='CAD ';
    let span_content_price = createElementHtml('span');
    span_content_price.className='fs-5 jcpricingnw';
    span_content_price.id='text_price';
    let span_weight_format = createElementHtml('span');
    span_weight_format.className='er-each jceachformat';
    span_weight_format.id='text_weights_format';

    let div_container_details = createElementHtml('div');
    div_container_details.className='mt-3';
    let h6_details = createElementHtml('h6');
    h6_details.textContent='Details:';
    let dl_content = createElementHtml('dl');
    dl_content.className='row mt-3';
    dl_content.id='container-details-dl';
    let dt_content_product_id = createElementHtml('dt');
    dt_content_product_id.className='col-sm-3';
    dt_content_product_id.textContent='Product id';
    let dd_content_id = createElementHtml('dd');
    dd_content_id.className='col-sm-9';
    dd_content_id.textContent=`# ${informatio_product.id}`;
    let h6_description = createElementHtml('h6');
    h6_description.textContent='Description:';
    let p_content_description = createElementHtml('p');
    p_content_description.className='mb-0';
    p_content_description.textContent=`${informatio_product.description}`;

    let div_container_quantity_weight = createElementHtml('div');
    div_container_quantity_weight.className='row row-cols-auto align-items-center mt-3';

    let div_content_quantity = createElementHtml('div');
    div_content_quantity.className='col';
    div_content_quantity.id='container_quantity';
    let label_quantity = createElementHtml('label');
    label_quantity.className='form-label';
    label_quantity.textContent='Quantity';
    let select_quantity = createElementHtml('select');
    select_quantity.className='form-select form-select-sm';
    select_quantity.id='quantity';

    let div_content_weight = createElementHtml('div');
    div_content_weight.class='col';
    div_content_weight.id='container_weight';
    let label_weight = createElementHtml('label');
    label_weight.className='form-label';
    label_weight.textContent='weight';
    let select_weight = createElementHtml('select');
    select_weight.className='form-select form-select-sm';
    select_weight.id='select-weight';

    let div_container_actions = createElementHtml('div');
    div_container_actions.className='d-flex gap-2 mt-3';
    let button_add_to_cart = createElementHtml('button');
    button_add_to_cart.type='submit';
    button_add_to_cart.className='btn btn-dark btn-ecomm';
    button_add_to_cart.id='add-to-cart';
    button_add_to_cart.textContent='Add to Cart';
    let icon_add_to_cart = createElementHtml('i');
    icon_add_to_cart.className='bx bxs-cart-add';


    appendElementHtml(section_container_second, div_container_section_second);
    appendElementHtml(div_container_section_second, div_product_details_card);
    appendElementHtml(div_product_details_card, div_product_details_body);
    appendElementHtml(div_product_details_body, div_content_row);

    appendElementHtml(div_content_row, div_content_col_1);
    appendElementHtml(div_content_row, div_content_col_2);

    appendElementHtml(div_content_col_1, div_content_zoom_section);
    appendElementHtml(div_content_zoom_section, div_content_product_gallery);
    appendElementHtml(div_content_product_gallery, div_stage_outer);
    appendElementHtml(div_stage_outer, div_owl_item);
    appendElementHtml(div_owl_item, div_content_img_item);
    appendElementHtml(div_content_img_item, img_carousel);
    appendElementHtml(div_content_zoom_section, div_selector_imgs_products);

    appendElementHtml(div_content_col_2, div_content_product_info_section);
    appendElementHtml(div_content_product_info_section, p_category_name);
    appendElementHtml(div_content_product_info_section, h3_item_name_product);
    appendElementHtml(div_content_product_info_section, div_content_brand);
    appendElementHtml(div_content_brand, p_content_brand);
    appendElementHtml(div_content_brand, p_content_brand_sub_type);

    appendElementHtml(div_content_product_info_section, div_container_price);
    appendElementHtml(div_container_price, div_content_price);
    appendElementHtml(div_content_price, spand_cad);
    appendElementHtml(div_content_price, span_content_price);
    appendElementHtml(div_content_price, span_weight_format);

    appendElementHtml(div_content_product_info_section, div_container_details);

    appendElementHtml(div_container_details, h6_details);
    appendElementHtml(div_container_details, dl_content);
    appendElementHtml(dl_content, dt_content_product_id);
    appendElementHtml(dl_content, dd_content_id);
    appendElementHtml(div_container_details, h6_description);
    appendElementHtml(div_container_details, p_content_description);

    appendElementHtml(div_content_product_info_section, div_container_quantity_weight);
    appendElementHtml(div_container_quantity_weight, div_content_quantity);
    appendElementHtml(div_content_quantity, label_quantity);
    appendElementHtml(div_content_quantity, select_quantity);

    appendElementHtml(div_container_quantity_weight, div_content_weight);
    appendElementHtml(div_content_weight, label_weight);
    appendElementHtml(div_content_weight, select_weight);

    appendElementHtml(div_content_product_info_section, div_container_actions);
    appendElementHtml(div_container_actions, button_add_to_cart);
    appendElementHtml(button_add_to_cart, icon_add_to_cart);

    //contenedores principales que almacenan el product details son dos section separados;
    appendElementHtml(container, section_container_second);
}

