'use strict';
import {getProduct, addItemCart, get_products_carrousel, getAllProducts} from '../utils/querys.js';
import {appendElementHtml, createElementHtml} from "../utils/elements_html.js";
const urlParams = new URLSearchParams(window.location.search);
const storage_local = window.localStorage;
const id_store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centre_point_Mall'));
const checkoutId = JSON.parse(storage_local.getItem('cart_centre_point_mall'));
const id_product = urlParams.get('id');
const container_product_details = document.getElementById('product-details');
const container_products_carrousel = document.querySelector('.owl-carousel');
const title_product = document.getElementById('title_name_product_details');
const btn_cart_link = document.querySelector('#btn_cart');
const icon_cart_count = document.querySelector('.alert-count');

const mini_cart_items = document.getElementById('content_items_list_mini_cart');
const view_items_mini_cart = document.getElementById('items_in_mini_cart');
let count = 0;
let cart = {};

const product = getProduct(id_store_centre_point_mall.id, id_product);
const get_carrousel = get_products_carrousel(id_store_centre_point_mall.id, 'FLOWER', 0, 20);

product.then( (item) => {
    const url_retorno = checkoutId.redirectUrl;

    console.log(checkoutId);
    console.log(item);

    if (storage_local.getItem('count')){
        count = parseInt( storage_local.getItem('count') );
    }

    if (storage_local.getItem('cart')) {
        cart = JSON.parse(storage_local.getItem('cart'));
    }


    title_product.textContent=`${item.name}`;
    renderProduct(container_product_details, item);
    update_icon_cart();
}).catch(error => {
    console.log('Error en product details --> ', error);
});

get_carrousel.then( response => {


    render_carousel(container_products_carrousel, response.products);
    if ($('.similar-products').length) {
        let viewedSlider = $('.similar-products');

        viewedSlider.owlCarousel(
            {
                loop: true,
                margin: 30,
                autoplay: true,
                autoplayTimeout: 3000,
                nav: false,
                dots: true,
                responsive:{
                    0:{
                        items:1
                    },
                    576:{
                        items:2
                    },
                    768:{
                        items:3
                    },
                    1366:{
                        items:4
                    },
                    1400:{
                        items:5
                    }
                },
            });

    }



}).catch(error => console.log(error));


