const Controller = require('egg').Controller;

// const shell = require('./../../shell/');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello ~~~ Welcome to Rejiejay webhook side and your place in home';
  }
  async webhookTest() {
    console.log('this.ctx', this.ctx);
    console.log('this.ctx.request', this.ctx.request);
    console.log('this.ctx.request.body', this.ctx.request.body);
    this.ctx.body = 'your place in webhookTest';
  }
}

module.exports = HomeController;
