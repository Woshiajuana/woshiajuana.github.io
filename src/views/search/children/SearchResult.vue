<template>
    <div class="search-result" :class="{'search-null-bg': !article_arr}">
        <!--背景LOGO-->
        <logo-bg></logo-bg>
        <!--/背景LOGO-->
        <null-img v-if="!article_arr"></null-img>
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
            <div class="search-result-inner"
                 :style="{height: article_total < 6 ? '100%' : 'auto'}">
                <null-img v-if="article_total === 0"></null-img>
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
            <!--调用计算属性，比较low的一种解决方法-->
            <div style="display: none">{{keyWordsCom}}</div>
            <!--/调用计算属性-->
        </scroller>
        <!--返回顶部-->
        <return-top v-if="article_arr" :top_dir="top_dir" @returnTop="returnTopHandle"></return-top>
        <!--/返回顶部-->
    </div>
</template>
<script>
    import ArticleListItem from '../../../components/article-list-item.vue'
    import DEFAULT_CONFIG from '../../../assets/lib/DEFAULT_CONFIG'
    import ReturnTop from '../../../components/return-top.vue'
    import LogoBg from '../../../components/logo-bg.vue'
    import NullImg from '../../../components/null-img.vue'
    import WithOut from '../../../components/with-out.vue'
    import { Scroller, Spinner } from 'vux'
    import Util from '../../../assets/lib/Util'
    import Tool from '../../../assets/lib/Tool'
    export default {
        name: 'search-result',
        data () {
            return {
                is_fade_in: false,
                page_num: 1,
                page_size: 10,
                article_total: '',
                article_arr: 6,
                scroller_height: '',
                key_words: this.$store.state.key_words,
                top_dir: 0,
                scroller_status: {
                    pullupStatus: 'default',
                    pulldownStatus: 'default'
                }
            }
        },
        computed: {
            keyWordsCom () {
                this.key_words = this.$store.state.key_words;
            }
        },
        watch: {
            /**监听路由变化，过滤文章数据*/
            'key_words': function () {
                this.$vux.loading.show({text: DEFAULT_CONFIG.LOADING_OR_TIME_OUT.LOADING_TEXT});
                this.fetchArticleList( 1, () => {
                    this.$nextTick(() => { this.$refs.scroller && this.$refs.scroller.reset({top:0}); });
                    this.$vux.loading.hide();
                });
            }
        },
        created () {
            this.$nextTick(() => { this.initScrollerVisualHeight(); /**初始化滚动可视高度*/ });
            this.$vux.loading.show({text: DEFAULT_CONFIG.LOADING_OR_TIME_OUT.LOADING_TEXT});
            this.fetchArticleList( 1, () => {/**获取文章列表*/this.$vux.loading.hide();});
        },
        methods: {
            /**获取文章列表*/
            fetchArticleList (page_num, callback) {
                var tag = this.$route.query.tag || '',
                    key_words = this.$route.params.key_words;
                Util.fetchArticleList( page_num, this.page_size, tag, key_words ).then((result) => {
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
                var nd_bar = window.document.getElementsByClassName('nav-bar-wrap')[0],
                    nd_header = window.document.getElementsByClassName('search-header')[0];
                nd_header && (this.scroller_height = '-' + nd_header.offsetHeight);
                nd_bar && (this.scroller_height = '-' + (nd_bar.offsetHeight + nd_header.offsetHeight));
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
                this.fetchArticleList( page_num, () => {
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
            }
        },
        components: {
            ArticleListItem,
            Scroller,
            ReturnTop,
            Spinner,
            LogoBg,
            NullImg,
            WithOut
        }
    }
</script>
<style lang="scss">
    @import "../../../assets/scss/define";
    .search-result{
        @extend %pr;
        background-color: $bgmc;
        &.search-null-bg{
            @extend %bgwhite;
        }
        .logo-bg{
            top: j(115);
        }
    }
    .search-result-inner{
        background-color: #fff;
    }
</style>
