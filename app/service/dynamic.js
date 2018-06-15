const Service = require('egg').Service;

class dynamicService extends Service {
    /**
     * 返回所有的分组的记录
     * @return {Array} [{
     *     id: {number},
     *     name: {string},
     * }];
     */
    async getGroups() {
        const groups = await this.ctx.app.mysql.query('select * from dynamic_groups;');
        return groups;
    }

    /**
     * 返回所有的动态记录
     * @return {Array} [{
     *     id: {number},
     *     group_id: {number},
     *     title: {string},
     *     content: {string},
     *     approved: {number},
     *     read_count: {number},
     *     timestamp: {number}
     * }];
     */
    async getRecords() {
        const records = await this.ctx.app.mysql.query('select * from dynamic_records;');
        return records;
    }
}

module.exports = dynamicService;
