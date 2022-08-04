import { secret_key, public_key, url_base } from '../config/config.js';

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
            console.log(data.data.retailers[0].name)
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
