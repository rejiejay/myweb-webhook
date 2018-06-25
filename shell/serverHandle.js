const shell = require('shelljs');

const Consequencer = require('./app/utils/Consequencer');

let serverHandleshell = () => new Promise((resolve, reject) => {
    shell.cd('/root/myweb-server');
    
    if (shell.exec('git fetch https://github.com/rejiejay/myweb-server.git').code !== 0) {
        return reject('Error: Git fetch failed');
    }
    
    if (shell.exec('npm run stop').code !== 0) {
        return reject('Error: myweb-server stop failed');
    }
    
    if (shell.exec('npm run start').code !== 0) {
        return reject('Error: myweb-server start failed');
    }
    
    return resolve(true);
});

let serverHandle = () => {
    let handleFeedback = serverHandleshell() // 同步 github myweb-client 项目
    .then(
        succeed => Consequencer.success(succeed, 'Synchronize succeed project from Github(myweb-server)!'),
        error => Consequencer.error(error)
    );

    if (handleFeedback.result === 0) { // Github(myweb-server) 项目同步失败, 并且以邮件通知
        Mailer('454766952@qq.com', 'Github(myweb-server)项目同步失败', handleFeedback.message)
        .then(
            succeed => console.error(`Synchronize failure project from Github(myweb-server) and notify by email!`),
            MailerError => console.error(`Synchronize failure project from Github(myweb-server) and can't notify by email! Because ${JSON.stringify(MailerError)}`),
        )
    } else { // Github(myweb-server) 项目同步成功, 并且以邮件通知
        Mailer('454766952@qq.com', 'Github(myweb-server)项目同步成功', handleFeedback.message)
        .then(
            succeed => console.log(`Synchronize succeed project from Github(myweb-server) and notify by email!`),
            MailerError => console.error(`Synchronize succeed project from Github(myweb-server) and can't notify by email! Because ${JSON.stringify(MailerError)}`),
        );
    }
}

module.exports = serverHandle;
