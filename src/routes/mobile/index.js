import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { 
  Modal, Drawer, List,
  Icon
} from 'antd-mobile';

import './index.less';
import MobileHome from './home.js';

import ajaxs from './ajaxs.js';
import DynamicList from './../../components/moblie/dynamic-list.js';
import Copyright from './../../components/moblie/copyright.js';
import AddDynamic from './../../components/moblie/dynamic-add-icon.js';

const clientWidth = document.documentElement.clientWidth || window.innerWidth || window.screen.width;

class mobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarOpen: false,
      selectedTabs: localStorage.recordTabs ? localStorage.recordTabs : 'home', // home dynamic group
      sortMode: '时间↓'
    };
  }

  // 侧边栏
  SidebarHandle() {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
  }

  /**
   * 判断 '设置选中的分组id' 是否成功过滤
   */
  initSelectGroup(setSelectGroupId) {
    let groupfliter = false;
    this.props.dynamicGroup.map(item => {
      if (item.id === setSelectGroupId) {
        groupfliter = item;
      }
      return item;
    });

    return groupfliter;
  }

  /**
   * 渲染 首页 - 分页
   * 抽象到 home.js 文件夹里
   */
  renderHome() {
    if (this.state.selectedTabs === 'home') {
      return (
        <div className="mobile-home">
 
          <div className="home-header">
            <div className="header-name">个人动态</div>
            <div 
              className="header-label"
              onClick={this.SidebarHandle.bind(this)}
            >
              <span>查看更多</span>
              <Icon type='right' />
            </div>
          </div>
 
          <div className="home-redirect">
            <div className="redirect-content">
              {ajaxs.homePageTabs.map((val, key) => (
                <div key={key}
                  onClick={() => window.location.href=val.url}
                >{val.name}</div>
              ))}
            </div>
          </div>
          <MobileHome/>
        </div>
      )
    }
  }

  /**
   * 渲染 动态 - 分页
   * 数据来源于 redux dynamic
   */
  renderDynamic() {
    const _this = this;
    const selectedTabState = this.state.selectedTabs;
    const sortList = {
      timeUp: '时间↑',
      timeDowm: '时间↓',
      approval: '赞同',
      shuffle: '乱序',
    };

    let sortordHandle = sortord => {
      _this.setState({
        sortMode: sortList[sortord]
      });
    }

    let dynamicHandle = () => {
      if (selectedTabState === 'dynamic') {
        Modal.operation([
          { text: '按照最久远时间↑', onPress: () => sortordHandle('timeUp') },
          { text: '按照最新时间↓', onPress: () => sortordHandle('timeDowm') },
          { text: '按照赞同量', onPress: () => sortordHandle('approval') },
          { text: '乱序', onPress: () => sortordHandle('shuffle') },
        ]);
      } else {
        _this.setState({selectedTabs: 'dynamic'});
      }
    }

    const jumpToGroupEdit = dynamic => { // 跳转到编辑页面
      _this.props.dispatch({             // 设置 选中的分组 id 以及编辑页面 和 预览页面
        type: 'dynamic/initEditPage',
        selectGroupId: dynamic.whichGroup.id,
        edit: dynamic,
        preview: {        // 预览页面
          title: dynamic.title,
          content: dynamic.content,
        },
      });

      if (_this.initSelectGroup(dynamic.whichGroup.id)) { // 如果成功过滤则 逐步跳转
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/group'));
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/group-list'));
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/preview'));
      } else { // 如果过滤失败则 直接跳转
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/preview'));
      }
    }

    if (this.state.selectedTabs === 'dynamic') {
      return (
        <div className="mobile-dynamic">
          <div className="dynamic-header">
            <div className="header-name">{this.props.dynamicList.length}/{this.props.dynamicTotal} 条动态</div>
            <div 
              className="header-label"
              onClick={dynamicHandle}
            >
              <span>按照{this.state.sortMode}排序</span>
              <Icon type='down' />
            </div>
          </div>

          <DynamicList 
            data={this.props.dynamicList} 
            dynamicClick={dynamicItem => jumpToGroupEdit(dynamicItem)}
          />
        </div>
      )
    }
  }

  /**
   * 渲染 分组 - 分页
   * 数据来源于 redux dynamic
   */
  renderGroup() {
    const _this = this;

    // 跳转到 分组列表
    const jumpToGroupList = dynamicGroupItem => { 
      _this.props.dispatch({ // 设置 选中的分组 id
        'type': 'dynamic/setSelectGroupId',
        'selectGroupId': dynamicGroupItem.id
      });

      if (this.initSelectGroup(dynamicGroupItem.id)) { // 如果成功过滤则跳转
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/group'));
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/group-list'));
      } else { // 如果过滤失败则跳转分组页面
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/group'));
      }
    }

    // 渲染 详情
    const renderChildren = children => {
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

    if (this.state.selectedTabs === 'group') {
      return (
        <div className="mobile-group">
          <div className="group-header">
            <div className="header-name">动态分组</div>
            <div 
              className="header-label"
              onClick={() => this.props.dispatch(routerRedux.push('/mobile/dynamic/group'))}
            >
              <span>查看详情</span>
              <Icon type='right' />
            </div>
          </div>

          <div className="group-list">
            {this.props.dynamicGroup.map((val, key) => (
              <div key={key}
                className="group-item"
                onClick={() => jumpToGroupList(val)}
                style={{width: `${(clientWidth - (15 * 3) - 4) / 2}px`}}
              >
                <div className="item-content">
                  <div className="group-title">{val.name}</div>
                  {renderChildren(val.children)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  // 顶部分页栏
  renderTabs() {
    const _this = this;
    const selectedTabState = this.state.selectedTabs;

    let changeTabs = (selectedTabs) => {
      localStorage.setItem('recordTabs', selectedTabs);
      _this.setState({selectedTabs: selectedTabs});
    }

    return (
      <div className="mobile-tabs">
        <div 
          className={selectedTabState === 'home'? 'isActivated' : ''}
          onClick={() => changeTabs('home')}
        ><span>主页</span></div>
        <div
          className={selectedTabState === 'dynamic'? 'isActivated' : ''}
          onClick={() => changeTabs('dynamic')}
        ><span>动态</span></div>
        <div 
          className={selectedTabState === 'group'? 'isActivated' : ''}
          onClick={() => changeTabs('group')}
        ><span>分组</span></div>
      </div>
    )
  }

  render() {
    const _this = this;
    const selectedTabs = this.state.selectedTabs;

    const sidebar = (
      <List>{ajaxs.homePageTabs.map((val, index) => (
        <List.Item 
          key={index}
          onClick={() => window.location.href=val.url}
        >{val.name}</List.Item>
      ))}</List>
    );

    const addDynamicFun = () => {
      if (selectedTabs === 'group') { // 如果是新增分组 则跳到分组页面
        sessionStorage.setItem('isAddGroup', 'true');
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/group'));
      } else {// 如果是新增动态 则跳到新增动态页面
        _this.props.dispatch({ // 设置 选中的分组 id
          type: 'dynamic/initEditPage',
          selectGroupId: 0,  // 默认 第0组 未分类组 
					edit: {            // 编辑的相关数据
            whichGroup: {    // 所属分组的信息
              id: 0,         // 默认 第0组 未分类组 
              name: '未分类'
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
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/edit'));
      }
    }

    return (
      <div className="mobile">
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          sidebar={sidebar}
          open={this.state.isSidebarOpen}
          onOpenChange={this.SidebarHandle.bind(this)}
        >
          {this.renderTabs()}

          {this.renderHome()}
          {this.renderDynamic()}
          {this.renderGroup()}

          <AddDynamic 
            clickCallBack={addDynamicFun}
          />

          <Copyright />
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dynamicTotal: state.dynamic.total,
  dynamicList: state.dynamic.list,
  dynamicGroup: state.dynamic.group,
})

export default connect(mapStateToProps)(mobile);
