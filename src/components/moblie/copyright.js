import React, {Component} from 'react';
import { connect } from 'dva';

import './copyright.less';

// 底部组件
class Copyright extends Component {
  render() {
    return (
      <div className="copyright-component">
        <div className="copyright-describe">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div>
      </div>
    )
  }
}

export default connect()(Copyright);
