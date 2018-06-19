var process = require('child_process');

console.log('正在启动服务...\nclient: http://127.0.0.1:8888;\nserver: http://127.0.0.1:1938;');

process.exec('npm run serverDev', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});

process.exec('npm run clientStart', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});
