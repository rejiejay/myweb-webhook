const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello ~~~ Welcome to Rejiejay server side and your place in home';
  }
}

module.exports = HomeController;
