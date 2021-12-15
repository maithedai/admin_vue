import Login from '@/views/getting-started/auth/Login.vue'
import Register from '@/views/getting-started/auth/Register.vue'
import GettingStarted from '@/views/getting-started/index'

export default [
    {
        path: '/home',
        name: 'home',
        component: GettingStarted,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
]
