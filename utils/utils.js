const FadeOut = (ElementHtml) => {
    ElementHtml.style.opacity = 1;
    (function fade() {
       if ((ElementHtml.style.opacity -= 0.1) < 0) {
           ElementHtml.style.display = 'none';
       }else {
           requestAnimationFrame(fade);
       }
    })();
}

const FadeIn = (ElementHtml) => {
    ElementHtml.style.opacity = 0;
    ElementHtml.style.display='block';
    (function fade() {
        let valor = parseFloat(ElementHtml.style.opacity);
        if (!(valor += 0.005) > 1) {
            ElementHtml.style.opacity = valor;
            requestAnimationFrame(fade);
        }
    })();
}

export {
    FadeOut,
    FadeIn
}

// let section_container_second = createElementHtml('section');
// section_container_second.className='py-4';
//
// let div_container_section_second = createElementHtml('div');
// div_container_section_second.className='container';
//
// let div_product_details_card = createElementHtml('div');
// div_product_details_card.className='product-detail-card';
// let div_product_details_body = createElementHtml('div');
// div_product_details_body.className='product-detail-body';
// let div_content_row = createElementHtml('div');
// div_content_row.className='row g-0';
// let div_content_col_1 = createElementHtml('div');
// div_content_col_1.className='col-12 col-lg-5';
// let div_content_col_2 = createElementHtml('div');
// div_content_col_2.className='col-12 col-lg-7';
//
// let div_content_zoom_section = createElementHtml('div');
// div_content_zoom_section.className='image-zoom-section';
// let div_content_product_gallery = createElementHtml('div');
// div_content_product_gallery.className='product-gallery owl-carousel owl-theme border mb-3 p-3 owl-loaded owl-drag';
//
// let div_stage_outer = createElementHtml('div');
// div_stage_outer.className='owl-stage-outer';
// let div_owl_item = createElementHtml('div');
// div_owl_item.className='owl-item';
// div_owl_item.style='width: 400px; align-items: center; object-fit: cover;';
// let div_content_img_item = createElementHtml('div');
// div_content_img_item.className='item';
// let img_carousel = createElementHtml('img');
// img_carousel.className='img-fluid';
// img_carousel.id='imagen_carusel';
//
// let div_selector_imgs_products = createElementHtml('div');
// div_selector_imgs_products.className='border mb-2 p-2';
// div_selector_imgs_products.id='selector-imgs-products';
//
// let div_content_product_info_section = createElementHtml('div');
// div_content_product_info_section.className='product-info-section p-3';
// let div_badge_category = createElementHtml('div');
// div_badge_category.className='badge bg-badge-category mb-2';
// let p_category_name = createElementHtml('p');
// p_category_name.className='m-1 align-content-center font-14';
// p_category_name.style='text-transform: uppercase;';
// p_category_name.textContent=`${informatio_product.category}`;
// let h3_item_name_product = createElementHtml('h3');
// h3_item_name_product.className='mt-4 mt-lg-0 mb-0';
// h3_item_name_product.textContent=`${informatio_product.name}`;
// let div_content_brand = createElementHtml('div');
// div_content_brand.className='d-inline-block mt-2';
// let p_content_brand = createElementHtml('p');
// p_content_brand.className='badge bg-success font-13';
// p_content_brand.textContent=`${informatio_product.brand.name}`;
// let p_content_brand_sub_type = createElementHtml('p');
// p_content_brand_sub_type.className='badge bg-success font-13';
// p_content_brand_sub_type.id='item_sub_type';
//
// let div_container_price = createElementHtml('div');
// div_container_price.className='d-flex align-items-center';
// let div_content_price = createElementHtml('div');
// div_content_price.className='mb-1 product-price itemprice jcitemprice';
// let spand_cad = createElementHtml('span');
// spand_cad.className='fs-5 currencyformat jcpriceformat';
// spand_cad.textContent='CAD ';
// let span_content_price = createElementHtml('span');
// span_content_price.className='fs-5 jcpricingnw';
// span_content_price.id='text_price';
// let span_weight_format = createElementHtml('span');
// span_weight_format.className='er-each jceachformat';
// span_weight_format.id='text_weights_format';
//
// let div_container_details = createElementHtml('div');
// div_container_details.className='mt-3';
// let h6_details = createElementHtml('h6');
// h6_details.textContent='Details:';
// let dl_content = createElementHtml('dl');
// dl_content.className='row mt-3';
// dl_content.id='container-details-dl';
// let dt_content_product_id = createElementHtml('dt');
// dt_content_product_id.className='col-sm-3';
// dt_content_product_id.textContent='Product id';
// let dd_content_id = createElementHtml('dd');
// dd_content_id.className='col-sm-9';
// dd_content_id.textContent=`# ${informatio_product.id}`;
// let dt_content_straint = createElementHtml('dt');
// dt_content_straint.className='col-sm-3';
// dt_content_straint.textContent='Strain';
// let dd_content_straint = createElementHtml('dd');
// dd_content_straint.className='col-sm-9';
// dd_content_straint.textContent=`${informatio_product.strainType}`;
// let div_content_effects = createElementHtml('div');
// div_content_effects.className='d-flex';
// div_content_effects.style='margin-top: -10px; margin-bottom: 20px;'
// div_content_effects.id='content_effects';
// let h6_description = createElementHtml('h6');
// h6_description.textContent='Description:';
// let p_content_description = createElementHtml('p');
// p_content_description.className='mb-0';
// p_content_description.textContent=`${informatio_product.description}`;
//
// let div_container_quantity_weight = createElementHtml('div');
// div_container_quantity_weight.className='row row-cols-auto align-items-center mt-3';
//
// let div_content_quantity = createElementHtml('div');
// div_content_quantity.className='col';
// div_content_quantity.id='container_quantity';
// let label_quantity = createElementHtml('label');
// label_quantity.className='form-label';
// label_quantity.textContent='Quantity';
// let select_quantity = createElementHtml('select');
// select_quantity.className='form-select form-select-sm';
// select_quantity.id='quantity';
//
// let div_content_weight = createElementHtml('div');
// div_content_weight.class='col';
// div_content_weight.id='container_weight';
// let label_weight = createElementHtml('label');
// label_weight.className='form-label';
// label_weight.textContent='weight';
// let select_weight = createElementHtml('select');
// select_weight.className='form-select form-select-sm';
// select_weight.id='select-weight';
//
// let div_container_actions = createElementHtml('div');
// div_container_actions.className='d-flex gap-2 mt-3';
// let button_add_to_cart = createElementHtml('button');
// button_add_to_cart.type='submit';
// button_add_to_cart.className='btn btn-dark btn-ecomm';
// button_add_to_cart.id='add-to-cart';
// button_add_to_cart.textContent='Add to Cart';
// let icon_add_to_cart = createElementHtml('i');
// icon_add_to_cart.className='bx bxs-cart-add';
//
//
// appendElementHtml(section_container_second, div_container_section_second);
// appendElementHtml(div_container_section_second, div_product_details_card);
// appendElementHtml(div_product_details_card, div_product_details_body);
// appendElementHtml(div_product_details_body, div_content_row);
//
// appendElementHtml(div_content_row, div_content_col_1);
// appendElementHtml(div_content_row, div_content_col_2);
//
// appendElementHtml(div_content_col_1, div_content_zoom_section);
// appendElementHtml(div_content_zoom_section, div_content_product_gallery);
// appendElementHtml(div_content_product_gallery, div_stage_outer);
// appendElementHtml(div_stage_outer, div_owl_item);
// appendElementHtml(div_owl_item, div_content_img_item);
// appendElementHtml(div_content_img_item, img_carousel);
// appendElementHtml(div_content_zoom_section, div_selector_imgs_products);
//
// appendElementHtml(div_content_col_2, div_content_product_info_section);
// appendElementHtml(div_content_product_info_section, p_category_name);
// appendElementHtml(div_content_product_info_section, h3_item_name_product);
// appendElementHtml(div_content_product_info_section, div_content_brand);
// appendElementHtml(div_content_brand, p_content_brand);
// appendElementHtml(div_content_brand, p_content_brand_sub_type);
//
// appendElementHtml(div_content_product_info_section, div_container_price);
// appendElementHtml(div_container_price, div_content_price);
// appendElementHtml(div_content_price, spand_cad);
// appendElementHtml(div_content_price, span_content_price);
// appendElementHtml(div_content_price, span_weight_format);
//
// appendElementHtml(div_content_product_info_section, div_container_details);
//
// appendElementHtml(div_container_details, h6_details);
// appendElementHtml(div_container_details, dl_content);
// appendElementHtml(dl_content, dt_content_product_id);
// appendElementHtml(dl_content, dd_content_id);
// appendElementHtml(dl_content, dt_content_straint);
// appendElementHtml(dl_content, dd_content_straint);
// appendElementHtml(div_container_details, div_content_effects);
// appendElementHtml(div_container_details, h6_description);
// appendElementHtml(div_container_details, p_content_description);
//
// appendElementHtml(div_content_product_info_section, div_container_quantity_weight);
// appendElementHtml(div_container_quantity_weight, div_content_quantity);
// appendElementHtml(div_content_quantity, label_quantity);
// appendElementHtml(div_content_quantity, select_quantity);
//
// appendElementHtml(div_container_quantity_weight, div_content_weight);
// appendElementHtml(div_content_weight, label_weight);
// appendElementHtml(div_content_weight, select_weight);
//
// appendElementHtml(div_content_product_info_section, div_container_actions);
// appendElementHtml(div_container_actions, button_add_to_cart);
// appendElementHtml(button_add_to_cart, icon_add_to_cart);
//
// //contenedores principales que almacenan el product details son dos section separados;
// appendElementHtml(container, section_container_second);
