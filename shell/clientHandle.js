const shell = require('shelljs');

const Consequencer = require('./app/utils/Consequencer');

let clientHandleshelljs = () => new Promise((resolve, reject) => {
    shell.cd('/root/myweb-client');
    
    if (shell.exec('git fetch https://github.com/rejiejay/myweb-client.git').code !== 0) {
        return reject('Error: Git fetch failed');
    }
    
    if (shell.mv('-n', 'public', 'myweb-assets').code !== 0) {
        return reject('Error: modify myweb-client/public to myweb-assets failed');
    }
    
    if (shell.cp('-rf', 'myweb-assets', '/root/').code !== 0) {
        return reject('Error: copy myweb-assets top myweb-assets failed');
    }
    
    if (shell.mv('-n', 'myweb-assets', 'public').code !== 0) {
        return reject('Error: modify myweb-client/public to myweb-assets failed');
    }

    return resolve(true);
});

let clientHandle = () => {
    let handleFeedback = clientHandleshelljs() // 同步 github myweb-client 项目
    .then(
        succeed => Consequencer.success(succeed, 'Synchronize succeed project from Github(myweb-client)!'),
        error => Consequencer.error(error)
    );

    if (handleFeedback.result === 0) { // Github(myweb-client) 项目同步失败, 并且以邮件通知
        Mailer('454766952@qq.com', 'Github(myweb-client)项目同步失败', handleFeedback.message)
        .then(
            succeed => console.error(`Synchronize failure project from Github(myweb-client) and notify by email!`),
            MailerError => console.error(`Synchronize failure project from Github(myweb-client) and can't notify by email! Because ${JSON.stringify(MailerError)}`),
        );
    } else { // Github(myweb-client) 项目同步成功, 输出到log
        Mailer('454766952@qq.com', 'Github(myweb-client)项目同步成功', handleFeedback.message)
        .then(
            succeed => console.log(`Synchronize succeed project from Github(myweb-client) and notify by email!`),
            MailerError => console.error(`Synchronize succeed project from Github(myweb-client) and can't notify by email! Because ${JSON.stringify(MailerError)}`),
        );
    }
}

module.exports = clientHandle;
