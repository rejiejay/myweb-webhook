import React, {Component} from 'react';
import { connect } from 'dva';

import './dynamic-add-icon.less';
import svg_add from './../../assets/add.svg';

// 底部组件
class AddDynamic extends Component {
  render() {
    return (
      <div 
        className="dynamic-add-icon"
        onClick={this.props.clickCallBack}
      >
        <img alt="add-svg" src={svg_add} />
      </div>
    )
  }
}

export default connect()(AddDynamic);
