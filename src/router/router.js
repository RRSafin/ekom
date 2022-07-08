import {createRouter, createWebHistory} from "vue-router";
import SignPage from "@/pages/SignPage";
import AnalyticsPage from "@/pages/AnalyticsPage";


const routes = [
    {
        path: '/',
        name: 'auth',
        component: SignPage
    },
    {
        path: '/analytics',
        name: 'analytics',
        component: AnalyticsPage
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach( (to, from, next) => {
    if (to.name === 'auth' && localStorage.getItem('leadhit-site-id')) {
        next({ name: 'analytics' })
    } else if (to.name === 'analytics' && !localStorage.getItem('leadhit-site-id')) {
        next({ name: 'auth' })
    } else {
        next()
    }
})

export default router;