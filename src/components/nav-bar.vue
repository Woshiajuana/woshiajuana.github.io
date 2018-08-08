<template>
    <tabbar class="nav-bar-wrap">
        <tabbar-item :selected="$route.name == 'home'" link="/">
            <svg slot="icon" class="nav-item nav-item-1">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#home-icon"></use>
            </svg>
            <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name == 'find'" link="/find">
            <svg slot="icon" class="nav-item nav-item-2">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#find-icon"></use>
            </svg>
            <span slot="label">发现</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name == 'message'" link="/message">
            <svg slot="icon" class="nav-item nav-item-3">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#message-icon"></use>
            </svg>
            <span slot="label">留言</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name == 'about'" link="/about">
            <svg slot="icon" class="nav-item nav-item-4">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#about-icon"></use>
            </svg>
            <span slot="label">关于</span>
        </tabbar-item>
    </tabbar>
</template>
<script>
    import { Tabbar, TabbarItem } from 'vux'
    export default {
        name: 'nav-bar',
        components: {
            Tabbar,
            TabbarItem
        }
    }
</script>
<style lang="scss">
    @import '../assets/scss/define';
    .nav-bar-wrap{
        background-color: #f8f5fc;
        height: j(50);
        .weui-tabbar__icon{
            width: j(27);
            height: j(27);
        }
        .weui-tabbar__label{
            line-height: inherit;
            font-size: j(10);
        }
        .nav-item{
            fill: #999;
            &.nav-item-1{
                margin-top: j(2);
                width: j(25);
                height: j(25);
            }
            &.nav-item-2{
                margin-top: j(4);
                width: j(20);
                height: j(20);
            }
            &.nav-item-3{
                margin-top: j(3);
                width: j(22);
                height: j(22);
            }
            &.nav-item-4{
                margin-top: j(1);
                width: j(25);
                height: j(25);
            }
        }
        .weui-tabbar__item{
            padding: j(3) 0 0 0;
            span{
                color: #999 !important;
            }
        }
        .weui-bar__item_on{
            .nav-item{
                fill: $mc;
            }
            span{
                color: $mc !important;
            }
        }
    }

</style>
