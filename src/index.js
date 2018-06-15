import dva from 'dva';

// import 'antd-mobile/dist/antd-mobile.less';
import './index.less';

import indexModel from './models/index';
import dynamicModel from './models/dynamic';
import routes from './routes';

// import VConsole from 'vconsole';
// new VConsole();

const app = dva();

app.model(indexModel.data);
app.model(dynamicModel.data);

app.router(routes);

document.getElementById('loading').innerHTML = '';

app.start('#root');
