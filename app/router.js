module.exports = app => {
    const { router, controller } = app;

    // 返回的路由最好都是小写不要驼峰命名
    router.get('/', controller.home.index); // 首页部分
    router.post('/test', controller.home.webhookTest);
};
