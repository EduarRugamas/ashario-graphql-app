import {secret_key, public_key, url_base} from '../config/config.js';

const local_storage = window.localStorage;

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

const GetAllProducts = (retailerID) => {
    const query_all_products = `
    query GetAllProducts($retailerId: ID=${retailerID} ) {
        menu(retailerId: $retailerId, filter: { category: FLOWER} ) {
            products {
              id,
              name,
              brand{
                name
              },
              description,
              image,
              subcategory,
              category
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
    }).then(response => response.json()).then(data => {
        console.log(data)
    }).catch(error => console.log(error.message));
}

export {
    GetAllRetailerIds,
    GetAllProducts
}
