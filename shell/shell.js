var shell = require('shelljs');

// if (shell.exec('node index.js').code !== 0) {
//     shell.echo('node index.js commit failed');
//     shell.exit(1);
// }

shell.cd('..')
console.log('显示位置', shell.pwd())
shell.cd('client')
console.log('显示位置', shell.pwd())

if (shell.exec('npm run build').code !== 0) {
    shell.echo('run build failed');
    shell.exit(1);
}
