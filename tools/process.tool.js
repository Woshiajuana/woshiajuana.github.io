/**
 * 获取命令行参数
 * */
export default  {
    getParameter () {
        return process.argv.splice(2);
    }
};
