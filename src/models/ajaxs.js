import basrFetch from './../utils/basrFetch';

const ajaxs = {
    getByListAndGroup: function() {
        return basrFetch.get('/dynamic/get/listandgroup', '动态信息列表以及分组');
    }
}

export default ajaxs;
