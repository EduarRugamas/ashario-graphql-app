import {GetProduct} from '../utils/fetch_querys.js';
import {appendElementHtml, createElementHtml} from "../utils/elements_html.js";
const urlParams = new URLSearchParams(window.location.search);
const storage_local = window.localStorage;
const id_store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centrepoint_Mall'));
const id_product = urlParams.get('id');
const container_product_details = document.getElementById('product-details');

console.log('aqui el id', id_product);

GetProduct(id_store_centre_point_mall.id, id_product).then( item => {

    console.log(item);

    let section_container_first = createElementHtml('section');
    section_container_first.className='py-3 border-bottom border-top d-md-flex bg-light jcbreadcrumb';
    let section_container_second = createElementHtml('section');
    section_container_second.className='py-4';

    let div_container_section_firts = createElementHtml('div');
    div_container_section_firts.className='container';
    let div_container_content_page_breadcrum = createElementHtml('div');
    div_container_content_page_breadcrum.className='page-breadcrumb d-flex align-items-center';
    let etiqueta_a_content_icon = createElementHtml('a');
    etiqueta_a_content_icon.href='../index.html';
    etiqueta_a_content_icon.className='nav-link position-relative cart-link';
    let icon_arrow_back = createElementHtml('i');
    icon_arrow_back.className='bx bx-chevron-left bx-lg';
    icon_arrow_back.style='color: #000000;';

    let etiqueta_h3_name = createElementHtml('h3');
    etiqueta_h3_name.className='breadcrumb-title pe-3';
    etiqueta_h3_name.textContent=`${item.name}`;

    let div_content_icon_cart_shop = createElementHtml('div');
    div_content_icon_cart_shop.className='col-4 col-md-auto order-2 order-md-4 ms-auto';
    let div_top_cart_icons = createElementHtml('div');
    div_top_cart_icons.className='top-cart-icons float-start';
    let nav_content_expand = createElementHtml('nav');
    nav_content_expand.className='navbar navbar-expand';
    let ul_nav_bar = createElementHtml('ul');
    ul_nav_bar.className='navbar-nav ms-auto';
    let li_nav_item = createElementHtml('li');
    li_nav_item.className='nav-item';
    let a_content_icon_cart = createElementHtml('a');
    a_content_icon_cart.href='/views/shop-cart.html';
    a_content_icon_cart.className='nav-link position-relative cart-link';
    let span_alert_count = createElementHtml('span');
    span_alert_count.className='alert-count';
    span_alert_count.id='count_quantity_cart';
    span_alert_count.textContent='0';
    let icon_cart_count = createElementHtml('i');
    icon_cart_count.className='bx bx-shopping-bag';


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
    p_category_name.textContent=`${item.category}`;
    let h3_item_name_product = createElementHtml('h3');
    h3_item_name_product.className='mt-4 mt-lg-0 mb-0';
    h3_item_name_product.textContent=`${item.name}`;
    let div_content_brand = createElementHtml('div');
    div_content_brand.className='d-inline-block mt-2';
    let p_content_brand = createElementHtml('p');
    p_content_brand.className='badge bg-success font-13';
    p_content_brand.textContent=`${item.brand.name}`;
    let p_content_brand_sub_type = createElementHtml('p');
    p_content_brand_sub_type.className='badge bg-success font-13';
    p_content_brand_sub_type.id='item_sub_type';

    let div_container_price = createElementHtml('div');
    div_container_price.className='d-flex align-items-center';
    let div_content_price = createElementHtml('div');
    div_content_price.className='mb-1 product-price itemprice jcitemprice';
    let spand_cad = createElementHtml('span');
    spand_cad.className='fs-5 currencyformat jcpriceformat';
    spand_cad.textContent='CAD';
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
    dd_content_id.textContent=`# ${item.id}`;
    let h6_description = createElementHtml('h6');
    h6_description.textContent='Description:';
    let p_content_description = createElementHtml('p');
    p_content_description.className='mb-0';
    p_content_description.textContent=`${item.description}`;

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



    appendElementHtml(section_container_first, div_container_section_firts);
    appendElementHtml(div_container_section_firts, div_container_content_page_breadcrum);
    appendElementHtml(div_container_content_page_breadcrum, etiqueta_a_content_icon);
    appendElementHtml(etiqueta_a_content_icon, icon_arrow_back);
    appendElementHtml(div_container_content_page_breadcrum, etiqueta_h3_name);

    appendElementHtml(div_container_content_page_breadcrum, div_content_icon_cart_shop);
    appendElementHtml(div_content_icon_cart_shop, div_top_cart_icons);
    appendElementHtml(div_top_cart_icons, nav_content_expand);
    appendElementHtml(nav_content_expand, ul_nav_bar);
    appendElementHtml(ul_nav_bar, li_nav_item);
    appendElementHtml(li_nav_item, span_alert_count);
    appendElementHtml(li_nav_item, icon_cart_count);

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
    appendElementHtml(container_product_details, section_container_first);
    appendElementHtml(container_product_details, section_container_second);

//     container_product_details.innerHTML=`
//     <section class="py-3 border-bottom border-top d-md-flex bg-light jcbreadcrumb">
//         <div class="container">
//             <div class="page-breadcrumb d-flex align-items-center">
//                 <a href="../index.html" class="nav-link position-relative cart-link">
//                     <i class='bx bx-chevron-left bx-lg' style="color: #000000; "></i>
//                 </a>
//
//                 <h3 class="breadcrumb-title pe-3">${item.name}</h3>
//                 <div class="col-4 col-md-auto order-2 order-md-4 ms-auto">
//                     <div class="top-cart-icons float-start">
//                         <nav class="navbar navbar-expand">
//                             <ul class="navbar-nav ms-auto">
//                                 <li class="nav-item">
//                                     <a href="/views/shop-cart.html" class="nav-link position-relative cart-link">
//                                         <span class="alert-count" id="count_quantity_cart">0</span>
//                                         <i class="bx bx-shopping-bag"></i>
//                                     </a>
//                                 </li>
//                             </ul>
//                         </nav>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
// <!--end breadcrumb-->
// <!--start product detail-->
// <section class="py-4">
//     <div class="container">
//         <div class="product-detail-card">
//             <div class="product-detail-body">
//                 <div class="row g-0">
//                     <div class="col-12 col-lg-5">
//                         <div class="image-zoom-section">
//                             <div class="product-gallery owl-carousel owl-theme border mb-3 p-3 owl-loaded owl-drag">
//                                 <div class="owl-stage-outer">
//                                     <div class="owl-item"
//                                          style="width: 400px; align-items: center; object-fit: cover;">
//                                         <div class="item">
//                                             <img src="" alt="" class="img-fluid" id="imagen_carusel">
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div id="selector-imgs-products" style="" class="border mb-2 p-2"></div>
//                         </div>
//                     </div>
//                     //aqui me quede
//                     <div class="col-12 col-lg-7">
//                         <div class="product-info-section p-3">
//                             <div class="badge bg-badge-category mb-2">
//                                 <p style="text-transform: uppercase;" class="m-1 align-content-center font-14">${item.category}</p>
//                             </div>
//                             <h3 class="mt-4 mt-lg-0 mb-0">${item.name}</h3>
//                             <div class="d-inline-block mt-2">
//                                 <p class="badge bg-success font-13 ">${item.brand.name}</p>
//                                 <p class="badge bg-success font-13" id="item_sub_type"></p>
//                             </div>
//                             <div class="d-flex align-items-center">
//                                 <div class="mb-1 product-price itemprice jcitemprice">
//                                     <span class="fs-5 currencyformat jcpriceformat">CAD</span>
//                                     <span class="fs-5 jcpricingnw" id="text_price"></span>
//                                     <span class="er-each jceachformat" id="text_weights_format"></span>
//                                 </div>
//                             </div>
//                             <!--<div class="d-flex align-items-center mt-0 gap-2" id="text_price"></div>-->
//                             <div class="mt-3">
//                                 <h6>Details:</h6>
//                                 <dl class="row mt-3" id="container-details-dl">
//                                     <dt class="col-sm-3">Product id</dt>
//                                     <dd class="col-sm-9"># ${item.id}</dd>
//                                 </dl>
//                                 <!--<p class="mb-0">${hits[0].description}</p>-->
//
//                                 <h6>Description:</h6>
//                                 <p class="mb-0">${item.description}</p>
//                             </div>
//
//
//                             // aqui me quede
//                             <div class="row row-cols-auto align-items-center mt-3">
//                                 <div class="col" id="container_quantity">
//                                     <label class="form-label">Quantity</label>
//                                     <select class="form-select form-select-sm" id="quantity"></select>
//                                 </div>
//                                 <div class="col" id="container_weight">
//                                     <label class="form-label">weight</label>
//                                     <select class="form-select form-select-sm" id="select-weight"></select>
//                                 </div>
//                             </div>
//
//
//
//
//
//                             <div class="d-flex gap-2 mt-3">
//                                 <!--                                            <a href="" class="btn btn-white btn-ecomm" id="add-to-cart"><i class="bx bxs-cart-add"></i>Add to Cart</a>-->
//                                 <button type="submit" class="btn btn-dark btn-ecomm" id="add-to-cart"><i
//                                     class="bx bxs-cart-add"></i>Add to Cart
//                                 </button>
//                             </div>
//
//
//
//                             <hr/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>
//     `;

    const images = item.images;
    let $container_img = document.querySelector('#imagen_carusel');
    let miniatura_img = document.querySelector('#selector-imgs-products');

    if (images.length === 0 ){
        $container_img.src = '../assets/images/errors-images/image-not-found.jpeg';
        miniatura_img.style='display: none;';
    }else {
        images.forEach( (miniatura,  index) => {
            console.log(miniatura);
            console.log(index);
            let img_miniatura = document.createElement('img');
            img_miniatura.id='images_miniaturas';
            img_miniatura.className='border p-1';
            if (index === 0) {
                img_miniatura.className='active_item';
                $container_img.src=`${miniatura}`;
            }
            img_miniatura.src=`${miniatura}`;
            miniatura_img.appendChild(img_miniatura);
            const img_mini_all = document.querySelectorAll('#images_miniaturas');
            img_mini_all.forEach(mini => {
                mini.addEventListener('click', function () {
                    const active_item = document.querySelector('.active_item');
                    active_item.classList.remove('active_item');
                    this.classList.add('active_item');
                    $container_img.src = this.src;
                });
            });
        })
    }


}).catch(error => console.log(error.message));


