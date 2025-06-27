import { login } from './auth.js';
import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 60,
    duration: '1m'
};

export function setup() {
    let token = login('admin@admin.com', 'admin');
    return { token };
}

function getProduct(product_id, token) {
    let res = http.get(`http://localhost:8000/api/products/get-product?product_id=${product_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    check(res, {
        [`${product_id} status is 200`]: (r) => r.status === 200,
        [`${product_id} id is correct`]: (r) => r.json('id') === product_id,
        [`${product_id} name is not empty`]: (r) => r.json('name') && r.json('name').length > 0,
        [`${product_id} price is valid`]: (r) => r.json('price') > 0
    });
}

export default function (data) {
    let token = data.token;

    let productIds = ['MLA29815169', 'MLA13982981', 'MLA24868025', 'MLA19912658'];
    let randomIndex = Math.floor(Math.random() * productIds.length);
    let randomProductId = productIds[randomIndex];

    getProduct(randomProductId, token);
}
