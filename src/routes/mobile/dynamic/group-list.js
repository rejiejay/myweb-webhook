import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { 
  NavBar, Icon, Modal, 
} from 'antd-mobile';

import './index.less';
import DynamicList from './../../../components/moblie/dynamic-list.js';
import Copyright from './../../../components/moblie/copyright.js';
import AddDynamic from './../../../components/moblie/dynamic-add-icon.js';

class DynamicGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortMode: '默认',   // 排序方式
      selectGroupItem: {  // 选中的分组
        id: null,
        name: '未过滤分组',
        amountOwned: 0,
        children: []
      }
    };
  }

  componentDidMount() {
    const _this = this;

    // 初始化选中信息
    let initSelectGroup = () => {
      let targetGroup = false;

      _this.props.dynamicGroup.map(dynamicGroupItem => {
        if (dynamicGroupItem.id === _this.props.selectGroupId) {
          targetGroup = dynamicGroupItem;
        }
        return dynamicGroupItem;
      }); 

      return targetGroup;
    };

    let groupfliter = initSelectGroup();
    if (groupfliter) { // 如果成功过滤则渲染
      this.setState({
        selectGroupItem: groupfliter
      });
    } else { // 过滤失败. 这是不科可能的, 因为在上一步已经判断过了!

    }
  }

  jumpToGroupEdit(dynamic) { // 跳转到编辑页面
    if (dynamic) { // 如果是编辑
      this.props.dispatch({ // 设置 选中的分组id 并且设置分组信息
        type: 'dynamic/initEditPage',
        selectGroupId: dynamic.whichGroup.id,
        edit: dynamic,
        preview: {        // 预览页面
          title: dynamic.title,
          content: dynamic.content,
        },
      });

      this.props.dispatch(routerRedux.push('/mobile/dynamic/preview'));
    } else { // 表示新增
      this.props.dispatch({ // 设置 选中的分组 id
        type: 'dynamic/initEditPage',
        selectGroupId: this.props.selectGroupId,
        edit: {            // 编辑的相关数据
          whichGroup: {    // 所属分组的信息
            id: this.props.selectGroupId,
            name: this.state.selectGroupItem.name
          },
          title: '未命名动态记录',
          content: '',
          approved: 0,
          read: 0,
          time: Date.parse(new Date()),
        },
        preview: {        // 预览页面
          title: '未命名动态记录',
          content: '',
        },
      });
      this.props.dispatch(routerRedux.push('/mobile/dynamic/edit'));
    }
  }

  // 渲染顶部的导航栏
  renderNavBar() {
    return (
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.dispatch(routerRedux.push('/mobile/dynamic/group'))}
        rightContent={[
          <Icon 
            key="search"
            type="search" 
            style={{ marginRight: '16px' }}
          />,
        ]}
      >{this.state.selectGroupItem.name}</NavBar>
    )
  }

  // 渲染主要内容
  renderGroup() {
    const _this = this;
    const sortList = {
      timeUp: '时间↑',
      timeDowm: '时间↓',
      approval: '赞同',
      shuffle: '乱序',
    };

    let sortordHandle = (sortord) => {
      _this.setState({
        sortMode: sortList[sortord]
      });
    }

    let dynamicHandle = () => {
      Modal.operation([
        { text: '按照最久远时间↑', onPress: () => sortordHandle('timeUp') },
        { text: '按照最新时间↓', onPress: () => sortordHandle('timeDowm') },
        { text: '按照赞同量', onPress: () => sortordHandle('approval') },
        { text: '乱序', onPress: () => sortordHandle('shuffle') },
      ]);
    }

    return (
      <div className="group-main">

        <div className="group-main-header">
          <div className="header-name">{this.state.selectGroupItem.children.length} 条动态</div>
          <div 
            className="header-label"
            onClick={dynamicHandle}
          >
            <span>按照{this.state.sortMode}排序</span>
            <Icon type='down' />
          </div>
        </div>

        <DynamicList 
          data={this.state.selectGroupItem.children} 
          dynamicClick={dynamicItem => this.jumpToGroupEdit(dynamicItem)}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="dynamic-group-list">
        {this.renderNavBar()}

        {this.renderGroup()}

        <AddDynamic 
          clickCallBack={() => this.jumpToGroupEdit(false)}
        />

        <Copyright />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectGroupId: state.dynamic.selectGroupId,
  dynamicGroup: state.dynamic.group,
})

export default connect(mapStateToProps)(DynamicGroup);
