<template>
    <div class="home-view">
        <!--背景LOGO-->
        <logo-bg></logo-bg>
        <!--/背景LOGO-->
        <!--主体内容-->
        <div class="home-wrap" :class="{ 'active': is_open }">
            <!--数据-->
            <scroller
                lock-x
                scrollbar-y
                use-pulldown
                use-pullup
                :backSpeed="300"
                :height="scroller_height"
                @on-pulldown-loading="refreshHandle"
                @on-pullup-loading="loadMoreHandle"
                @on-scroll="scrollHandle"
                ref="scroller" v-model="scroller_status">
                <!--content slot-->
                <div class="home-inner"
                     :style="{height: article_total < 5 ? '100%' : 'auto'}">
                    <header class="home-header">
                        <div class="home-header-top">
                            <div class="home-header-top-date" @click="dateClickHandle">
                                <div class="home-header-top-date-con">
                                    <span class="home-header-top-date-con-day">{{dayComputed}}</span>
                                    <svg class="home-header-date-icon">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#date-icon"></use>
                                    </svg>
                                </div>
                                {{dateComputed}}
                            </div>
                            <svg @click="is_open = !is_open" slot="icon" class="home-header-top-filter-btn">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#filter-icon"></use>
                            </svg>
                        </div>
                        <a href="#/search" class="home-header-search-link">搜索文章</a>
                    </header>
                    <null-img v-if="article_total===0"></null-img>
                    <div class="home-con">
                        <article-list-item
                            v-for="(item,index) in article_arr"
                            :key="index"
                            :is_fade_in="item.is_fade_in"
                            :_id="item._id"
                            :article_title="item.article_title"
                            :article_time="item.article_time"
                            :article_type="item.article_type">
                        </article-list-item>
                    </div>
                </div>
                <!--pulldown slot-->
                <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
                    <span v-show="scroller_status.pulldownStatus === 'default'"></span>
                    <span class="pulldown-arrow" v-show="scroller_status.pulldownStatus === 'down' || scroller_status.pulldownStatus === 'up'" :class="{'rotate': scroller_status.pulldownStatus === 'up'}">↓</span>
                    <span v-show="scroller_status.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
                </div>
                <!--pullup slot-->
                <div slot="pullup" v-show="article_arr.length != article_total" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                    <span v-show="scroller_status.pullupStatus === 'default'"></span>
                    <span class="pullup-arrow" v-show="scroller_status.pullupStatus === 'default' || scroller_status.pullupStatus === 'up' || scroller_status.pullupStatus === 'down'" :class="{'rotate': scroller_status.pullupStatus === 'down'}">↑</span>
                    <span v-show="scroller_status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
                </div>
                <!--没有更多-->
                <with-out v-if="article_total != 0 &&article_total === article_arr.length"></with-out>
                <!--/没有更多-->
            </scroller>
            <!--/数据-->
            <!--遮罩-->
            <transition name="fade">
                <div class="home-filter-mask" v-show="is_open" @click="is_open = false"></div>
            </transition>
            <!--/遮罩-->
            <!--过滤筛选-->
            <div class="home-filter-wrap">
                <header-wrap :is_h2="true" header_title="分类" :is_left_click="true" @headerLeftClick="headerLeftClickHandle"></header-wrap>
                <!--过滤主体-->
                <scroller
                    lock-x
                    scrollbar-y
                    :backSpeed="300"
                    :height="scroller_height"
                    ref="filter_scroller">
                    <!--content slot-->
                    <dl class="home-filter-inner">
                        <dl class="home-filter-item"><a class="home-filter-item-link" @click="filterClickHandle('/?tag=all')" href="javascript:;">全部文章</a></dl>
                        <dl class="home-filter-item"
                            v-for="(item,index) in tag_arr"
                            :key="index"><a @click="filterClickHandle('/?tag=' + item.tag_name)" class="home-filter-item-link" href="javascript:;">{{item.tag_name}}</a></dl>
                     </dl>
                </scroller>
                <!--/过滤主体-->
            </div>
            <!--/过滤筛选-->
        </div>
        <!--/主体内容-->
        <!--返回顶部-->
        <return-top :top_dir="top_dir" @returnTop="returnTopHandle"></return-top>
        <!--/返回顶部-->
    </div>
