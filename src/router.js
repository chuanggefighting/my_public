import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 路由加载
const ProductBuy = () => import("views/entrance/ProductBuy.vue")


const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  // history 模式下滚动
  scrollBehavior (to, from, savedPosition) {
    return {x: 0,y: 0};   // 顶部
  },
  routes: [
    // 购买页面
    {
      path: "/",
      name: "Index",
      meta: {
        title: '天天安骑'
      },
      component: ProductBuy
    },
    {
      path: "/product-buy",
      name: "ProductBuy",
      meta: {
        title: '天天安骑'
      },
      component: ProductBuy
    },
    {
      path: "/buy-once",      // 一次性购买
      name: "BuyOnce",
      meta: {
        title: '天天安骑'
      },
      component: () =>
        import("views/extension/ProductBuyOnce.vue")
    },
    // 服务入口页面
    {
      path: "/info-service",  // 保单查询
      name: "InfoService",
      component: () =>
        import("views/entrance/InfoService.vue")
    },
    {  
      path: "/service-type",  // 保单号选择
      name: "ServiceType",
      component: () =>
        import("views/entrance/ServiceType.vue")
    },
    // 微服务页面
    {
      path: "/payment",      // 理赔申请
      name: "Payment",
      meta: {
        title: '理赔申请'
      },
      component: () =>
        import("views/microServices/Payment.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面 title */
  let title = to.meta.title
  document.title = title ? title : ""
  next()
})

export default router


