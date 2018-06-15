const Controller = require('egg').Controller;
const consequence = require('./../utils/consequence');
const lodash = require('lodash');

class DynamicController extends Controller {

  async index() { // 测试入口
    this.ctx.body = 'Hello ~~~ Welcome to Rejiejay server side and your place in dynamic.';
  }

  async getByList() { // 获取所有动态 根据列表的形式
    let records = await this.ctx.service.dynamic.getRecords();
    let groups = await this.ctx.service.dynamic.getGroups();

    this.ctx.body = consequence.success({
      // 这里暂时分出一个 dynamics 因为以后会有分页的需求
      dynamics: records.map(record => {
        let groupsIndex = lodash.findIndex(groups, group => group.id === record.group_id); // 查询对应分组

        return {
          whichGroup: {
            id: record.group_id,
            name: groupsIndex === -1 ? "未知分组" : groups[groupsIndex].name,
          },
          title: record.title,
          content: record.content,
          approved: record.approved,
          read: record.read_count,
          timestamp: record.timestamp
        }
      })
    });
  }


  /**
   * 返回所有的动态记录 根据列表与分组的形式
   * @return {object} {
   *  result: {number},
   *  message: {string},
   *  data: {
   *    list: [{
   *      whichGroup: {
   *        id: {number},
   *        name: {string},
   *      }
   *      title: {string},
   *      content: {string},
   *      approved: {number},
   *      read: {number},
   *      timestamp: {string},
   *    }],
   *    group: [{
   *      id: {number},
   *      name: {string},
   *      children: [{
   *        whichGroup: {
   *          id: {number},
   *          name: {string},
   *        }
   *        title: {string},
   *        content: {string},
   *        approved: {number},
   *        read: {number},
   *        timestamp: {string},
   *      }]
   *    }],
   *  },
   * };
   */
  async getByListAndGroup() { // 根据列表与分组的形式 一并获取所有动态 
    let records = await this.ctx.service.dynamic.getRecords(); // 从 server 获取的所有记录
    let groups = await this.ctx.service.dynamic.getGroups(); // 从 server 获取的所有分组

    // 下面开始数据结构的转换
    let allList = []; // 所有记录根据分组转换 后最终返回去的 所有列表
    // 所有记录根据分组转换 最终返回去的 所有分组
    let allGroup = groups.map(groupItem => ({ // 初始化结构
      id: groupItem.id,
      name: groupItem.id === 1 ? '未分组' : groupItem.name, // 这里要注意一点的是, 第一组永远是未分组
      // 本意是从数据库里面去查询所有记录, 因为以后可能会做分页, 所以不能以length来解决这个问题
      // 但是现阶段的需求暂时不做
      // amountOwned: 0, // 初始化一定是 0, 
      children: []
    }));

    records.map((recordItem, recordKey) => { // 一次循环一并做完 列表与分组 初始化
      let groupsId = -1; // 当前记录 匹配到的 分组id 默认为 -1 表示未匹配成功
      let groupsIndex = -1; // 当前记录 匹配到的 分组下标 默认为 -1 表示未匹配成功

      groups.map((groupItem, groupKey) => {
        if (recordItem.group_id === groupItem.id) { // 当前记录 匹配 分组
          groupsId = groupItem.id;
          groupsIndex = groupKey;
        }
        return true
      });

      let resultItem = { // 最终生成的结果
        whichGroup: { // 这条结果所属分组的信息
          id: groupsId === -1 ? // 使用当前记录 匹配到的 分组id
            1 : groupsId, // 如果未匹配到这设置为分组 1
          name: groupsId === -1 ? 
            "未知分组" : 
            groups[groupsIndex].name, // 使用下标 获取名称 必定是成功的
        },
        title: recordItem.title,
        content: recordItem.content,
        approved: recordItem.approved,
        read: recordItem.read_count,
        timestamp: recordItem.timestamp
      }
      
      allList.push(resultItem); // 将初始化结果导出 开始进入下一个循环
      let allGroupIndex = groupsIndex === -1 ? 0 : groupsIndex // 如果未匹配到下标, 则将初始化导出到第一分分组
      allGroup[allGroupIndex].children.push(resultItem); // 将初始化结果导出 开始进入下一个循环
      return true
    });

    this.ctx.body = consequence.success({ // 将结果封装 并且返回请求
      list: allList,
      group: allGroup,
    })
  }  
}

module.exports = DynamicController;
