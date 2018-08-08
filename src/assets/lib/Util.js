/**
 * Created by Administrator on 2017/5/2.
 */
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = "application/json; charset=utf-8";
import router from '../../router/index'

const PackData = (data) => {
    return JSON.stringify(data)
};

const Util = function (win) {

    /**定义一系列变量*/
    var Util = {},
        MAIN_URL = '//www.owulia.com/blog/';

    /**根据是线上环境还是本地环境，选取不同的server_url的值*/
    if (win.location.href.indexOf('localhost') > -1){
        MAIN_URL = 'http://localhost:8088/';
    }

    /**文章列表*/
    Util.fetchArticleList = function ( page_num, page_size, article_type, key_words) {
        return Util.ajax("article/v1/h5/list", "POST",{  page_num, page_size, article_type, key_words });
    };

    /**文章详情*/
    Util.fetchArticleDetailById = function ( _id ) {
        return Util.ajax("article/v1/h5/info", "POST",{ _id });
    };

    /**标签列表*/
    Util.fetchTagList = function () {
        return Util.ajax("tag/v1/h5/list", "POST");
    };

    /**公用请求ajax的方式*/
    Util.ajax = (url, method, data) => {
        var isGet = false;
        if (method.match(/get/i) != null) isGet = true;
        ( url.indexOf('http://') > -1 ) && ( MAIN_URL = '' );
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: method,
                baseURL: MAIN_URL,
                timeout: 10 * 1000,
                data: isGet ? '' : PackData(data),
                params: isGet ? PackData(data) : '',
                responseType: 'json'
            }).then((res) => {
                if(res.data.status == -1) {
                    router.push('/login');
                    return;
                }
                return resolve(res.data)
            }).catch ((err) => {
                return reject(err)
            })
        })
    };
    return Util;
} (window);

export default Util;

