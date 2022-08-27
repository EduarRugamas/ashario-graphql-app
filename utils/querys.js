import {secret_key, public_key, url_base} from '../config/config.js';
const local_storage = window.localStorage;
const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + secret_key,
};


const GetAllRetailerIds = () => {

    const query_retailers = `
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
            "Authorization": "Bearer " + secret_key,
        },
        body: JSON.stringify({
            query: query_retailers
        })
    }).then( (response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then( (retailers) => {
        console.log(retailers)

        const array = retailers.data.retailers;

        array.find( item => {
            if (item.name === 'Ashario - Centrepoint Mall') {
                let store_centre_point_mall = {
                    name: item.name,
                    id: item.id,
                    menuTypes: item.menuTypes,
                    address: item.address
                }

                console.log(item);

                local_storage.setItem('Ashario_Centrepoint_Mall', JSON.stringify(store_centre_point_mall));
                console.log('se guardo en el local storage');
            }

            if (item.name === 'Ashario - Aurora') {
                let store_aurora = {
                    name: item.name,
                    id: item.id,
                    menuTypes: item.menuTypes,
                    address: item.address
                }

                console.log(item);

                local_storage.setItem('Ashario_Aurora', JSON.stringify(store_aurora));
                console.log('se guardo en el local storage');
            }

            if (item.name === 'Ashario - North York') {
                let store_north_york = {
                    name: item.name,
                    id: item.id,
                    menuTypes: item.menuTypes,
                    address: item.address
                }

                console.log(item);

                local_storage.setItem('Ashario_North_York', JSON.stringify(store_north_york));
                console.log('se guardo en el local storage');
            }
        });

    })
    .catch(error => console.log(error.message));
};


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

    const response = await fetch(`${url_base}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({query: query_retailers})
    });
    const data = response.json();
    return data;
}




const GetCountproduct = (retailerID) => {
    const query_count_products = `query GetCountProducts($retailerId: ID="${retailerID}" ) { menu(retailerId: $retailerId) {productsCount}}`;

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

const GetAllProducts = async (retailerID) => {
        const query_get_all_products = `
        query GetAllProducts($retailerId: ID="${retailerID}" ) {
            menu(retailerId: $retailerId, filter: { category: FLOWER}, pagination: { offset: 0, limit: 20 }) {
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

    return await new Promise(  (resolve, reject) => {
         fetch(`${url_base}`, {
            method: 'POST',
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                 "Authorization": "Bearer " + secret_key,
             },
             body: JSON.stringify({
                 query: query_get_all_products
             })
         }).then( response => {
                 return response.json();
         })
          .then( info => resolve(info.data.menu))
          .catch(error => reject(error.message))
    });
}

const GetProduct = async (retailerID, id_product) => {
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
            },
            variants {
                option,
                priceMed,
                priceRec,
                quantity,
                id
            }
          }
        }
    `;
    return await new Promise( (resolve, reject) =>  {
        fetch(`${url_base}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query: query_product})
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            reject('Error al ejecutar la query ' + response.status);
        }).then(data => {
            resolve(data.data.product);
        }).catch(error => reject(error.message));
    });
}

// fetch de filters brand and category

const filter_all_lineage = async (retailerID) => {
    const query_filter_all_lineage = `
        query FilterAllLineage ($retailerId: ID="${retailerID}"){
            menu (retailerId: $retailerId, filter: { category: FLOWER}, pagination: { offset: 0, limit: 20 } ) {
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

    return await new Promise( (resolve, reject) => {
        fetch(`${url_base}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({query: query_filter_all_lineage})
        }).then( response => response.json() ).then( products => {
            resolve(products.data.menu);
        }).catch( error => { reject(error.message) })
    });

};

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
                      priceMed,
                      priceRec,
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
                      priceMed,
                      priceRec,
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
                      priceMed,
                      priceRec,
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
                      priceMed,
                      priceRec,
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


 const getAllProducts = async (retailerID) => {
    const query_get_all_products = `
        query GetAllProducts($retailerId: ID="${retailerID}" ) {
            menu(retailerId: $retailerId, filter: { category: FLOWER}, pagination: { offset: 0, limit: 20 }) {
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
                      priceMed,
                      priceRec,
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
}

async function CreateCheckout (retailerId, orderType, pricingType) {

        const orderType_uppercase = orderType.toUpperCase();
        const pricinType_uppercase = pricingType.toUpperCase();

        console.log('En mayusculas', orderType_uppercase, pricinType_uppercase);

        //orderType: PICKUP, pricingType: RECREATIONAL
        const query_create_checkout = `
            mutation CreateCheckout($retailerId: ID="${retailerId}") {
                createCheckout (retailerId: $retailerId, orderType: ${orderType_uppercase}, pricingType: ${pricinType_uppercase}) {
                  id,
                  items{
                    product{
                      id,
                      name,
                      category,
                      strainType
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

        return await new Promise( (resolve, reject) => {
            fetch(`${url_base}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({query: query_create_checkout})
            }).then( response => {
                return response.json();
            }).then( result => {
                resolve(result.data);
            }).catch( error => reject(error.message))
        });
}

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
}




export {
    getRetailersIds,
    GetAllRetailerIds,
    getAllProducts,
    GetProduct,
    filter_all_lineage,
    filter_strain_type_lineage,
    filter_weights,
    filter_thc,
    filter_cbd,
    CreateCheckout,
    addItemCart
}


