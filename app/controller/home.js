const Controller = require('egg').Controller;

// const shell = require('./../../shell/');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello ~~~ Welcome to Rejiejay webhook side and your place in home';
  }
  async webhookTest() {
    console.log(this.ctx)
    this.ctx.body = 'your place in webhookTest';
  }
}

module.exports = HomeController;