const renderProduct = (container, informatio_product) => {

    let item_product = '';

    item_product+= `
       <!--start product detail-->
       <section class="py-4">
            <div class="container">
                <div class="product-detail-card">
                    <div class="product-detail-body">
                        <div class="row g-0">
                            <div class="col-12 col-lg-5">
                                <div class="image-zoom-section">
                                    <div class="product-gallery owl-carousel owl-theme border mb-3 p-3 owl-loaded owl-drag">
                                        <div class="owl-stage-outer">
                                            <div class="owl-item" style="width: 400px; align-items: center; object-fit: cover;">
                                                <div class="item">
                                                    <img src="" alt="" class="img-fluid" id="imagen_carusel">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="selector-imgs-products" style="" class="border mb-2 p-2"></div>
                                </div>                                
                            </div>
                            <div class="col-12 col-lg-7">
                                <div class="product-info-section p-3">
                                        <div class="badge bg-badge-black mb-2">
                                            <p style="text-transform: uppercase;" class="m-1 align-content-center font-14">${informatio_product.category}</p>
                                        </div>
                                        <h3 class="mt-4 mt-lg-0 mb-0">${informatio_product.name}</h3>
                                        <div class="d-inline-block mt-2" >
                                            <p class="badge bg-badge-black font-13 ">${informatio_product.brand.name}</p>
                                            <p class="badge bg-badge-black font-13" id="item_sub_type"></p> 
                                        </div>
                                        
                                        <div class="d-flex align-items-center">
                                            <div class="mb-1 product-price itemprice jcitemprice">
                                                <span class="fs-5 currencyformat jcpriceformat">CAD</span>
                                                <span class="fs-5 jcpricingnw" id="text_price"></span>
                                                <span class="er-each jceachformat" id="text_weights_format"></span>
                                            </div>
                                        </div>
                                        <div class="mt-3">
                                            <h6>Details:</h6>
                                            <dl class="row mt-3" id="container-details-dl">
                                                <dt class="col-sm-3">Strain</dt>
                                                <dd class="col-sm-9 badge_strain"></dd>
                                            </dl>
                                            <div class="d-flex" id="content_effects" style="margin-top: -10px; margin-bottom: 20px;"></div>
                                            <h6>Description:</h6>
                                             <p class="mb-0">${informatio_product.description}</p>
                                        </div>
                                        <div class="row row-cols-auto align-items-center mt-3">
                                            <div class="col" id="container_quantity">
                                                <label class="form-label">Quantity</label>
                                                <select class="form-select form-select-sm" id="quantity"></select>
                                            </div>
                                            <div class="col" id="container_weight">
                                                <label class="form-label">weight</label>
                                                <select class="form-select form-select-sm" id="select-weight"></select>
                                            </div>
                                        </div>
                                        <div class="d-flex gap-2 mt-3">
                                            <button type="submit" class="btn btn-dark btn-ecomm" id="add-to-cart"><i class="bx bxs-cart-add"></i>Add to Cart</button>
                                        </div>
                                        <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </section>
    
    `;
    container.innerHTML = item_product;

    renderSelectedImages(informatio_product.images);
    renderPotency_CBD_THC('container-details-dl', informatio_product.potencyThc, informatio_product.potencyCbd);
    renderBadgeEffects('content_effects', informatio_product.effects);
    renderBadgeStant(informatio_product.strainType);
    renderQuantityWeight(informatio_product.variants, 'quantity', 'select-weight', 'text_price', 'text_weights_format');
    update_icon_cart();
    mini_cart_render(informatio_product)

    const btn_add_cart = document.getElementById('add-to-cart');
    btn_add_cart.addEventListener('click', () => {
        // render_add_item_cart(id_store_centre_point_mall, checkoutId, id_product, 'quantity', 'select-weight');
    });
};
const renderSelectedImages = (array_images) => {
    const images = array_images;
    let $container_img = document.querySelector('#imagen_carusel');
    let miniatura_img = document.querySelector('#selector-imgs-products');

    if (images.length === 0 ){
        $container_img.src = '../assets/images/errors-images/image-not-found.jpeg';
        miniatura_img.style='display: none;';
    }else {
        images.forEach( (miniatura,  index) => {
            let img_miniatura = document.createElement('img');
            img_miniatura.id='images_miniaturas';
            img_miniatura.className='border p-1';
            if (index === 0) {
                img_miniatura.className='active_item';
                $container_img.src=`${miniatura.url}`;
            }
            img_miniatura.src=`${miniatura.url}`;
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
};
const renderPotency_CBD_THC = (container_dl_id, potency_thc, potency_cbd) => {

    const container_dl = document.getElementById(`${container_dl_id}`)

    // area de potency thc y cbd
    if (potency_thc.hasOwnProperty('formatted') !== null) {
        let dt_potency_thc = createElementHtml('dt');
        dt_potency_thc.className='col-sm-3';
        dt_potency_thc.textContent='THC';
        let dd_potency_thc = createElementHtml('dd');
        dd_potency_thc.className='col-sm-9';
        dd_potency_thc.textContent=`${potency_thc.formatted}`;
        appendElementHtml(container_dl, dt_potency_thc);
        appendElementHtml(container_dl, dd_potency_thc);

    }

    if (potency_cbd.hasOwnProperty('formatted') !== null){
        let dt_potency_cbd = createElementHtml('dt');
        dt_potency_cbd.className='col-sm-3';
        dt_potency_cbd.textContent='CBD';
        let dd_potency_cbd = createElementHtml('dd');
        dd_potency_cbd.className='col-sm-9';
        dd_potency_cbd.textContent=`${potency_cbd.formatted}`;
        appendElementHtml(container_dl, dt_potency_cbd);
        appendElementHtml(container_dl, dd_potency_cbd);
    }
//     //fin de area thc and cbd
};
const renderQuantityWeight = (variants, id_select_quantity, id_select_weight, content_id_text_price, content_id_text_format_weight) => {
    const container_select_quantity = document.querySelector(`#${id_select_quantity}`);
    let container_select_weight = document.querySelector(`#${id_select_weight}`);
    let h4_price_string = document.getElementById(`${content_id_text_price}`);
    let text_weight_format = document.getElementById(`${content_id_text_format_weight}`);
    // let h4_price_string = document.getElementById('text_price');
    // let text_weight_format = document.getElementById('text_weights_format');

    if (variants === undefined || 0) {
        container_select_quantity.style = 'display: none;';
        container_select_weight.style = 'display: none;';
        console.log('No hay weights disponibles')
    }

    for (let i of variants) {
        console.log('weight: ', i.option);
        const options = createElementHtml('option');
        options.value = i.option;
        options.text = i.option;
        appendElementHtml(container_select_weight, options);
    }

    let get_seleted_value_weight = document.getElementById(`${id_select_weight}`).value;
    console.log(get_seleted_value_weight);

    if (get_seleted_value_weight === '3.5g') {
        const get_variant_35 = variants.find(item => item.option === get_seleted_value_weight);
        console.log('encontro la variante 3.5g', get_variant_35);
        h4_price_string.textContent=`$${get_variant_35.priceRec}`;
        text_weight_format.textContent='/3.5G';
        for (let quantity_select = 1; quantity_select <= get_variant_35.quantity; quantity_select++) {
            console.log(quantity_select);
            container_select_quantity.add(new Option(quantity_select, quantity_select) );
        }
    }else if (get_seleted_value_weight === '28g') {
        const get_variant_28 = variants.find(item => item.option === get_seleted_value_weight);
        console.log('encontro la variante 28g', get_variant_28);
        h4_price_string.textContent=`$${get_variant_28.priceRec}`;
        text_weight_format.textContent='/28G';
        for (let quantity_select = 1; quantity_select <= get_variant_28.quantity; quantity_select++) {
            console.log(quantity_select);
            container_select_quantity.add(new Option(quantity_select, quantity_select) );
        }
    }else if (get_seleted_value_weight === '1g') {
        const get_variant_1 = variants.find(item => item.option === get_seleted_value_weight);
        console.log('encontro la variante 1g', get_variant_1);
        h4_price_string.textContent=`$${get_variant_1.priceRec}`;
        text_weight_format.textContent='/1G';
        for (let quantity_select = 1; quantity_select <= get_variant_1.quantity; quantity_select++) {
            console.log(quantity_select);
            container_select_quantity.add(new Option(quantity_select, quantity_select) );
        }
    }else if (get_seleted_value_weight === '7g') {
        const get_variant_7 = variants.find(item => item.option === get_seleted_value_weight);
        console.log('encontro la variante 7g', get_variant_7);
        h4_price_string.textContent=`$${get_variant_7.priceRec}`;
        text_weight_format.textContent='/7G';
        for (let quantity_select = 1; quantity_select <= get_variant_7.quantity; quantity_select++) {
            console.log(quantity_select);
            container_select_quantity.add(new Option(quantity_select, quantity_select) );
        }
    }else if (get_seleted_value_weight === '14g') {
        const get_variant_14 = variants.find(item => item.option === get_seleted_value_weight);
        console.log('encontro la variante 14g', get_variant_14);
        h4_price_string.textContent=`$${get_variant_14.priceRec}`;
        text_weight_format.textContent='/14G';
        for (let quantity_select = 1; quantity_select <= get_variant_14.quantity; quantity_select++) {
            container_select_quantity.add(new Option(quantity_select, quantity_select) );
        }
    }

    //value change weights
    container_select_weight.addEventListener('change', () => {
        let get_change_weight = document.getElementById(`${id_select_weight}`).value;
        console.log('El valor cambio a ',get_change_weight);

        if (get_change_weight === '3.5g') {
            const get_variant_35 = variants.find(item => item.option === get_change_weight);
            console.log('encontro la variante 3.5g', get_variant_35);

            h4_price_string.textContent=`$${get_variant_35.priceRec}`;
            text_weight_format.textContent='/3.5G';

            if (container_select_quantity.length) {
                for (let i = container_select_quantity.length; i >= 0; i--) {
                    container_select_quantity.remove(i);
                }
            }

            for (let quantity_select = 1; quantity_select <= get_variant_35.quantity; quantity_select++) {
                console.log(quantity_select);
                container_select_quantity.add(new Option(quantity_select, quantity_select) );

            }
            container_select_quantity.selectedIndex = 0;
        }else if (get_change_weight === '28g') {
            const get_variant_28 = variants.find(item => item.option === get_change_weight);
            console.log('encontro la variante 28g', get_variant_28);

            h4_price_string.textContent=`$${get_variant_28.priceRec}`;
            text_weight_format.textContent='/28G';

            if (container_select_quantity.length) {
                for (let i = container_select_quantity.length; i >= 0; i--) {
                    container_select_quantity.remove(i);
                }
            }
            for (let quantity_select = 1; quantity_select <= get_variant_28.quantity; quantity_select++) {
                console.log(quantity_select);
                container_select_quantity.add(new Option(quantity_select, quantity_select) );
            }
        }else if (get_change_weight === '1g') {
            const get_variant_1 = variants.find(item => item.option === get_change_weight);
            console.log('encontro la variante 1g', get_variant_1);

            h4_price_string.textContent=`$${get_variant_1.priceRec}`;
            text_weight_format.textContent='/1G';

            if (container_select_quantity.length) {
                for (let i = container_select_quantity.length; i >= 0; i--) {
                    container_select_quantity.remove(i);
                }
            }
            for (let quantity_select = 1; quantity_select <= get_variant_1.quantity; quantity_select++) {
                console.log(quantity_select);
                container_select_quantity.add(new Option(quantity_select, quantity_select) );
            }
        }else if (get_change_weight === '7g') {
            const get_variant_7 = variants.find(item => item.option === get_change_weight);
            console.log('encontro la variante 7g', get_variant_7);

            h4_price_string.textContent=`$${get_variant_7.priceRec}`;
            text_weight_format.textContent='/7G';

            if (container_select_quantity.length) {
                for (let i = container_select_quantity.length; i >= 0; i--) {
                    container_select_quantity.remove(i);
                }
            }
            for (let quantity_select = 1; quantity_select <= get_variant_7.quantity; quantity_select++) {
                console.log(quantity_select);
                container_select_quantity.add(new Option(quantity_select, quantity_select) );
            }
        }else if (get_change_weight === '14g') {
            const get_variant_14 = variants.find(item => item.option === get_change_weight);
            console.log('encontro la variante 14g', get_variant_14);

            h4_price_string.textContent=`$${get_variant_14.priceRec}`;
            text_weight_format.textContent='/G';

            if (container_select_quantity.length) {
                for (let i = container_select_quantity.length; i >= 0; i--) {
                    container_select_quantity.remove(i);
                }
            }
            for (let quantity_select = 1; quantity_select <= get_variant_14.quantity; quantity_select++) {
                console.log(quantity_select);
                container_select_quantity.add(new Option(quantity_select, quantity_select) );
            }
        }


    });

    container_select_quantity.addEventListener('change', () => {
        let get_change_quantity = parseInt(document.getElementById(`${id_select_quantity}`).value);
        let get_value_weight = document.getElementById(`${id_select_weight}`).value;
        let h4_price_replace = document.getElementById(`${content_id_text_price}`);

        if (get_value_weight === '3.5g') {
            const get_price_35 = variants.find(item => item.option === get_value_weight);
            let price_3_5_int = get_price_35.priceRec;
            console.log(price_3_5_int);
            let price_35_string = (price_3_5_int * get_change_quantity).toFixed(2);
            h4_price_replace.textContent=`$${price_35_string}`;
        }else if (get_value_weight === '28g') {
            const get_price_28 = variants.find(item => item.option === get_value_weight);
            let price_28_int = get_price_28.priceRec;
            console.log(price_28_int);
            let price_28_string = (price_28_int * get_change_quantity).toFixed(2);
            h4_price_replace.textContent=`$${price_28_string}`;
        }else if (get_value_weight === '1g') {
            const get_price_1 = variants.find(item => item.option === get_value_weight);
            let price_1_int = get_price_1.priceRec;
            console.log(price_1_int);
            let price_1_string = (price_1_int * get_change_quantity).toFixed(2);
            h4_price_replace.textContent=`$${price_1_string}`;
        }else if (get_value_weight === '7g') {
            const get_price_7 = variants.find(item => item.option === get_value_weight);
            let price_7_int = get_price_7.priceRec;
            console.log(get_price_7);
            let price_7_string = (price_7_int * get_change_quantity).toFixed(2);
            h4_price_replace.textContent=`$${price_7_string}`;
        }else if (get_value_weight === '14g') {
            const get_price_14 = variants.find(item => item.option === get_value_weight);
            let price_14_int = get_price_14.priceRec;
            console.log(price_14_int);
            let price_14_string = (price_14_int * get_change_quantity).toFixed(2);
            h4_price_replace.textContent=`$${price_14_string}`;

        }

    });




};
const renderBadgeEffects = (id_content_effects, effets) => {
    const div_content_effects = document.getElementById(`${id_content_effects}`);
    let html_badge = '';
    effets.forEach( item => {
        html_badge+= `
            <span class="badge rounded-pill bg-badge-effects" style="padding: 10px; margin-right: 5px;">
            <i class='bx bxs-badge-check' style="color:#ffffff;"></i>
            ${item}
            </span>
        `;
        div_content_effects.innerHTML = html_badge;
    });


};
const renderBadgeStant = (strantType) => {
        const div_content_strainType = document.querySelector('.badge_strain');
        let badge_strainType = '';

        if (strantType === "SATIVA") {
            badge_strainType+= `
                <div class="badge bg-badge-strainType-sativa font-13">
                    Uplift (SATIVA)
                </div>
            `;
            div_content_strainType.innerHTML = badge_strainType;
        }else if (strantType === "INDICA") {
            badge_strainType+= `
                <div class="badge bg-badge-strainType-indica font-13">
                    Unwind (INDICA)
                </div>
            `;
            div_content_strainType.innerHTML = badge_strainType;
        }else if (strantType === "HYBRID") {
            badge_strainType+= `
                <div class="badge bg-badge-strainType-hybrid font-13">
                    Connect (HYBRID/BLEND)
                </div>
            `;
            div_content_strainType.innerHTML = badge_strainType;
        }else if (strantType === "HIGH_CBD") {
            badge_strainType+= `
                <div class="badge bg-badge-strainType-high-cbd font-13">
                    Renew (HIGH CBD)
                </div>
            `;
            div_content_strainType.innerHTML = badge_strainType;
        }

    // <div className="badge bg-badge-strant font-13 badge_strant">
    //     ${informatio_product.strainType}
    // </div>

};
const render_add_item_cart = (store_id, cart_id, product_id, id_select_quantity, id_select_weight) => {

            const id_cart = cart_id.id;
            const id_store = store_id.id;
            const id_product = product_id;
            const quantity = parseInt(document.getElementById(`${id_select_quantity}`).value);
            const option = document.getElementById(`${id_select_weight}`).value;
            console.log(`${id_store}, ${id_cart}, ${id_product}, quantity:${quantity}, option: ${option}`);
            addItemCart(id_store, id_cart, id_product, quantity, option).then( result => {

                console.log(result);

                if (result.data.addItem === null ) {
                    const error = result.errors[0];
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        text: `Sorry! You've reached the 30g purchase limit for cannabis due to provincial regulations.`,
                        confirmButtonColor: '#000000',
                    });
                }

               const results = result.data.addItem.items;

               let card_view_product = results.find(item => item.productId === id_product);

                count++;
                update_icon_cart();

               Swal.fire({
                   title: 'Added to cart!',
                   text: `${card_view_product.product.name}`,
                   imageUrl: `${card_view_product.product.image}`,
                   imageWidth: 250,
                   imageHeight: 300,
                   imageAlt: `${card_view_product.product.name}`,
               });




           }).catch(error => {
                console.log('Error al agregar al carrito --> ', error.message);
                // Swal.fire({
                //     icon: 'error',
                //     text: `${results.message}`,
                // });
           });


};
const render_carousel = (container, array_products) => {
    let items_carousel = '';

    array_products.forEach( item => {
        items_carousel+=`
            <div class="item">
                <div class="card rounded-0 product-card">
                    <img src="${item.image !== undefined || 0 ? item.image : '../assets/images/errors-images/image-not-found.jpeg'}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <div class="product-info">
                            <a href="/views/product-details.html?id=${product.id}">
                                <p class="product-catergory font-13 mb-1">${item.brand.name}</p>
                            </a>
                            <a href="/views/product-details.html?id=${product.id}">
                                <h6 class="product-name mb-2">${item.name}</h6>
                            </a>
                            <div class="product-action mt-2">
                                <div class="d-grid gap-2">
                                    <a href="/views/product-details.html?id=${product.id}" class="btn btn-light btn-ecomm text-uppercase">Product details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // justo debajo de item.name etiqueta <a></a>
    // <div className="d-flex align-items-center">
    //     <div className="mb-1 product-price"><span className="me-1 text-decoration-line-through">$99.00</span>
    //         <span className="fs-5">$49.00</span>
    //     </div>
    //     <div className="cursor-pointer ms-auto"><span>5.0</span> <i className="bx bxs-star text-white"></i>
    //     </div>
    // </div>
    // <div className="card">
    //     <img src="${item.image !== undefined || 0 ? item.image : '../assets/images/errors-images/image-not-found.jpeg'}"
    //          className="card-img-top" alt="${item.name}" id="img_carousel">
    //         <div className="card-body">
    //             <h5 className="card-title">${item.name}</h5>
    //         </div>
    //         <div className="card-footer">
    //             <small className="text-muted">Product details</small>
    //         </div>
    // </div>

    container.innerHTML = items_carousel;

};
const update_icon_cart = () => {
    icon_cart_count.textContent = count;
    storage_local.setItem('count', count);
};
const mini_cart_render = () => {
    let template_item_mini_cart = '';

    if (storage_local.getItem('count')) {
        count = parseInt(storage_local.getItem('count'));
    }

    console.log(cart);

    const all_products = getAllProducts(id_store_centre_point_mall.id, 0, 489);
    console.log(all_products.products)

    for (let product in cart) {

        console.log(product);

        // let information_product = array_products.find(item => item.id === cart[product].product_id);
        // console.log(information_product);

        //revisar la busqueda de los productos imprime los que hay en el local storage pero hay que hacer
        // la busqueda de cada id de el producto manualmennte ya que solo se recive la informacion de uno unicamente del
        // que se esta en la pagina de product details.

        // let information_product = array_products.find(item => item.id === cart[product].product_id);

        // template_item_mini_cart += `
        //     <a class="dropdown-item" href="javascript:;">
        //         <div class="d-flex align-items-center">
        //             <div class="flex-grow-1">
        //                 <h6 class="cart-product-title">${information_product.name}</h6>
        //                 <p class="cart-product-price">$${information_product.variants[0].priceRec}</p>
        //             </div>
        //             <div class="position-relative">
        //                 <div class="cart-product-cancel position-absolute" product_id="${information_product.id}" id="btn_remove_item">
        //                     <i class='bx bx-x'></i>
        //                 </div>
        //                 <div class="cart-product">
        //                     <img src="${information_product.image}" class="" alt="product image">
        //                 </div>
        //             </div>
        //         </div>
        //     </a>
        //     `;
        //
        // mini_cart_items.innerHTML = template_item_mini_cart;
    }

    view_items_mini_cart.textContent= `${count} ITEMS`;

    const btn_remove_product_item = document.querySelectorAll('#btn_remove_item');

    btn_remove_product_item.forEach(btn_remove => {
        btn_remove.addEventListener('click', () => {
            let product_id_remove = btn_remove.getAttribute('product_id');
            console.log(product_id_remove);

            delete cart[product_id_remove];
            storage_local.setItem('cart', JSON.stringify(cart));
            count--;
            update_icon_cart();

        });
    });

    // btn_remove_product_item.addEventListener('click', () => {
    //    const product_id_remove =  btn_remove_product_item.getAttribute('product_id');
    //    console.log(product_id_remove);
    // });




};

