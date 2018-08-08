<template>
    <div class="search-result" :class="{'search-null-bg': !article_arr}">
        <!--背景LOGO-->
        <logo-bg></logo-bg>
        <!--/背景LOGO-->
        <null-img v-if="!article_arr"></null-img>
        <scroller
            v-else
            lock-x
            scrollbar-y
            use-pulldown
            use-pullup
            :backSpeed="200"
            :height="scroller_height"
            @on-pulldown-loading="refreshHandle"
            @on-pullup-loading="loadMoreHandle"
            @on-scroll="scrollHandle"
            ref="scroller" v-model="scroller_status">
            <!--content slot-->
            <div class="search-result-inner">
                <article-list-item v-for="(item,index) in article_arr" :key="index"></article-list-item>
            </div>
            <!--pulldown slot-->
            <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
                <span v-show="scroller_status.pulldownStatus === 'default'"></span>
                <span class="pulldown-arrow" v-show="scroller_status.pulldownStatus === 'down' || scroller_status.pulldownStatus === 'up'" :class="{'rotate': scroller_status.pulldownStatus === 'up'}">↓</span>
                <span v-show="scroller_status.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
            </div>
            <!--pullup slot-->
            <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                <span v-show="scroller_status.pullupStatus === 'default'"></span>
                <span class="pullup-arrow" v-show="scroller_status.pullupStatus === 'default' || scroller_status.pullupStatus === 'up' || scroller_status.pullupStatus === 'down'" :class="{'rotate': scroller_status.pullupStatus === 'down'}">↑</span>
                <span v-show="scroller_status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
            </div>
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
    import { Scroller, Spinner } from 'vux'
    export default {
        name: 'search-result',
        data () {
            return {
                article_arr: 10,
                is_open: false,
                scroller_height: '',
                top_dir: 0,
                scroller_status: {
                    pullupStatus: 'default',
                    pulldownStatus: 'default'
                }
            }
        },
        created () {
            this.$nextTick(() => {
                this.initScrollerVisualHeight(); /**初始化滚动可视高度*/
                setTimeout(()=>{
                    this.$refs.scroller.reset();
                },320)
            })
        },
        methods: {
            /**初始化滚动可视高度*/
            initScrollerVisualHeight () {
                var nd_bar = window.document.getElementsByClassName('nav-bar-wrap')[0],
                    nd_header = window.document.getElementsByClassName('search-header')[0];
                nd_header && (this.scroller_height = '-' + nd_header.offsetHeight);
                nd_bar && (this.scroller_height = '-' + (nd_bar.offsetHeight + nd_header.offsetHeight));
            },
            /**下拉刷新*/
            refreshHandle () {
                setTimeout(() => {
                    this.article_arr = 10;
                    this.$refs.scroller && this.$refs.scroller.donePulldown();
                }, DEFAULT_CONFIG.SCROLL_TIME)
            },
            /**上拉加载*/
            loadMoreHandle () {
                setTimeout(() => {
                    this.article_arr += 5;
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.$refs.scroller && this.$refs.scroller.donePullup();
                        }, 10)
                    })
                }, DEFAULT_CONFIG.SCROLL_TIME)
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
            }
        },
        components: {
            ArticleListItem,
            Scroller,
            ReturnTop,
            Spinner,
            LogoBg,
            NullImg
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
</style>
