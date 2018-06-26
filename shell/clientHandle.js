const shell = require('shelljs');
const Mailer = require('./../app/utils/Mailer');

let clientHandleshelljs = () => new Promise((resolve, reject) => {
    shell.cd('/root/myweb-client');
    
    if (shell.exec('git fetch https://github.com/rejiejay/myweb-client.git').code !== 0) {
        return reject('Error: Git fetch failed');
    }
    
    if (shell.mv('-n', 'assets', 'myweb-assets').code !== 0) {
        return reject('Error: modify myweb-client/public to myweb-assets failed');
    }
    
    if (shell.cp('-rf', 'myweb-assets', '/root/').code !== 0) {
        return reject('Error: copy myweb-assets top myweb-assets failed');
    }
    
    if (shell.mv('-n', 'myweb-assets', 'assets').code !== 0) {
        return reject('Error: modify myweb-client/public to myweb-assets failed');
    }

    return resolve(true);
});

let clientHandle = () => {
    clientHandleshelljs() // 同步 github myweb-client 项目
    .then(
        succeed => {
            Mailer('454766952@qq.com', 'Github(myweb-client)项目同步成功', 'Synchronize succeed project from Github(myweb-client)!')
            .then(
                succeed => console.log(`Synchronize succeed project from Github(myweb-client) and notify by email!`),
                MailerError => console.error(`Synchronize succeed project from Github(myweb-client) and can't notify by email! Because ${JSON.stringify(MailerError)}`),
            );
        },
        error => {
            Mailer('454766952@qq.com', 'Github(myweb-client)项目同步失败', `Synchronize failure project from Github(myweb-client)! Because ${error}`)
            .then(
                succeed => console.error(`Synchronize failure project from Github(myweb-client) and notify by email!`),
                MailerError => console.error(`Synchronize failure project from Github(myweb-client) and can't notify by email! Because ${JSON.stringify(MailerError)}`),
            );
        }
    );
}

clientHandle();
