<template>
    <a class="article-list-item animated"
       :class="{fadeIn: is_fade_in}"
       :href="'#/article/' + _id">
        <div class="article-list-item-inner">
            <div class="article-list-item-img" :style="{backgroundColor: article_title ? getRandomColor : '#f2f2f2'}"></div>
            <h2 class="article-list-item-title" :style="{backgroundColor: article_title ? 'transparent' : '#f2f2f2'}">{{article_title}}</h2>
            <p class="article-list-item-time" :style="{backgroundColor: article_title ? 'transparent' : '#f2f2f2'}">{{article_time | timeFilter}}</p>
            <div class="article-list-item-info">
                <span class="article-list-item-type" :style="{backgroundColor: article_title ? 'transparent' : '#f2f2f2'}">{{article_type}}</span>
            </div>
        </div>
    </a>
</template>
<script>
    import Tool from '../assets/lib/Tool'
    export default {
        name: 'article-list-item',
        props: [ 'article_title', 'article_time', 'article_type', 'is_fade_in', '_id'],
        filters: {
            timeFilter (time) {
                if(!time){
                    return '';
                }else{
                    return Tool.format('yyyy-MM-dd',new Date(time));
                }
            }
        },
        computed: {
            getRandomColor () {
                return Tool.getRandomColor();
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/scss/define';
    .article-list-item{
        @extend %db;
        @extend %pr;
        padding-left: j(30);
        background-color: #fff;
        &:first-child{
            .article-list-item-inner{
                border-top: none;
            }
        }
    }
    .article-list-item-inner{
        height: j(60);
        padding: j(30) j(20) j(30) j(76);
        border-top: 1px solid #ddd;
    }
    .animated {
        animation-duration: 1s;
        animation-fill-mode: both;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .fadeIn {
        animation-name: fadeIn;
    }
    .article-list-item-img{
        @extend %pa;
        @extend %t50;
        @extend %oh;
        @include br(10px);
        width: j(60);
        height: j(60);
        left: j(30);
        margin-top: j(-30);
        img{
            @extend %db;
            @extend %w100;
            @extend %h100;
        }
    }
    .article-list-item-title{
        @extend %c3;
        @extend %fwn;
        @extend %twno;
        margin: j(5) 0;
        height: j(20);
        line-height: j(20);
        font-size: j(16);
    }
    .article-list-item-time{
        @extend %c9;
        font-size: j(12);
        height: j(20);
        max-width: j(100);
        line-height: j(20);
    }
    .article-list-item-info{
        @extend %pa;
        color: #999;
        font-size: j(12);
        right: j(20);
        bottom: j(20);
        height: j(20);
        line-height: j(20);
        min-width: j(80);
    }
    .article-list-item-type{
        @extend %dib;
        @extend %tar;
        min-width: j(80);
        height: j(16);
    }
    .article-list-item-point-icon{
        @extend %pa;
        @extend %t0;
        @extend %r0;
        @extend %cp;
        width: j(20);
        height: j(20);
    }
</style>
