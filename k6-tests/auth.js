import http from 'k6/http';
import { check } from 'k6';

export function login(email, password) {
    let loginRes = http.post(
        'http://localhost:8000/api/login',
        JSON.stringify({
            email: email,
            password: password
        }),
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );

    check(loginRes, {
        'login status is 200': (r) => r.status === 200,
        'login response has token': (r) => !!r.json('token')
    });

    return loginRes.json('token');
}
