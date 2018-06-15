module.exports = app => {
    const { router, controller } = app;

    // 返回的路由最好都是小写不要驼峰命名
    router.get('/', controller.home.index); // 首页部分

    router.get('/dynamic', controller.dynamic.index); // 动态部分
    router.get('/dynamic/get/list', controller.dynamic.getByList); // 返回所有的动态记录 根据列表的形式
    router.get('/dynamic/get/listandgroup', controller.dynamic.getByListAndGroup); // 返回所有的动态记录 根据列表与分组的形式
};
