import http from 'k6/http';
import { check } from 'k6';
import { login } from './auth.js';

export let options = {
    stages: [
        { duration: '12s', target: 50 },
        { duration: '12s', target: 100 },
        { duration: '12s', target: 30 },
        { duration: '30s', target: 200 },
        { duration: '30s', target: 300 },
        { duration: '30s', target: 500 }
    ]
};

export function setup() {
    let token = login('admin@admin.com', 'admin');
    return { token };
}

export default function (data) {
    let token = data.token;

    let res = http.get(`http://localhost:8000/api/metrics`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const json = res.json();

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has top_five_users': () => Object.prototype.hasOwnProperty.call(json, 'top_five_users'),
        'top_five_users is array': () => Array.isArray(json.top_five_users),
        'has top_five_purchased': () => Object.prototype.hasOwnProperty.call(json, 'top_five_purchased'),
        'top_five_purchased is array': () => Array.isArray(json.top_five_purchased),
        'has top_five_favourites': () => Object.prototype.hasOwnProperty.call(json, 'top_five_favourites'),
        'top_five_favourites is array': () => Array.isArray(json.top_five_favourites),
    });
}
