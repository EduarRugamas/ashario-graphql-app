import {public_key, secret_key, url_base} from '../config/config.js';

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + secret_key,
};


// const GetAllRetailerIds = () => {
//
//     const query_retailers = `
//     query GetRetailers {
//         retailers {
//            name,
//            id,
//            menuTypes,
//            address
//         }
//     }
//     `
//     fetch(`${url_base}`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization": "Bearer " + secret_key,
//         },
//         body: JSON.stringify({
//             query: query_retailers
//         })
//     }).then( (response) => {
//         if (response.ok) {
//             return response.json();
//         }
//     })
//     .then( (retailers) => {
//         console.log(retailers)
//
//         const array = retailers.data.retailers;
//
//         array.find( item => {
//             if (item.name === 'Ashario - Centrepoint Mall') {
//                 let store_centre_point_mall = {
//                     name: item.name,
//                     id: item.id,
//                     menuTypes: item.menuTypes,
//                     address: item.address
//                 }
//
//                 console.log(item);
//
//                 local_storage.setItem('Ashario_Centrepoint_Mall', JSON.stringify(store_centre_point_mall));
//                 console.log('se guardo en el local storage');
//             }
//
//             if (item.name === 'Ashario - Aurora') {
//                 let store_aurora = {
//                     name: item.name,
//                     id: item.id,
//                     menuTypes: item.menuTypes,
//                     address: item.address
//                 }
//
//                 console.log(item);
//
//                 local_storage.setItem('Ashario_Aurora', JSON.stringify(store_aurora));
//                 console.log('se guardo en el local storage');
//             }
//
//             if (item.name === 'Ashario - North York') {
//                 let store_north_york = {
//                     name: item.name,
//                     id: item.id,
//                     menuTypes: item.menuTypes,
//                     address: item.address
//                 }
//
//                 console.log(item);
//
//                 local_storage.setItem('Ashario_North_York', JSON.stringify(store_north_york));
//                 console.log('se guardo en el local storage');
//             }
//         });
//
//     })
//     .catch(error => console.log(error.message));
// };


const getRetailersIds = async () => {
    const query_retailers = `
    query GetRetailers {
        retailers {
           name,
           id,
           menuTypes,
           address 
        }
    }`;

    return await new Promise( (resolve, reject) => {
        fetch(`${url_base}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({query: query_retailers})
        }).then(response => response.json()).then(result => resolve(result.data.retailers)).catch(error => reject(error));
    });
}

const get_count_product = async (retailerID) => {
    const query_count_products = `query GetCountProducts($retailerId: ID="${retailerID}" ) { menu(retailerId: $retailerId) {productsCount}}`;

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({query: query_count_products})
    });

    const data = await response.json();
    return data.data.menu;
}

const getProduct = async (retailerID, id_product) => {
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
            effects,
            brand {
              name,
              id
            },
            variants {
                option,
                priceRec,
                quantity,
                id
            }
          }
        }
    `;

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({query: query_product})
    });

    const data = await response.json();
    return data.data.product;

}

// fetch de filters brand and category
const filter_strain_type_lineage = async (retailerID, strain_type) => {

    let strain_type_uppercase = strain_type.toUpperCase();

    const query_filter_strain_type = `
        query FilterAllLineage ($retailerId: ID="${retailerID}"){
            menu (retailerId: $retailerId, filter: { category: FLOWER, strainType: ${strain_type_uppercase} }, pagination: { offset: 0, limit: 5 } ) {
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
                      priceRec,
                      quantity,
                      id
                    }
                },
                productsCount
            }
        }
    `;

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify( { query: query_filter_strain_type } )
    });

    const data = await response.json();
    return data.data.menu;
};
const filter_weights = async (retailerID, weigths) => {
    let weight_transform = weigths+"g"
    const query_filter_weights = `
            query FilterWeights ($retailerId: ID="${retailerID}"){
            menu (retailerId: $retailerId, filter: { category: FLOWER, weights: ["${weight_transform}"] }, pagination: { offset: 0, limit: 20 } ) {
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
                      priceRec,
                      quantity,
                      id
                    }
                },
                productsCount
            }
        }
    `;

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({query: query_filter_weights})
    });

    const data = await response.json();
    return data.data.menu;
};
const filter_thc = async (retailerID, min, max) => {

    const Min = parseInt(min);
    const Max = parseInt(max);

    const query_filter_thc = `
            query FilterWeights ($retailerId: ID="${retailerID}"){
            menu (retailerId: $retailerId, filter: { category: FLOWER, potencyThc: { min: ${Min}, max: ${Max}, unit: PERCENTAGE } }, pagination: { offset: 0, limit: 20 } ) {
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
                      priceRec,
                      quantity,
                      id
                    }
                },
                productsCount
            }
        }
    `;

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify( { query: query_filter_thc } )
    });

    const data = await response.json();
    return data.data.menu;
};
const filter_cbd = async (retailerID, min, max) => {
    const query_filter_cbd = `
            query FilterWeights ($retailerId: ID="${retailerID}"){
            menu (retailerId: $retailerId, filter: { category: FLOWER, potencyCbd: { min: ${min}, max: ${max}, unit: PERCENTAGE } }, pagination: { offset: 0, limit: 20 } ) {
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
                      priceRec,
                      quantity,
                      id
                    }
                },
                productsCount
            }
        }
    `;

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify( { query: query_filter_cbd } )
    });

    const data = await response.json();
    return data.data.menu;
};
//fin de fetch de filter
//filter search product
const filter_search_product = async (retailerId, search, page_previous, page_next) => {
    const query_filter_search = `
        query MenuSearch($retailerId: ID="${retailerId}") {
          menu( retailerId: $retailerId filter: { category: FLOWER, search: "${search}" },  pagination: { offset: ${page_previous}, limit: ${page_next} } ) {
            products {
                id,
                name,
                brand{
                name
                },
                image,
                category,
                subcategory,
                strainType,
                effects
                variants {
                    option,
                    priceRec,
                    quantity,
                    id
                }
            }
          }
        }
    `;

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({query: query_filter_search})
    });

    const data = await response.json();
    return data.data.menu;
};
//fin of filter search product

