const shell = require('shelljs');
const Mailer = require('./../app/utils/Mailer');

let clientHandleshelljs = () => new Promise((resolve, reject) => {
    // 将项目克隆下来
    if (shell.exec('git clone https://github.com/rejiejay/myweb-client.git').code !== 0) {
        return reject('Error: Git clone failed');
    }
    
    // 修改名字
    if (shell.mv('-n', '/root/myweb-webhook/myweb-client/assets', '/root/myweb-webhook/myweb-client/myweb-assets').code !== 0) {
        return reject('Error: modify myweb-client/public to myweb-assets failed');
    }
    
    // 覆盖进去
    if (shell.cp('-rf', '/root/myweb-webhook/myweb-client/myweb-assets', '/root/').code !== 0) {
        return reject('Error: copy myweb-assets to myweb-assets failed');
    }

    // 删除
    if (shell.rm('-rf', '/root/myweb-webhook/myweb-client').code !== 0) {
        return reject('Error: delete myweb-client failed');
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
