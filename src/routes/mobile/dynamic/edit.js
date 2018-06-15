import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { Icon, Toast, TextareaItem } from 'antd-mobile';

import './edit.less';

const clientWidth = document.documentElement.clientWidth || window.innerWidth || window.screen.width;

class DynamicEdit extends Component {
  constructor(props) {
    super(props);

    const initAutoFocus = () => {
      let autofocus = false;
      if (sessionStorage.autofocus) {
        autofocus = sessionStorage.autofocus // 如果有自动选中
      }
      sessionStorage.removeItem('autofocus');
      
      return autofocus
    }

    this.state = {
      tiltle: ''
    };

    this.autofocus = initAutoFocus(); // false title content
  }

  // 渲染头部
  renderHeader() {
    const _this = this;
    const titleHandle = event => {
      _this.props.dispatch({
        type: 'dynamic/setEditTitle',
        title: event.target.value
      });
    }

    const saveSubimt = () => { // 保存并返回上一页
      Toast.loading('Loading...', 1, () => {
        _this.props.dispatch(routerRedux.goBack());
        console.log('Load complete !!!');
        Toast.hide();
      });
    }

    const turnBack = () => { // 返回上一页
      _this.props.dispatch(routerRedux.goBack());
    }
    const renderInputFocus = () => { // 渲染自动选中
      if (_this.autofocus && _this.autofocus === 'title') {
        return (
          <input 
            className="title-input" 
            style={{width: clientWidth - 42 - 60}}
            value={_this.props.dynamicEdit.title}
            onChange={titleHandle}
            placeholder="请输入动态记录标题"
            autoFocus
          />
        )
      } else {
        return (
          <input 
            className="title-input" 
            style={{width: clientWidth - 42 - 60}}
            value={_this.props.dynamicEdit.title}
            onChange={titleHandle}
            placeholder="请输入动态记录标题"
          />
        )
      }
    }

    return (
      <div className="edit-header">
        <div 
          className="title-icon"
          onClick={turnBack}
        >
          <Icon type="left" />
        </div>
        {renderInputFocus()}
        <div className="title-complete"
          onClick={saveSubimt}
        >完成</div>
      </div>
    )
  }

  // 渲染 Markdown 富文本组件
  renderMDEditor() {
    const _this = this;

    const contentHandle = content => {
      _this.props.dispatch({
        type: 'dynamic/setEditContent',
        content: content
      });
    }

    const renderInputFocus = () => { // 渲染自动选中
      if (_this.autofocus && _this.autofocus === 'content') {
        return (
          <TextareaItem
            value={_this.props.dynamicEdit.content}
            placeholder="请输入动态与记录"
            onChange={contentHandle}
            autoHeight
            autoFocus
          />
        )
      } else {
        return (
          <TextareaItem
            value={_this.props.dynamicEdit.content}
            placeholder="请输入动态与记录"
            onChange={contentHandle}
            autoHeight
          />
        )
      }
    }

    return (
			<div className="edit-input">
        {renderInputFocus()}
      </div>
    );
  }

  render() {
    return (
      <div className="dynamic-edit">

        {this.renderHeader()}

        {this.renderMDEditor()}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dynamicEdit: state.dynamic.edit,
})

export default connect(mapStateToProps)(DynamicEdit);
