module.exports = function () {
    let isPC = true;

    ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod'].map(val => {
        if (window.navigator.userAgent.indexOf(val) > 0) {
            isPC = false;
        }
        return val;
    })

    if (isPC) {
        return false
    }

    return true
}
