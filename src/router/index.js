import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    component: () =>
        import ( /* webpackChunkName: "Main" */ "../App"),
    children: [{
            path: "",
            component: () =>
                import ( /* webpackChunkName: "Home" */ "../views/Home"),
            props: { name: "home" }
        },

        {
            path: "item",
            component: () =>
                import ( /* webpackChunkName: "Item" */ "../views/Item"),
            props: { name: "item" }
        },

        {
            path: "score",
            component: () =>
                import ( /* webpackChunkName: "Score" */ "../views/Score"),
            props: { name: "score" }
        }
    ]
}];

const router = new VueRouter({
    //mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;