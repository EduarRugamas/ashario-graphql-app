import {public_key, secret_key, url_base} from '../config/config.js';

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
            "Authorization": "Bearer6 " + public_key,
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
        })
        .catch( error => {
            console.log(error.message);
        })
};

GetAllRetailerIds();
