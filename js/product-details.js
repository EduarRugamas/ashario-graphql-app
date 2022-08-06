import {GetProduct} from '../utils/fetch_querys.js';
const urlParams = new URLSearchParams(window.location.search);
const storage_local = window.localStorage;
const id_store_centre_point_mall = JSON.parse(storage_local.getItem('Ashario_Centrepoint_Mall'));
const id_product = urlParams.get('id');
const container_product_details = document.getElementById('product-details');

console.log('aqui el id', id_product);

GetProduct(id_store_centre_point_mall.id, id_product).then( item => {

    container_product_details.innerHTML=`
    
    <section class="py-3 border-bottom border-top d-md-flex bg-light jcbreadcrumb">
    <div class="container">
        <div class="page-breadcrumb d-flex align-items-center">
            <a href="../index.html" class="nav-link position-relative cart-link">
                <i class='bx bx-chevron-left bx-lg' style="color: #000000; "></i>
            </a>

            <h3 class="breadcrumb-title pe-3">${item.name}</h3>
            <div class="col-4 col-md-auto order-2 order-md-4 ms-auto">
                <div class="top-cart-icons float-start">
                    <nav class="navbar navbar-expand">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a href="/views/shop-cart.html" class="nav-link position-relative cart-link">
                                    <span class="alert-count" id="count_quantity_cart">0</span>
                                    <i class="bx bx-shopping-bag"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</section>
<!--end breadcrumb-->
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
                                    <div class="owl-item"
                                         style="width: 400px; align-items: center; object-fit: cover;">
                                        <div class="item">
                                            <img src="" alt="" class="img-fluid" id="imagen_carusel">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="selector-imgs-products" style="" class="border mb-2 p-2">
                                <!-- <img src="${hits[0].image_urls[0]}" alt="" style="margin-right: 25px;" class="border p-1"> -->
                                <!-- <img src="${hits[0].image_urls[1]}" alt="" class="border p-1"> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-7">
                        <div class="product-info-section p-3">
                            <div class="badge bg-badge-category mb-2">
                                <p style="text-transform: uppercase;"
                                   class="m-1 align-content-center font-14">${hits[0].type}</p>
                            </div>
                            <h3 class="mt-4 mt-lg-0 mb-0">${item.name}</h3>
                            <div class="d-inline-block mt-2">
                                <p class="badge bg-success font-13 ">${hits[0].brand}</p>
                                <p class="badge bg-success font-13" id="item_sub_type"></p>
                            </div>

                            <div class="d-flex align-items-center">
                                <div class="mb-1 product-price itemprice jcitemprice">
                                    <span class="fs-5 currencyformat jcpriceformat">CAD</span>
                                    <span class="fs-5 jcpricingnw" id="text_price"></span>
                                    <span class="er-each jceachformat" id="text_weights_format"></span>
                                </div>
                            </div>
                            <!--<div class="d-flex align-items-center mt-0 gap-2" id="text_price"></div>-->
                            <div class="mt-3">
                                <h6>Details:</h6>
                                <dl class="row mt-3" id="container-details-dl">
                                    <dt class="col-sm-3">Product id</dt>
                                    <dd class="col-sm-9"># ${item.id}</dd>
                                </dl>
                                <!--<p class="mb-0">${hits[0].description}</p>-->

                                <h6>Description:</h6>
                                <p class="mb-0">${item.description}</p>
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
                                <!--                                            <a href="" class="btn btn-white btn-ecomm" id="add-to-cart"><i class="bx bxs-cart-add"></i>Add to Cart</a>-->
                                <button type="submit" class="btn btn-dark btn-ecomm" id="add-to-cart"><i
                                    class="bx bxs-cart-add"></i>Add to Cart
                                </button>
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


}).catch(error => console.log(error.message));

// <section className="py-3 border-bottom border-top d-md-flex bg-light jcbreadcrumb">
//     <div className="container">
//         <div className="page-breadcrumb d-flex align-items-center">
//             <a href="../index.html" className="nav-link position-relative cart-link">
//                 <i className='bx bx-chevron-left bx-lg' style="color: #000000; "></i>
//             </a>
//
//             <h3 className="breadcrumb-title pe-3">${hits[0].name}</h3>
//             <div className="col-4 col-md-auto order-2 order-md-4 ms-auto">
//                 <div className="top-cart-icons float-start">
//                     <nav className="navbar navbar-expand">
//                         <ul className="navbar-nav ms-auto">
//                             <li className="nav-item">
//                                 <a href="/views/shop-cart.html" className="nav-link position-relative cart-link">
//                                     <span className="alert-count" id="count_quantity_cart">0</span>
//                                     <i className="bx bx-shopping-bag"></i>
//                                 </a>
//                             </li>
//                         </ul>
//                     </nav>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>
// <!--end breadcrumb-->
// <!--start product detail-->
// <section className="py-4">
//     <div className="container">
//         <div className="product-detail-card">
//             <div className="product-detail-body">
//                 <div className="row g-0">
//                     <div className="col-12 col-lg-5">
//                         <div className="image-zoom-section">
//                             <div className="product-gallery owl-carousel owl-theme border mb-3 p-3 owl-loaded owl-drag">
//                                 <div className="owl-stage-outer">
//                                     <div className="owl-item"
//                                          style="width: 400px; align-items: center; object-fit: cover;">
//                                         <div className="item">
//                                             <img src="" alt="" className="img-fluid" id="imagen_carusel">
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div id="selector-imgs-products" style="" className="border mb-2 p-2">
//                                 <!-- <img src="${hits[0].image_urls[0]}" alt="" style="margin-right: 25px;" class="border p-1"> -->
//                                 <!-- <img src="${hits[0].image_urls[1]}" alt="" class="border p-1"> -->
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-7">
//                         <div className="product-info-section p-3">
//                             <div className="badge bg-badge-category mb-2">
//                                 <p style="text-transform: uppercase;"
//                                    className="m-1 align-content-center font-14">${hits[0].type}</p>
//                             </div>
//                             <h3 className="mt-4 mt-lg-0 mb-0">${hits[0].name}</h3>
//                             <div className="d-inline-block mt-2">
//                                 <p className="badge bg-success font-13 ">${hits[0].brand}</p>
//                                 <p className="badge bg-success font-13" id="item_sub_type"></p>
//                             </div>
//
//                             <div className="d-flex align-items-center">
//                                 <div className="mb-1 product-price itemprice jcitemprice">
//                                     <span className="fs-5 currencyformat jcpriceformat">CAD</span>
//                                     <span className="fs-5 jcpricingnw" id="text_price"></span>
//                                     <span className="er-each jceachformat" id="text_weights_format"></span>
//                                 </div>
//                             </div>
//                             <!--<div class="d-flex align-items-center mt-0 gap-2" id="text_price"></div>-->
//                             <div className="mt-3">
//                                 <h6>Details:</h6>
//                                 <dl className="row mt-3" id="container-details-dl">
//                                     <dt className="col-sm-3">Product id</dt>
//                                     <dd className="col-sm-9"># ${hits[0].product_id}</dd>
//                                 </dl>
//                                 <!--<p class="mb-0">${hits[0].description}</p>-->
//
//                                 <h6>Description:</h6>
//                                 <p className="mb-0">${hits[0]._highlightResult.store_notes.value}</p>
//                             </div>
//                             <div className="row row-cols-auto align-items-center mt-3">
//                                 <div className="col" id="container_quantity">
//                                     <label className="form-label">Quantity</label>
//                                     <select className="form-select form-select-sm" id="quantity"></select>
//                                 </div>
//                                 <div className="col" id="container_weight">
//                                     <label className="form-label">weight</label>
//                                     <select className="form-select form-select-sm" id="select-weight"></select>
//                                 </div>
//                             </div>
//                             <div className="d-flex gap-2 mt-3">
//                                 <!--                                            <a href="" class="btn btn-white btn-ecomm" id="add-to-cart"><i class="bx bxs-cart-add"></i>Add to Cart</a>-->
//                                 <button type="submit" className="btn btn-dark btn-ecomm" id="add-to-cart"><i
//                                     className="bx bxs-cart-add"></i>Add to Cart
//                                 </button>
//                             </div>
//                             <hr/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>
