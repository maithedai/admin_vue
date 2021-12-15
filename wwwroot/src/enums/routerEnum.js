// các router của luồng getting started
const GETTING_STARTED_ROUTER = [
    {
        name: "home",
        path: "/home"
    },
    {
        name: "login",
        path: "/login"
    },
    {
        name: "register",
        path: "/register"
    },
]

// các router của luồng user
const USER_ROUTER = [
    {
        path: '/profile',
        name: 'profile',
    },
]

export {
    GETTING_STARTED_ROUTER,
    USER_ROUTER
}
