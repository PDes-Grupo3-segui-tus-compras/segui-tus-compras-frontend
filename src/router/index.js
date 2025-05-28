import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue'),
            meta: { requiresAuth: true }
        },

        {
            path: '/products/:id',
            name: 'productDetail',
            component: () => import('@/views/pages/ProductDetail.vue'),
            meta: { requiresAuth: true }
        },

        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue'),
            meta: { guestOnly: true }
        },

        {
            path: '/auth/register',
            name: 'register',
            component: () => import('@/views/pages/auth/Register.vue'),
            meta: { guestOnly: true }
        },

        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },

        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },

        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/views/pages/admin/Admin.vue'),
            meta: { requiresAuth: true, adminOnly: true }
        },

        {
            path: '/admin/users',
            name: 'users',
            component: () => import('@/views/pages/admin/Users.vue'),
            meta: { requiresAuth: true, adminOnly: true }
        },

        {
            path: '/admin/metrics',
            name: 'metrics',
            component: () => import('@/views/pages/admin/Metrics.vue'),
            meta: { requiresAuth: true, adminOnly: true }
        },

        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const adminOnly = to.matched.some((record) => record.meta.adminOnly);
    const guestOnly = to.matched.some((record) => record.meta.guestOnly);
    const token = localStorage.getItem('token');
    const permission = localStorage.getItem('permission');

    if (requiresAuth && !token) {
        next({ name: 'login' });
    } else if (guestOnly && token) {
        next({ name: 'landing' });
    } else if(adminOnly && permission !== "admin") {
        next({ name: 'accessDenied' });
    } else {
        next();
    }
});

export default router;
