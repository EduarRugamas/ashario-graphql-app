const storage_local = window.localStorage;
let count = 0;
let cart = {};



window.addEventListener('DOMContentLoaded', () => {
        if (storage_local.getItem('cart')) {
            cart = JSON.parse(storage_local.getItem('cart'));
        }else {
            storage_local.setItem('cart', cart);
        }

        if (storage_local.getItem('count')) {
            count = parseInt(storage_local.getItem('count'));
        }else {
            storage_local.setItem('count', count);
        }

        console.log(cart);





});


