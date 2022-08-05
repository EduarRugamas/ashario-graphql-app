import {secret_key, public_key, url_base} from '../config/config.js';
import { createElementHtml, appendElementHtml } from './elements_html.js';
const local_storage = window.localStorage;

const container_products = document.getElementById('container-products');

const GetAllRetailerIds = () => {

    const query_retailer = `
    query GetRetailers {
        retailers {
           name,
           id,
           menuTypes,
           address 
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
        body: JSON.stringify({
            query: query_retailer
        })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log('0', data.data.retailers[0].name);
            console.log('1', data.data.retailers[1].name);
            console.log('2', data.data.retailers[2].name);
            console.log('3', data.data.retailers[3].name);
            console.log('4', data.data.retailers[4].name);

            if (local_storage.getItem('Ashario_Centrepoint_Mall') && local_storage.getItem('Ashario_North_York') && local_storage.getItem('Ashario_Aurora')) {
                console.log('ids de tiendas guardadas');
            } else {
                let store_Centrepoint_Mall = {
                    name: data.data.retailers[0].name,
                    id: data.data.retailers[0].id,
                    address: data.data.retailers[0].address,
                }

                let store_Ashario_North_York = {
                    name: data.data.retailers[1].name,
                    id: data.data.retailers[1].id,
                    address: data.data.retailers[1].address,
                }

                let store_Ashario_Aurora = {
                    name: data.data.retailers[2].name,
                    id: data.data.retailers[2].id,
                    address: data.data.retailers[2].address,
                }

                console.log('store --> ', store_Centrepoint_Mall);
                console.log('store --> ', store_Ashario_North_York);
                console.log('store --> ', store_Ashario_Aurora);


                local_storage.setItem('Ashario_Centrepoint_Mall', JSON.stringify(store_Centrepoint_Mall));
                local_storage.setItem('Ashario_North_York', JSON.stringify(store_Ashario_North_York));
                local_storage.setItem('Ashario_Aurora', JSON.stringify(store_Ashario_Aurora));
            }


            //    #1 Ashario_Centrepoint_Mall, #2 Ashario_North_York, #3 Ashario_Aurora

        })
        .catch(error => {
            console.log(error.message);
        })
};

const GetCountproduct = (retailerID) => {
    const query_count_products = `query GetCountProducts($retailerId: ID="${retailerID}" ) { menu(retailerId: $retailerId) {productsCount }}`;

    fetch(`${url_base}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + public_key,
        },
        body: JSON.stringify({
            query: query_count_products
        })
    }).then(response => response.json()).then(data => {
        console.log(data);
    })
}


const GetAllProducts = (retailerID) => {
    const query_all_products = `
    query GetAllProducts($retailerId: ID="${retailerID}" ) {
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
    `;

    fetch(`${url_base}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + public_key,
        },
        body: JSON.stringify({
            query: query_all_products
        })
    }).then(response => response.json())
        .then(data => {
            let result = data.data.menu.products;
            console.log(result);


            return result.map( info => {

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
                container_image.href=`/views/product-details.html?id=${info.id}`;
                let image = createElementHtml('img');
                image.className='card-img-top';
                image.id='imagen-product';
                image.src=`${info.image !== null ? info.image : '../assets/images/errors-images/image-not-found.jpeg'}`;
                image.alt=`${info.name}`;

                let link_a_item_brand = createElementHtml('a');
                link_a_item_brand.href=`/views/product-details.html?id=${info.id}`;
                let etiqueta_p_item_brand = createElementHtml('p');
                etiqueta_p_item_brand.className='product-catergory font-13 mb-1 itembrand';
                let etiqueta_p_item_brand_sub_type = createElementHtml('p');
                etiqueta_p_item_brand_sub_type.className='product-catergory font-13 mb-1 itemsubtype';
                etiqueta_p_item_brand_sub_type.id='itemsubtype';

                let etiqueta_a_link_item_name = createElementHtml('a');
                etiqueta_a_link_item_name.href=`/views/product-details.html?id=${info.id}`;
                let etiqueta_h6_item_name = createElementHtml('h6');
                etiqueta_h6_item_name.className='product-name mb-2 itemname';
                etiqueta_h6_item_name.textContent=`${info.name}`;

                let div_container_info_price = createElementHtml('div');
                div_container_info_price.className='d-flex align-items-center';
                let div_container_span = createElementHtml('div');
                div_container_span.className='mb-1 product-price itemprice jcitemprice';
                let span_text_cad = createElementHtml('span');
                span_text_cad.className='fs-5 currencyformat jcpriceformat';
                span_text_cad.textContent='CAD ';
                let span_text_price = createElementHtml('span');
                span_text_price.className='fs-5 jcpricingnw';
                span_text_price.textContent=`${info.variants[0].priceMed}`;
                let span_text_weights = createElementHtml('span');
                span_text_weights.className='er-each jceachformat';
                span_text_weights.textContent=`/${info.variants[0].option}`;

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
                btn_product_details.href=`/views/product-details.html?id=${info.id}`;
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


        }).catch(error => console.log(error.message));

}

const GetProduct = (retailerID, id_product) => {
    const query_product = `
        query GetProduct ($retailerId: ID="${retailerID}", $productId: ID="${id_product}") {
          product(retailerId: $retailerId, id: $productId ) {
            id
            name,
            description,
            image,
            images{
              url
            },
            posId,
            potencyCbd {
              formatted,
              unit,
              range
            },
            potencyThc {
              formatted,
              range,
              unit
            },
            strainType,
            category,
            brand {
              name,
              id
            }
          }
        }
    `;
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + public_key,
    }

    const response = axios({
        url: url_base,
        method: 'POST',
        headers,
        data: query_product
    });

    console.log(response.data);
    console.log(response.errors);

}



export {
    GetAllRetailerIds,
    GetAllProducts,
    GetProduct,
}


// <div class="col">
//     <div class="card rounded-0 product-card">
//         <div class="card-body">
//             <div classe="product-info">
//                 <a href="product-details.html?objectID=">
//                     <p class="product-catergory font-13 mb-1 itembrand"></p>
//                     <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype"></p>
//                 </a>
//                 <a href="product-details.html?objectID=">
//                     <h6 class="product-name mb-2 itemname">${item.name}</h6>
//                 </a>
//                 <div class="d-flex align-items-center">
//                     <div class="mb-1 product-price itemprice jcitemprice">
//                         <span class="fs-5 currencyformat jcpriceformat">CAD </span>
//                         <span class="fs-5 jcpricingnw"></span>
//                         <span class="er-each jceachformat" style="align-items: flex-end;"></span>
//                     </div>
//                 </div>
//
//
//
//
//                 <div class="product-action mt-2" id="content">
//                     <div class="d-grid gap-2">
//                         <a class="btn btn-dark btn-ecomm" id="add_to_cart_btn"><i class="bx bxs-cart-add"></i>add
//                             to cart</a>
//                         <a href="/views/product-details.html?objectID=" class="btn btn-light btn-ecomm">Product Details</a>
//                     </div>
//                 </div>
//
//
//
//
//             </div>
//         </div>
//     </div>
// </div>
