import {secret_key, public_key, url_base} from '../config/config.js';
import { createElementHtml, appendElementHtml } from './elements_html.js';
const local_storage = window.localStorage;
const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + secret_key,
};

const container_products = document.getElementById('container-products');

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
                return response.json()
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

const filter_strain_type_lineage = (retailerID, strain_type) => {

    let strain_type_uppercase = strain_type.toUpperCase();
    console.log(strain_type_uppercase);

    const query_filter_strain_type = `
        query FilterAllLineage ($retailerId: ID="${retailerID}"){
            menu (retailerId: $retailerId, filter: { strainType: ${strain_type_uppercase} }, pagination: { offset: 0, limit: 20 } ) {
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
}



export {
    GetAllRetailerIds,
    GetAllProducts,
    GetProduct,
    filter_all_lineage

}


