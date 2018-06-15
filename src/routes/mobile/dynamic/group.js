import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { 
  NavBar, Icon, Modal, 
} from 'antd-mobile';

import './index.less';

import Copyright from './../../../components/moblie/copyright.js';
import AddDynamic from './../../../components/moblie/dynamic-add-icon.js';

class DynamicGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    if (sessionStorage.isAddGroup === 'true') { // 如果有添加分组的操作 则弹出添加分组的模态框
      this.showGroupPrompt();
      sessionStorage.removeItem('isAddGroup');
    }
  }

  // 渲染顶部的导航栏
  renderNavBar() {
    const ellipsisHandle = () => {
      Modal.operation([
        { text: '添加分组', onPress: () => {} },
        { text: '删除分组', onPress: () => {} },
        { text: '重名分组', onPress: () => {} }
      ]);
    }

    return (
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.dispatch(routerRedux.push('/mobile/index'))}
        rightContent={[
          <Icon 
            key="search"
            type="search" 
            style={{ marginRight: '16px' }}
          />,
          <Icon 
            key="ellipsis"
            onClick={ellipsisHandle}
            type="ellipsis" 
          />,
        ]}
      >所有分组</NavBar>
    )
  }

  // 添加分组
  showGroupPrompt() {
    const submitAddGroup = groupName => {

    }

    Modal.prompt(
      '添加分组', 
      '请输入添加分组的名称',
      [
        {
          text: '关闭'
        },
        {
          text: '提交',
          onPress: value => submitAddGroup(value),
        },
      ], 
      'default', 
      null, 
      ['请输入添加分组的名称']
    )
  }

  // 渲染主要内容
  renderGroup() {
    const _this = this;

    // 跳转到 分组列表
    const jumpToGroupList = dynamicGroupItem => { 
      _this.props.dispatch({ // 设置 选中的分组 id
        'type': 'dynamic/setSelectGroupId',
        'selectGroupId': dynamicGroupItem.id
      });

      // 下面判断 '设置选中的分组id' 是否成功过滤
      let groupfliter = false;
      _this.props.dynamicGroup.map(item => {
        if (item.id === dynamicGroupItem.id) {
          groupfliter = item;
        }
        return item;
      });
      
      if (groupfliter) { // 按理说是成功的
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/group-list'));
      } else {
        alert('未找到分组id, 请检查分组的数据: ' + JSON.stringify(dynamicGroupItem))
      }
    }
    const renderChildren = children => { // 渲染 详情
      let childrenCount = children.length;

      if (childrenCount > 0) {
        let renderItem = [];
        childrenCount = childrenCount >= 3 ? 3 : childrenCount;

        for (let i = 0; i < childrenCount; i++) {
          renderItem.push(
            <div key={i}
              className="group-children"
            >{children[i].title}</div>
          )
        }

        return renderItem
      } else {
        return <div className="group-children">暂无内容</div>
      }
    }

    return (
      <div className="group-main">
        {this.props.dynamicGroup.map((val, key) => (
          <div key={key}
            className="group-item"
            onClick={() => jumpToGroupList(val)}
          >
            <div className="item-content">
              <div className="group-title">{val.name}</div>
              {renderChildren(val.children)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="dynamic-group">
        {this.renderNavBar()}

        {this.renderGroup()}

        <AddDynamic 
          clickCallBack={this.showGroupPrompt}
        />
        <Copyright />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dynamicGroup: state.dynamic.group,
})

export default connect(mapStateToProps)(DynamicGroup);