</template>
<script>
    import GestureMobile from '../../assets/lib/GestureMobile'
    import ArticleListItem from '../../components/article-list-item.vue'
    import ReturnTop from '../../components/return-top.vue'
    import HeaderWrap from '../../components/header-wrap.vue'
    import LogoBg from '../../components/logo-bg.vue'
    import WithOut from '../../components/with-out.vue'
    import NullImg from '../../components/null-img.vue'
    import { Scroller, Spinner } from 'vux'
    import DEFAULT_CONFIG from '../../assets/lib/DEFAULT_CONFIG'
    import Util from '../../assets/lib/Util'
    import Tool from '../../assets/lib/Tool'
    export default {
        name: 'home',
        data () {
            return {
                is_fade_in: false,
                page_num: 1,
                page_size: 10,
                article_total: '',
                article_arr: 5,
                is_open: false,
                scroller_height: '',
                top_dir: 0,
                tag_arr: [],
                article_type: this.$route.query.tag,
                scroller_status: {
                    pullupStatus: 'default',
                    pulldownStatus: 'default'
                }
            }
        },
        watch: {
            /**监听路由变化，过滤文章数据*/
            'article_type': function () {
                this.$vux.loading.show({text: DEFAULT_CONFIG.LOADING_OR_TIME_OUT.LOADING_TEXT});
                this.fetchArticleList( 1, () => {
                    this.$nextTick(() => { this.$refs.scroller && this.$refs.scroller.reset({top:0}); });
                    this.$vux.loading.hide();
                });
            }
        },
        computed: {
            /**日期计算属性*/
            dateComputed () {
                return Tool.format('yyyy-MM-dd');
            },
            /**几号计算属性*/
            dayComputed () {
                return Tool.format('dd');
            }
        },
        created () {
            this.fetchTagList();/**获取文章类别*/
            this.$vux.loading.show({text: DEFAULT_CONFIG.LOADING_OR_TIME_OUT.LOADING_TEXT});
            this.fetchArticleList( 1, () => {/**获取文章列表*/this.$vux.loading.hide();});
            this.$nextTick(() => {
                this.bindGestureMobile(); /**绑定手势*/
                this.initScrollerVisualHeight(); /**初始化滚动可视高度*/
            })
        },
        methods: {
            /**获取文章列表*/
            fetchArticleList (page_num, callback) {
                var tag = this.$route.query.tag || '';
                Util.fetchArticleList( page_num, this.page_size, tag ).then((result) => {
                    setTimeout(() => {
                        if(result.status == 1) {
                            var data = result.data;
                            this.article_total = data.total;
                            this.page_num = page_num;
                            data.arr.forEach((item)=>{ item.is_fade_in = this.is_fade_in; });
                            this.article_arr = page_num == 1 ? data.arr : [...this.article_arr,...data.arr];
                            this.article_arr.length === this.article_total ? (this.$refs.scroller && this.$refs.scroller.disablePullup()) : (this.$refs.scroller && this.$refs.scroller.enablePullup());
                            this.$nextTick(() => { this.$refs.scroller && this.$refs.scroller.reset(); });
                        }
                        callback && callback();
                    },DEFAULT_CONFIG.SCROLL_TIME);
                }).catch( (err) => {
                    this.$message({msg: '系统开小差'});
                    callback && callback();
                });
            },
            /**初始化滚动可视高度*/
            initScrollerVisualHeight () {
                var nd_bar = window.document.getElementsByClassName('nav-bar-wrap')[0];
                nd_bar && (this.scroller_height = '-' + nd_bar.offsetHeight);
            },
            /**绑定手势*/
            bindGestureMobile () {
                let _this = this;
                GestureMobile(this.$el,{
                    leftCallBackFun () { _this.is_open = true; },
                    rightCallBackFun () { _this.is_open = false; }
                });
            },
            /**下拉刷新*/
            refreshHandle () {
                this.is_fade_in = false;
                this.fetchArticleList( 1, () => {
                    this.$refs.scroller && this.$refs.scroller.donePulldown();
                    if(this.article_arr.length === this.article_total){
                        this.$refs.scroller && this.$refs.scroller.disablePullup();
                    }else{
                        this.$refs.scroller && this.$refs.scroller.enablePullup();
                    }

                });
            },
            /**上拉加载*/
            loadMoreHandle () {
                var page_num = this.page_num + 1;
                this.is_fade_in = true;
                this.fetchArticleList(page_num, () => {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.$refs.scroller && this.$refs.scroller.donePullup();
                        }, 10)
                    })
                });
            },
            /**滚动页面回调事件*/
            scrollHandle ( { top } ) {
                this.top_dir = top;
            },
            /**回顶部事件*/
            returnTopHandle () {
                this.$refs.scroller.reset({top:0});
                this.top_dir = 0;
            },
            /**过滤页面回退事件*/
            headerLeftClickHandle () {
                this.is_open = false;
            },
            /**日期筛选敬请期待*/
            dateClickHandle () {
                this.$message({msg: '日期筛选敬请期待'});
            },
            /**获取文章类别*/
            fetchTagList () {
                Util.fetchTagList().then( (result) => {
                    if( result.status == 1 ) {
                        this.tag_arr = result.data.arr;
                        this.$nextTick(() => { this.$refs.filter_scroller && this.$refs.filter_scroller.reset(); });
                        console.log(this.tag_arr)
                    }
                }).catch( (err) => {
                    this.$message({msg: '系统开小差'});
                });;
            },
            /**筛选文章点击事件*/
            filterClickHandle (url) {
                this.is_open = false;
                this.$router.push(url);
                this.article_type = this.$route.query.tag;
            }
        },
        components: {
            Scroller,
            Spinner,
            HeaderWrap,
            ArticleListItem,
            ReturnTop,
            LogoBg,
            WithOut,
            NullImg
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .home-view{
        @extend %oh;
        background-color: $bgmc;
    }
    .home-wrap{
        @extend %pa;
        @extend %t0;
        @extend %r0;
        @extend %l0;
        @extend %b0;
        @include tst(all,.5s);
        &.active{
            @include tft(translate3d(-83%,0,0))
        }
    }
    .home-inner{
        @extend %pr;
    }
    .home-inner{
        @extend %bgwhite;
    }
    .home-header{
        @extend %oh;
        height: j(100);
        background-color: $mc;
        padding: j(10) 0;
    }
    .home-header-search-link{
        @extend %db;
        @extend %tac;
        @extend %bgwhite;
        @extend %c3;
        margin: j(10) j(16);
        height: j(36);
        line-height: j(36);
        border-radius: j(36);
        box-shadow: 0 j(3) j(3) 0 rgba(0,0,0,.2);
        font-size: j(14);
    }
    .home-header-top{
        @extend %pr;
        color: #f2f2f2;
        height: j(35);
        line-height: j(35);
    }
    .home-header-top-date{
        @extend %pa;
        @extend %t0;
        @extend %cp;
        @extend %h100;
        left: j(20);
        font-size: j(14);
        padding-left: j(30);
        &:after{
            @extend %pa;
            @extend %t50;
            margin-top: j(-3);
            right: j(-15);
            content: '';
            width: 0;
            height: 0;
            border-left: j(5) solid transparent;
            border-right: j(5) solid transparent;
            border-top: j(6) solid #f2f2f2;
        }
    }
    .home-header-top-date-con{
        @extend %pa;
        @extend %t50;
        @extend %l0;
        margin-top: j(-12);
        width: j(24);
        height: j(24);
    }
    .home-header-top-date-con-day{
        @extend %pa;
        @extend %tac;
        @extend %b0;
        @extend %l0;
        @extend %r0;
        @extend %cfff;
        font-size: j(12);
        line-height: 1.4;
    }
    .home-header-date-icon{
        @extend %pa;
        @extend %t0;
        @extend %b0;
        @extend %l0;
        @extend %r0;
        @extend %w100;
        @extend %h100;
        fill: #fff;
    }
    .home-header-top-filter-btn{
        @extend %pa;
        @extend %cp;
        @extend %t50;
        right: j(20);
        margin-top: j(-12);
        width: j(25);
        height: j(25);
        fill: #f2f2f2;
    }
    .home-filter-wrap{
        @extend %pa;
        @extend %b0;
        @extend %t0;
        width: 83%;
        right: -83%;
        background-color: #f2f2f2;
    }
    .home-filter-mask{
        @extend %pa;
        @extend %t0;
        @extend %b0;
        @extend %r0;
        @extend %l0;
        background: rgba(55,58,71,.9);
    }
    .home-filter-close{
        z-index: 1;
        @extend %pa;
        @extend %cp;
        @include br(50%);
        top: j(16);
        left: j(16);
        width: j(20);
        height: j(20);
        fill: #999;
    }
    .home-filter-inner{
        @extend %pr;
        @extend %tac;
        padding: j(20) 0 j(80);
    }
    .home-filter-title{
        font-size: j(18);
        margin-bottom: j(10);
    }
    .home-filter-item{
        font-size: j(14);
        height: j(36);
        line-height: j(36);
    }
    .home-filter-item-link{
        @extend %c3;
    }
</style>
