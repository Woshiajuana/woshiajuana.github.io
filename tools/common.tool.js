
import path             from 'path'
import fs               from './../tools/fs.tool'

function setFun(content, filename) {
    fs.writeFileSync(path.join(__dirname, `./../config/${ filename }.js`), content)
}

function getIp() {
    let interfaces = require('os').networkInterfaces();
    for(let devName in interfaces){
        let iface = interfaces[devName];
        for(let i=0;i<iface.length;i++){
            let alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}

export default {
    setFun,
    getIp,
}
