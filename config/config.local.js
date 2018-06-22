module.exports = {
    cluster: {
        listen: {
            port: 2045,
        }
    },

    mysql: {
        app: false,    // 是否加载到 app 上，默认开启
        agent: false, // 是否加载到 agent 上，默认关闭
        client: {     // 单数据库信息配置
            host: '127.0.0.1',     // host
            port: '3306',          // 端口号
            user: 'Rejiejay',      // 用户名
            password: 'QQ1938167', // 密码
            database: 'rejiejay',  // 数据库名
        },
    },

    // security: { // 跨域请求
    //     domainWhiteList: [ 'http://localhost:8888' ],
    // }
};
