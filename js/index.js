import {GetAllProducts, GetAllRetailerIds} from '../utils/fetch_querys.js';
import {url_base, secret_key, public_key} from '../config/config.js';
import { createElementHtml, appendElementHtml } from '../utils/elements_html.js';
const storage_local = window.localStorage;
const Ashario_Centre_point_Mall = JSON.parse(storage_local.getItem('Ashario_Centrepoint_Mall'));

let query_products_all = `
        query GetAllProducts($retailerId: ID="${Ashario_Centre_point_Mall.id}" ) {
        menu(retailerId: $retailerId, filter: { category: FLOWER}, pagination: { offset: 0, limit: 20 } ) {
            products {
                id,
                name,
                brand{
                  name
                },
                image,
                category,
                subcategory,
                variants {
                  option,
                  priceMed,
                  priceRec,
                }
            },
            productsCount
        }
    }

`


fetch(`${url_base}`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + public_key,
    },
    body: JSON.stringify({query: query_products_all })
}).then( (response) => {

    if (response.ok) {
        return response.json();
    }else {
        return response.error();
    }

    }).then(((items) => {
        console.log(items);
        let products = items.data.menu;
        const container_products = document.getElementById('container-products');
        products.map( (product) => {

            //div que encierra toda la card
            let div_col = createElementHtml('div');
            div_col.className= 'col';

            //segundo div de la card
            let div_product_card = createElementHtml('div');
            div_product_card.className='card rounded-0 product-card';

            //tercer div card_body
            let div_card_body = createElementHtml('div');
            div_card_body.className='card-body';

            let div_product_info = createElementHtml('div');
            div_product_info.className='product-info';

            let container_image = createElementHtml('a');
            container_image.href=`/views/product-details.html?id=${product.id}`;
            let image = createElementHtml('img');
            image.className='card-img-top';
            image.id='imagen-product';
            image.src=`${product.image !== null ? product.image : '../assets/images/errors-images/image-not-found.jpeg'}`;
            image.alt=`${product.name}`;

            let link_a_item_brand = createElementHtml('a');
            link_a_item_brand.href=`/views/product-details.html?id=${product.id}`;
            let etiqueta_p_item_brand = createElementHtml('p');
            etiqueta_p_item_brand.className='product-catergory font-13 mb-1 itembrand';
            let etiqueta_p_item_brand_sub_type = createElementHtml('p');
            etiqueta_p_item_brand_sub_type.className='product-catergory font-13 mb-1 itemsubtype';
            etiqueta_p_item_brand_sub_type.id='itemsubtype';

            let etiqueta_a_link_item_name = createElementHtml('a');
            etiqueta_a_link_item_name.href=`/views/product-details.html?id=${product.id}`;
            let etiqueta_h6_item_name = createElementHtml('h6');
            etiqueta_h6_item_name.className='product-name mb-2 itemname';
            etiqueta_h6_item_name.textContent=`${product.name}`;

            let div_container_info_price = createElementHtml('div');
            div_container_info_price.className='d-flex align-items-center';
            let div_container_span = createElementHtml('div');
            div_container_span.className='mb-1 product-price itemprice jcitemprice';
            let span_text_cad = createElementHtml('span');
            span_text_cad.className='fs-5 currencyformat jcpriceformat';
            span_text_cad.textContent='CAD ';
            let span_text_price = createElementHtml('span');
            span_text_price.className='fs-5 jcpricingnw';
            span_text_price.textContent=`${product.variants[0].priceMed}`;
            let span_text_weights = createElementHtml('span');
            span_text_weights.className='er-each jceachformat';
            span_text_weights.textContent=`/${product.variants[0].option}`;

            let div_content_action = createElementHtml('div');
            div_content_action.className='product-action mt-2';
            div_content_action.id='content';
            let div_content_etiqueta_a = createElementHtml('div');
            div_content_etiqueta_a.className='d-grid gap-2';
            let add_to_cart = createElementHtml('a');
            add_to_cart.className='btn btn-dark btn-ecomm';
            add_to_cart.id='add_to_cart_btn';
            add_to_cart.textContent='add to cart';
            let icon_add_to_cart = createElementHtml('i');
            icon_add_to_cart.className='bx bxs-cart-add';
            let btn_product_details = createElementHtml('a');
            btn_product_details.className='btn btn-light btn-ecomm';
            btn_product_details.href=`/views/product-details.html?id=${product.id}`;
            btn_product_details.textContent='Product Details';


            appendElementHtml(div_col, div_product_card);

            appendElementHtml(div_product_card, container_image);
            appendElementHtml(container_image, image);

            appendElementHtml(div_product_card, div_card_body);
            appendElementHtml(div_card_body, div_product_info);
            // div product info iran todos los demas elementos que se encuentran dentro de el div product info
            // a exepcion de el container de la imagen ese va fuera de el div product info
            appendElementHtml(div_product_info, link_a_item_brand);
            appendElementHtml(link_a_item_brand, etiqueta_p_item_brand);
            appendElementHtml(link_a_item_brand, etiqueta_p_item_brand_sub_type);

            appendElementHtml(div_product_info, etiqueta_a_link_item_name);
            appendElementHtml(etiqueta_a_link_item_name, etiqueta_h6_item_name);

            appendElementHtml(div_product_info, div_container_info_price);
            appendElementHtml(div_container_info_price, div_container_span);
            appendElementHtml(div_container_span, span_text_cad);
            appendElementHtml(div_container_span, span_text_price);
            appendElementHtml(div_container_span, span_text_weights);

            appendElementHtml(div_product_info, div_content_action);
            appendElementHtml(div_content_action, div_content_etiqueta_a);
            appendElementHtml(div_content_etiqueta_a, add_to_cart);
            appendElementHtml(add_to_cart, icon_add_to_cart);
            appendElementHtml(div_content_etiqueta_a, btn_product_details);
            //container principal que almacena a TODO el card
            appendElementHtml(container_products, div_col);

        })


    }
)).catch( (error) => {
        console.log(error);
        const container_products = document.getElementById('container-products');

        let div_error = createElementHtml('p');

        div_error.textContent='No hay contenido a mostrar, surgio un error en el server';

        appendElementHtml(container_products, div_error);

    })








