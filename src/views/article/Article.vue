<template>
    <div class="article-view">
        <!--背景LOGO-->
        <logo-bg></logo-bg>
        <!--/背景LOGO-->
        <header-wrap :header_title="article ? article.article_title : '详情'"></header-wrap>
        <scroller
            lock-x
            scrollbar-y
            :backSpeed="200"
            :height="scroller_height"
            ref="scroller">
            <!--content slot-->
            <div class="article-inner" v-html="article.article_con"></div>
            <!--没有更多-->
            <with-out></with-out>
            <!--/没有更多-->
        </scroller>
    </div>
</template>
<script>
    import HeaderWrap from '../../components/header-wrap.vue'
    import LogoBg from '../../components/logo-bg.vue'
    import WithOut from '../../components/with-out.vue'
    import Util from '../../assets/lib/Util'
    import DEFAULT_CONFIG from '../../assets/lib/DEFAULT_CONFIG'
    import { Scroller } from 'vux'
    export default {
        name: 'article',
        data () {
            return {
                scroller_height: '',
                article: ''
            }
        },
        created () {
            this.$nextTick(() => {
                this.initScrollerVisualHeight(); /**初始化滚动可视高度*/
            });
        },
        methods: {
            /**初始化滚动可视高度*/
            initScrollerVisualHeight () {
                var nd_header = window.document.getElementsByClassName('header-wrap')[0];
                nd_header && (this.scroller_height = '-' + nd_header.offsetHeight);
            },
            /**获取文章详情*/
            fetchArticleDetailById () {
                this.$vux.loading.show({text: DEFAULT_CONFIG.LOADING_OR_TIME_OUT.LOADING_TEXT});
                Util.fetchArticleDetailById(this.$route.params._id).then( (result) => {
                    setTimeout(() => {
                        this.$vux.loading.hide();
                        if( result.status == 1 ) {
                            this.article = result.data;
                        }
                        this.$nextTick(() => {
                            setTimeout(() =>{
                                this.$refs.scroller.reset();
                            },520)
                        })
                    },DEFAULT_CONFIG.LOADING_OR_TIME_OUT.TIME_OUT)
                }).catch( (err) => {
                    this.$message({msg: '系统开小差'});
                });;
            }
        },
        activated: function () {
            this.article = '';
            this.fetchArticleDetailById();
        },
        deactivated: function () {

        },
        components: {
            HeaderWrap,
            Scroller,
            LogoBg,
            WithOut
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .article-view{
        background-color: $bgmc;
        .xs-container{
            height: 100%;
        }
    }
    .article-inner{
        @extend %pr;
        @extend %c6;
        @extend %bgwhite;
        font-size: j(13);
        padding: j(10) j(12) j(20);
        min-height: 100%;
        p{
            text-indent: 2em;
            margin: j(10) 0;
        }
    }
</style>
