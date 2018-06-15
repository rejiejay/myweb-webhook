import config from './../config/index';

const baseFetch = {
    /**
     * 通用的 fetch get 查找请求
     * @param {string} url 查找请求的地址
     * @param {string} target 查找请求目标
     * @return {Promise} 返回一个 Promise
     */
    get: function(url, target) {
        return new Promise((resolve, reject) => {
            fetch(`${config.url}${url}`, {
                'method': 'GET',
                'contentType': 'application/json; charset=utf-8'
            }).then(
                response => response.json(),
                error => ({result: 0, message: error})
            ).then(val => {
                if (val.result === 1) {
                    resolve(val.data);
                } else {
                    reject(`向服务器发起请求查找${target}成功, 但是数据有误! 原因: ${val.message}`);
                }
            }).catch(error => reject(`向服务器发起请求查找${target}失败, 原因: ${error}`));
        });
    },
}

export default baseFetch;
