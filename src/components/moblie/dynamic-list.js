import React, {Component} from 'react';
import { connect } from 'dva';

import './dynamic-list.less';

import convertTime from './../../utils/convertTime.js';

// 列表复用的组件
class DynamicList extends Component {
  render() {
    let dynamicClick = this.props.dynamicClick || function() {console.log('暂未绑定事件')};

    return (
      <div className="dynamic-list-component">

        {this.props.data.map((val, key) => (
            <div 
              className="dynamic-item" 
              key={key}
              onClick={() => dynamicClick(val)}
            >
              {key === 0 ? <div className="dynamic-line"/> : null}
              <div className="dynamic-contained">
                <div className="dynamic-title">{val.title}</div>
                <div 
                  className={val.content.length > 70 ? "dynamic-content dynamic-ellipsis" : "dynamic-content"}
                >{val.content}</div>
                <div className="dynamic-other">
                  <div>
                    {val.read} 阅读
                    <span>·</span>
                    {val.read} 赞同
                    <span>·</span>
                    {convertTime.dateToYYYYmmDDhhMM(new Date(val.timestamp))}
                  </div>
                </div>
              </div>
            </div>
        ))}
        
      </div>
    )
  }
}

export default connect()(DynamicList);
