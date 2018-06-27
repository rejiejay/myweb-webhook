const shell = require('shelljs');
const Mailer = require('./../app/utils/Mailer');

let serverHandleshell = () => new Promise((resolve, reject) => {
    // 将项目克隆下来
    if (shell.exec('git clone https://github.com/rejiejay/myweb-server.git').code !== 0) {
        return reject('Error: Git clone failed');
    }
    
    // 覆盖进去
    if (shell.cp('-rf', '/root/myweb-webhook/myweb-server', '/root/').code !== 0) {
        return reject('Error: copy myweb-server failed');
    }

    // 删除
    if (shell.rm('-rf', '/root/myweb-webhook/myweb-server').code !== 0) {
        return reject('Error: delete myweb-server failed');
    }

    shell.cd('/root/myweb-server');
    
    if (shell.exec('npm run eggstop').code !== 0) {
        return reject('Error: myweb-server stop failed');
    }
    
    if (shell.exec('npm run eggstart').code !== 0) {
        return reject('Error: myweb-server start failed');
    }
    
    return resolve(true);
});

let serverHandle = () => {
    serverHandleshell() // 同步 github myweb-client 项目
    .then(
        succeed => {
            Mailer('454766952@qq.com', 'Github(myweb-server)项目同步成功', 'Synchronize succeed project from Github(myweb-server)!')
            .then(
                succeed => console.log(`Synchronize succeed project from Github(myweb-server) and notify by email!`),
                MailerError => console.error(`Synchronize succeed project from Github(myweb-server) and can't notify by email! Because ${JSON.stringify(MailerError)}`),
            );
        },
        error => {
            Mailer('454766952@qq.com', 'Github(myweb-server)项目同步失败', error)
            .then(
                succeed => console.error(`Synchronize failure project from Github(myweb-server) and notify by email!`),
                MailerError => console.error(`Synchronize failure project from Github(myweb-server) and can't notify by email! Because ${JSON.stringify(MailerError)}`),
            )
        }
    );
}

serverHandle();