const get_products_carrousel = async (retailerID, category, page_previous, page_next) => {
    const query_get_products_carrousel = `
        query GetAllProducts($retailerId: ID="${retailerID}" ) {
            menu(retailerId: $retailerId, filter: { category: ${category}, pagination: { offset: ${page_previous}, limit: ${page_next} }, sort: {direction: DESC, key: NAME} ) {
                products {
                    id,
                    name,
                    brand{
                      name
                    },
                    image,
                    category,
                    subcategory,
                    strainType,
                    variants {
                      option,
                      priceRec,
                      quantity,
                      id
                    }
                },
                productsCount
            }
        }
    `;

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify( { query: query_get_products_carrousel } )
    });
    const data = await response.json();
    return data;


}


const getAllProducts = async (retailerID, page_previous, page_next) => {
    const query_get_all_products = `
        query GetAllProducts($retailerId: ID="${retailerID}" ) {
            menu(retailerId: $retailerId, filter: { category: FLOWER}, pagination: { offset: ${page_previous}, limit: ${page_next} }) {
                products {
                    id,
                    name,
                    brand{
                      name
                    },
                    image,
                    category,
                    subcategory,
                    strainType,
                    variants {
                      option,
                      priceRec,
                      quantity,
                      id
                    }
                },
                productsCount
            }
        }
    `;

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify( { query: query_get_all_products } )
    });
    const data = await response.json();
    return data.data.menu;
};

const createCheckout = async (retailerId, orderType, pricingType) => {
    const query_create_checkout = `
            mutation CreateCheckout($retailerId: ID="${retailerId}") {
                createCheckout (retailerId: $retailerId, orderType: ${orderType.toUpperCase()}, pricingType: ${pricingType.toUpperCase()}) {
                  id,
                  items{
                    product{
                      id,
                      name,
                      category,
                      strainType,
                      variants {
                        option,
                        priceRec
                      }
                    },
                    id,
                    quantity,
                    productId,
                    option
                  },
                  redirectUrl,
                  pricingType
                }
            }
        `;

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({query: query_create_checkout})
    });

    const result = await response.json();
    return result.data.createCheckout;
};

async function addItemCart (retailer_Id, checkout_Id, product_Id, quantity, option) {
    const query_add_item_cart = `
        
       mutation AddItemToCart ($retailerId: ID="${retailer_Id}", $checkoutId: ID="${checkout_Id}", $productId:ID="${product_Id}", $quantity: Int=${quantity}, $option: String="${option}") {
          addItem (retailerId: $retailerId, checkoutId: $checkoutId, productId: $productId, quantity: $quantity, option: $option) {
            id,
            orderType,
            pricingType,
            redirectUrl,
            updatedAt,
            createdAt,
            items {
              id,
              productId,
              option,
              taxes {
                total,
                sales
              },
              product {
                id,
                name,
                category,
                image,
                variants {
                  id,
                  option,
                  priceRec,
                  quantity
                }
              }
            },
            priceSummary {
              total,
              fees,
              taxes,
              subtotal
            },
            
          }
        }
        
    `;

    return await new Promise( (resolve, reject) =>  {
        fetch(`${url_base}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify( { query: query_add_item_cart } )
        }).then( response => {
            return response.json();
        }).then( result => {
            resolve(result)
        }).catch(error => reject(error.message))
    });
};

export {
    getRetailersIds,
    get_count_product,
    getAllProducts,
    get_products_carrousel,
    getProduct,
    filter_strain_type_lineage,
    filter_weights,
    filter_thc,
    filter_cbd,
    filter_search_product,
    createCheckout,
    addItemCart
}


