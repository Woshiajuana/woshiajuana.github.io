import Vue from 'vue'
import Router from 'vue-router'
/**store参数变量*/
import types from '../store/mutation-types'
/**四大首页容器*/
import Index from '../views/index/Index.vue'
/**首页*/
import Home from '../views/home/Home.vue'
/**发现*/
import Find from '../views/find/Find.vue'
/**搜索*/
import Search from '../views/search/Search.vue'
import SearchIndex from '../views/search/children/SearchIndex.vue'
import SearchResult from '../views/search/children/SearchResult.vue'
/**文章*/
import Article from '../views/article/Article.vue'
/**留言*/
import Message from '../views/message/Message.vue'
/**关于*/
import About from '../views/about/About.vue'

Vue.use(Router);

const router = new Router({
    routes: [
        /**首页容器*/
        {
            path: '/',
            component: Index,
            children: [
                /**首页*/
                {
                    path: '/',
                    name: 'home',
                    component: Home,
                    meta: {
                        status: 1
                    }
                },
                /**发现*/
                {
                    path: '/find',
                    name: 'find',
                    component: Find,
                    meta: {
                        status: 2
                    }
                },
                /**留言*/
                {
                    path: '/message',
                    name: 'message',
                    component: Message,
                    meta: {
                        status: 3
                    }
                },
                /**关于*/
                {
                    path: '/about',
                    name: 'about',
                    component: About,
                    meta: {
                        status: 4
                    }
                }
            ]
        },
        /**搜索*/
        {
            path: '/search',
            component: Search,
            children: [
                {
                    path: '/',
                    name: 'search-index',
                    component: SearchIndex,
                    meta: {
                        status: 2
                    }
                },
                {
                    path: 'result/:key_words',
                    name: 'search-result',
                    component: SearchResult,
                    meta: {
                        status: 2
                    }
                }
            ]
        },
        /**文章*/
        {
            path: '/article/:_id',
            name: 'article',
            component: Article,
            meta: {
                status: 5
            }
        }
    ]
});

/**
 * 判断用户是否第一次打开APP，是否启动引导页面
 * 设置路由之间的跳转动画
 * */
router.beforeEach(( to, from, next ) => {
    let store = this.a.app.$store;
    if( store ){
        if( from.meta.status > to.meta.status ) store.commit( types.SET_ANIMATE_NAME, 'vux-pop-out' );
        else store.commit( 'SET_ANIMATE_NAME', 'vux-pop-in' );
    }
    // let is_not_first = Tool.dataToLocalStorageOperate.achieve('is_not_first');
    // if ( !is_not_first && to.path != '/guide' ) next('/guide');
    // else if( is_not_first && to.path == '/guide' ) next('/');
    // else next();
    next();
});

export default router
