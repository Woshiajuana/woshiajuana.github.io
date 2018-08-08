<template>
    <div class="find-view">
        <!--背景LOGO-->
        <logo-bg></logo-bg>
        <!--/背景LOGO-->
        <header-wrap header_title="发现"></header-wrap>
        <scroller
            lock-x
            scrollbar-y
            :backSpeed="200"
            :height="scroller_height"
            ref="scroller">
            <!--content slot-->
            <div class="find-inner">
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
                <p>
                    额，什么鬼，怎么还不是我背了那么多遍的那道闭包题，让我想想。 setTimeout 会延迟执行，那么执行到 console.log 的时候，其实 i 已经变成 5 了，对，就是这样，这么简单怎么可能难到老子。
                </p>
            </div>
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
    import { Scroller } from 'vux'
    export default {
        name: 'find',
        data () {
            return {
                scroller_height: ''
            }
        },
        created () {
            this.$nextTick(() => {
                this.initScrollerVisualHeight(); /**初始化滚动可视高度*/
                setTimeout(() =>{
                    this.$refs.scroller && this.$refs.scroller.reset();
                },520)
            })
        },
        methods: {
            /**初始化滚动可视高度*/
            initScrollerVisualHeight () {
                var nd_bar = window.document.getElementsByClassName('nav-bar-wrap')[0],
                    nd_header = window.document.getElementsByClassName('header-wrap')[0];
                nd_bar && nd_header && (this.scroller_height = '-' + (nd_bar.offsetHeight + nd_header.offsetHeight));
            }
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
    .find-view{
        background-color: $bgmc;
        .xs-container{
            min-height: 100%;
        }
    }
    .find-inner{
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
