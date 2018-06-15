import React, {Component} from 'react';
import { connect } from 'dva';

import './index.less';

class computer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="computer">
      hello pc
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(computer);
