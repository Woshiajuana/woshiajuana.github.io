/**
 * 读取文件，写入文件
 * */
import fs from 'fs-extra'
export default {
    readFileSync (path) {
        return fs.readFileSync(path,"utf-8");
    },
    writeFileSync (path, content) {
        return fs.writeFileSync(path, content, "utf-8");
    }
};
