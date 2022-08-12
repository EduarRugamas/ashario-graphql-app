import {GetAllProducts, getAllProducts, GetAllRetailerIds} from '../utils/fetch_querys.js';

const container_products = document.getElementById('container-products');
const storage_local = window.localStorage;


window.addEventListener('DOMContentLoaded',
    async () => {
        GetAllRetailerIds();

        setTimeout(async () => {

            const store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centrepoint_Mall'));


            let data = await getAllProducts(store_centre_point_mall.id);
            console.table(data);
            console.log(data);

        }, 1000);

        const createCardItems = (products) => products.map(product => {
            `
            <div class="col">
            <div class="card rounded-0 product-card">
                        <a href="/views/product-details.html?id=${product.id}" id="container_carrousel_imgs">
                            <img src="${product.image !== "" ? product.image : '../assets/images/errors-images/image-not-found.jpeg'}" class="card-img-top" alt="${product.name}" id="imagen-product">
                        </a>
                    <div class="card-body">
                        <div class="product-info">
                            <a href="product-details.html?id=${product.id}">
                                <p class="product-catergory font-13 mb-1 itembrand">${product.brand.name}</p>
                                <!-- <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype">${(item.brand_subtype) === null || undefined ? '' : item.brand_subtype}</p> -->
                            </a>
                            <a href="product-details.html?id=${product.id}">
                                <h6 class="product-name mb-2 itemname">${product.name}</h6>
                            </a>
                            <div class="d-flex align-items-center">
                                <div class="mb-1 product-price itemprice jcitemprice">
                                    <span class="fs-5 currencyformat jcpriceformat">CAD </span>
                                    <span class="fs-5 jcpricingnw"></span>
                                    <span class="er-each jceachformat" style="align-items: flex-end;"></span>
                                </div>
                            </div>
                            <div class="product-action mt-2" id="content">
                               <div class="d-grid gap-2">
                                    <a class="btn btn-dark btn-ecomm" id="add_to_cart_btn"><i class="bx bxs-cart-add"></i>add to cart</a>
                                    <a href="/views/product-details.html?id=${product.id}" class="btn btn-light btn-ecomm">Product Details</a>
                               </div> 
                            </div> 
                        </div>
                    </div>
                </div>
        </div>
         `
        }).join('');


        function renderItems(Listproducts) {
            container_products.innerHTML = createCardItems(Listproducts);
        }


    });












