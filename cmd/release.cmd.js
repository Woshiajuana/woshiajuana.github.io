import WowCool                          from 'wow-cool'
import FsExtra                          from 'fs-extra'
import Path                             from 'path'

class Generate {

    constructor () {
        this.category = [];
        this.list = [];
    }

    loopDirectory () {
        let _that = this;
        (function walk(dir) {
            dir = dir || '.';
            let directory = Path.join(__dirname, '../src/file', dir);
            FsExtra.readdirSync(directory).forEach( (file) => {
                let full_path = Path.join(directory, file);
                let stat = FsExtra.statSync(full_path);
                let ext_name = Path.extname(full_path);
                if (stat.isFile() && ext_name === '.json') {
                    let file_path = Path.join('../src/file', dir, Path.basename(file, ext_name));
                    let full_file_path =  Path.join(directory, Path.basename(file, ext_name));
                    let file_json = require(full_file_path);
                    file_path = file_path.replace(/\\/g, '/');
                    file_json.api = file_path;
                    let file_category = file_json.type || 'Other';
                    _that.list.push(file_json);
                    _that.category.indexOf(file_category) === -1 && _that.category.push(file_category);
                } else if (stat.isDirectory()) {
                    let sub_dir = Path.join(dir, file);
                    walk(sub_dir);
                }
            })
        })();
        return this;
    }

    _unique (array) {
        let n = [];
        for(let i = 0; i < array.length; i++){
            if (n.indexOf(array[i]) === -1) n.push(array[i]);
        }
        return n;
    }

    start () {
        console.log(`即将生成mock数据`);
        FsExtra.createWriteStream('./src/mock/list.json',{defaultEncoding:'utf8'});
        FsExtra.writeFileSync('./src/mock/list.json', JSON.stringify(this.list, null, 4));
        FsExtra.createWriteStream('./src/mock/category.json',{defaultEncoding:'utf8'});
        FsExtra.writeFileSync('./src/mock/category.json', JSON.stringify(this.category, null, 4));
        console.log(`生成mock数据操作完成`);
        return this;
    }

}

export default((arr_parameter) => new Promise((resolve, reject) => {
    let num_app_index = WowCool.findFirstIndexForArr(arr_parameter, (item) => {
        return item === '--release' || item === '-r';
    });
    if (num_app_index) return resolve();
    const generate = new Generate();
    generate.loopDirectory().start();
    return resolve();
}));







