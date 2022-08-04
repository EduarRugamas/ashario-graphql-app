import { secret_key, public_key, url_base } from '../config/config.js';
const local_storage = window.localStorage;
let stores = {};

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
        .then( response => {
            return response.json();
        })
        .then( data => {
            console.log(data);
            console.log(data.data.retailers[1].name);

            if (local_storage.getItem('Ashario_stores')){
                stores = JSON.parse(local_storage.getItem('Ashario_stores'));
            }

            let store_Centrepoint_Mall = {
                "name": data.data.retailers[1].name,
                "id": data.data.retailers[1].id,
                "address": data.data.retailers[1].address,
            }
            let store_North_York = {
                "name": data.data.retailers[2].name,
                "id": data.data.retailers[2].id,
                "address": data.data.retailers[2].address,
            }

            let store_Aurora = {
                "name": data.data.retailers[3].name,
                "id": data.data.retailers[3].id,
                "address": data.data.retailers[3].address,
            }

            if (store_Centrepoint_Mall in stores) {
                console.log('Tienda centre point mall');
            }else {
                stores[store_Centrepoint_Mall] = store_Centrepoint_Mall;
                local_storage.setItem('Ashario_stores', JSON.stringify(stores));
            }

            if (store_North_York in stores) {
                console.log('Tienda North York');
            }else {
                stores[store_North_York] = store_North_York;
                local_storage.setItem('Ashario_stores', JSON.stringify(stores));
            }

            if (store_Aurora in stores) {
                console.log('Tienda Aurora');
            }else {
                stores[store_Aurora] = store_Aurora;
                local_storage.setItem('Ashario_stores', JSON.stringify(stores));
            }

            console.log(stores);


        //    #1 Ashario_Centrepoint_Mall, #2 Ashario_North_York, #3 Ashario_Aurora

        })
        .catch( error => {
            console.log(error.message);
        })
};

const GetAllProducts = () => {

}

export {
    GetAllRetailerIds
}