//     GetAllProducts(Ashario_Centre_point_Mall.id).then( (items) => {
//
//         console.log(items);
//         let information = items.products;
//
//         information.map( products => {
//
//             //div que encierra toda la card
//             let div_col = createElementHtml('div');
//             div_col.className= 'col';
//
//             //segundo div de la card
//             let div_product_card = createElementHtml('div');
//             div_product_card.className='card rounded-0 product-card';
//
//             //tercer div card_body
//             let div_card_body = createElementHtml('div');
//             div_card_body.className='card-body';
//
//             let div_product_info = createElementHtml('div');
//             div_product_info.className='product-info';
//
//             let container_image = createElementHtml('a');
//             container_image.href=`/views/product-details.html?id=${products.id}`;
//             let image = createElementHtml('img');
//             image.className='card-img-top';
//             image.id='imagen-product';
//             image.src=`${products.image !== null ? products.image : '../assets/images/errors-images/image-not-found.jpeg'}`;
//             image.alt=`${products.name}`;
//
//             let link_a_item_brand = createElementHtml('a');
//             link_a_item_brand.href=`/views/product-details.html?id=${products.id}`;
//             let etiqueta_p_item_brand = createElementHtml('p');
//             etiqueta_p_item_brand.className='product-catergory font-13 mb-1 itembrand';
//             let etiqueta_p_item_brand_sub_type = createElementHtml('p');
//             etiqueta_p_item_brand_sub_type.className='product-catergory font-13 mb-1 itemsubtype';
//             etiqueta_p_item_brand_sub_type.id='itemsubtype';
//
//             let etiqueta_a_link_item_name = createElementHtml('a');
//             etiqueta_a_link_item_name.href=`/views/product-details.html?id=${products.id}`;
//             let etiqueta_h6_item_name = createElementHtml('h6');
//             etiqueta_h6_item_name.className='product-name mb-2 itemname';
//             etiqueta_h6_item_name.textContent=`${products.name}`;
//
//             let div_container_info_price = createElementHtml('div');
//             div_container_info_price.className='d-flex align-items-center';
//             let div_container_span = createElementHtml('div');
//             div_container_span.className='mb-1 product-price itemprice jcitemprice';
//             let span_text_cad = createElementHtml('span');
//             span_text_cad.className='fs-5 currencyformat jcpriceformat';
//             span_text_cad.textContent='CAD ';
//             let span_text_price = createElementHtml('span');
//             span_text_price.className='fs-5 jcpricingnw';
//             span_text_price.textContent=`${products.variants[0].priceMed}`;
//             let span_text_weights = createElementHtml('span');
//             span_text_weights.className='er-each jceachformat';
//             span_text_weights.textContent=`/${products.variants[0].option}`;
//
//             let div_content_action = createElementHtml('div');
//             div_content_action.className='product-action mt-2';
//             div_content_action.id='content';
//             let div_content_etiqueta_a = createElementHtml('div');
//             div_content_etiqueta_a.className='d-grid gap-2';
//             let add_to_cart = createElementHtml('a');
//             add_to_cart.className='btn btn-dark btn-ecomm';
//             add_to_cart.id='add_to_cart_btn';
//             add_to_cart.textContent='add to cart';
//             let icon_add_to_cart = createElementHtml('i');
//             icon_add_to_cart.className='bx bxs-cart-add';
//             let btn_product_details = createElementHtml('a');
//             btn_product_details.className='btn btn-light btn-ecomm';
//             btn_product_details.href=`/views/product-details.html?id=${products.id}`;
//             btn_product_details.textContent='Product Details';
//
//
//             appendElementHtml(div_col, div_product_card);
//
//             appendElementHtml(div_product_card, container_image);
//             appendElementHtml(container_image, image);
//
//             appendElementHtml(div_product_card, div_card_body);
//             appendElementHtml(div_card_body, div_product_info);
//             // div product info iran todos los demas elementos que se encuentran dentro de el div product info
//             // a exepcion de el container de la imagen ese va fuera de el div product info
//             appendElementHtml(div_product_info, link_a_item_brand);
//             appendElementHtml(link_a_item_brand, etiqueta_p_item_brand);
//             appendElementHtml(link_a_item_brand, etiqueta_p_item_brand_sub_type);
//
//             appendElementHtml(div_product_info, etiqueta_a_link_item_name);
//             appendElementHtml(etiqueta_a_link_item_name, etiqueta_h6_item_name);
//
//             appendElementHtml(div_product_info, div_container_info_price);
//             appendElementHtml(div_container_info_price, div_container_span);
//             appendElementHtml(div_container_span, span_text_cad);
//             appendElementHtml(div_container_span, span_text_price);
//             appendElementHtml(div_container_span, span_text_weights);
//
//             appendElementHtml(div_product_info, div_content_action);
//             appendElementHtml(div_content_action, div_content_etiqueta_a);
//             appendElementHtml(div_content_etiqueta_a, add_to_cart);
//             appendElementHtml(add_to_cart, icon_add_to_cart);
//             appendElementHtml(div_content_etiqueta_a, btn_product_details);
//             //container principal que almacena a TODO el card
//             appendElementHtml(container_products, div_col);
//
//         })
//
//     }).catch( error => {
//         throw new Error(`${error.message}`);
//     });
//
//
//


