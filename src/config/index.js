const config = {
    init: function () {
        let NODE_ENV = process.env.NODE_ENV || '';
    
        if (NODE_ENV === 'development') {
            return {
                url: 'http://localhost:1938',
            }
        } else {
            return {
                url: 'https://www.rejiejay.cn',
            }
        }
    }
}

export default config.init();
