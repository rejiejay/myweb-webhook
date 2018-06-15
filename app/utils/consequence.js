module.exports = {
    /**
     * 请求成功
     * @param {any} data 返回成功的数据封装
     * @param {string} message 返回成功的信息封装
     * @return {any} 成功封装的结果
     */
    success: (data, message) => ({
        'result': 1,
        'data': data || null,
        'message': message || 'success'
    }),

    /**
     * 请求失败
     * @param {string} message 返回失败的信息封装
     * @param {number} result 返回失败的数据封装
     * @param {any} data 返回失败的数据封装
     * @return {any} 失败封装的结果
     */
    error: (message, result, data) => ({
        'result': result || 0,
        'data': data || null,
        'message': message
    })
}
