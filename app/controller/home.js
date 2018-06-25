const crypto = require('crypto');

const Controller = require('egg').Controller;
const config = require('./../../config/config.default.js');

// const shell = require('./../../shell/');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello ~~~ Welcome to Rejiejay webhook side and your place in home';
  }

  async webhookTest() {
    /**
     * 预约记录
     * @param {object} payload 请求体
     * @param {string} signature sha1=cd2c432c30f77dc3d008812010b76d06874771f1
     * @return {boolean} Validating payloads from GitHub
     */
    let validatingPayloads = (payload, signature) => {
      let hash = crypto.createHmac('sha1', config.webhooksSecret.myweb_webhook);
      hash.update(JSON.stringify(payload));

      if (`sha1=${hash.digest('hex')}` == signature) {
        return true
      } else {
        return false
      }
    }

    if (validatingPayloads(this.ctx.request.body, this.ctx.request.header['x-hub-signature'])) { // 成功验证请求来自于github
      this.ctx.body = 'Validating successful payloads from GitHub!';
    } else {
      this.ctx.body = 'Validating failure payloads from GitHub!';
    }
  }
}

module.exports = HomeController;
