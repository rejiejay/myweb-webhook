module.exports = {
    keys: '~!QQ1938167@#00',
    
    email: { // 邮件配置
        service: 'QQ',
        user: '454766952@qq.com',
        pass: 'ojfwghzywucqbgie',
    },

    webhooksSecret: { // github webhooks secret token
        myweb_webhook: 'DFqew1938167',
    },

    security: { // POST 请求验证 keys
        enable: false,
        csrf: {
            enable: false
        }
    }
};
