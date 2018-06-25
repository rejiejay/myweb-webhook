const crypto = require('crypto');
const Controller = require('egg').Controller;
const config = require('./../../config/config.default.js');

const Mailer = require('./../utils/Mailer');

var process = require('child_process');

class HomeController extends Controller {
    /**
     * 客户端
     */
    async client() {
        let _this = this;

        if (this.validatingPayloads(this.ctx.request.body, this.ctx.request.header['x-hub-signature'])) { // 验证请求来自于github
            this.ctx.body = 'Validating success payloads from Github(myweb-client) and synchronizeing project now! Pay attention to your email.';

            process.exec('node shell/clientHandle', (error, stdout, stderr) => {
                if (error) {
                    return console.error(`exec error: ${error}`);
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            });
        } else { // 验证请求来自于github 失败, 并且以邮件通知
            await Mailer('454766952@qq.com', 'Github(myweb-client)项目验证请求失败', JSON.stringify(this.ctx.request.body))
            .then(
                succeed => _this.ctx.body = `Validating failure payloads from Github(myweb-client) and notify by email!`,
                error => _this.ctx.body = `Validating failure payloads from Github(myweb-client) and can't notify by email! Because ${JSON.stringify(error)}`,
            )
        }
    }
    /**
     * 服务端
     */
    async server() {
        let _this = this;

        if (this.validatingPayloads(this.ctx.request.body, this.ctx.request.header['x-hub-signature'])) { // 验证请求来自于github
            this.ctx.body = 'Validating success payloads from Github(myweb-server) and synchronizeing project now! Pay attention to your email.';

            process.exec('node shell/serverHandle', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            });
        } else { // 验证请求来自于github 失败, 并且以邮件通知
            await Mailer('454766952@qq.com', 'Github(myweb-server)项目验证请求失败', JSON.stringify(this.ctx.request.body))
            .then(
                succeed => _this.ctx.body = `Validating failure payloads from Github(myweb-server) and notify by email!`,
                error => _this.ctx.body = `Validating failure payloads from Github(myweb-server) and can't notify by email! Because ${JSON.stringify(error)}`,
            )
        }
    }
    /**
     * 验证 payload 来自于 github
     * @param {object} payload 请求体
     * @param {string} signature sha1=cd2c432c30f77dc3d008812010b76d06874771f1
     * @return {boolean} Validating payloads from GitHub
     */
    validatingPayloads(payload, signature) {
        let hash = crypto.createHmac('sha1', config.webhooksSecret.myweb_webhook);
        hash.update(JSON.stringify(payload));
  
        if (`sha1=${hash.digest('hex')}` == signature) {
            return true
        } else {
            return false
        }
    }
}

module.exports = HomeController;
