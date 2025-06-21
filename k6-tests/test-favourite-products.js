import http from 'k6/http';
import { check } from 'k6';
import { login } from './auth.js';

export let options = {
    stages: [
        { duration: '12s', target: 50 },
        { duration: '12s', target: 100 },
        { duration: '12s', target: 30 },
        { duration: '30s', target: 200 },
        { duration: '12s', target: 300 }
    ]
};

export function setup() {
    let token = login('admin@admin.com', 'admin');
    return { token };
}

export default function (data) {
    let token = data.token;
    let userId = 1;

    let res = http.get(`http://localhost:8000/api/users/${userId}/favourites`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response is an array': (r) => Array.isArray(r.json())
    });
}
