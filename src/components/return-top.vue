<template>
    <i class="return-top" :class="{'active': top_dir > 520}" @click="returnTopHandle">
        <svg slot="icon" class="return-top-icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#return-top-icon"></use>
        </svg>
    </i>
</template>
<script>
    import types from '../store/mutation-types'
    export default {
        name: 'return-top',
        props: [ 'top_dir' ],
        methods: {
            /**回顶部点击事件*/
            returnTopHandle () {
                this.$emit('returnTop');
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/scss/define';
    .return-top{
        @extend %pa;
        @include br(50%);
        @extend %bgwhite;
        @include tst(all,.3s);
        right: j(-50);
        bottom: j(10);
        width: j(40);
        height: j(40);
        border: 1px solid #999;
        opacity: 0.5;
        box-shadow: 0 j(3) j(3) 0 rgba(0,0,0,.2);
        &.active{
            right: j(10);
            animation: rotate360 .3s;
        }
    }
    @keyframes rotate360 {
        0% {
            transform: rotate(-180deg);
        }
        100% {
            transform: rotate(-360deg);
        }
    }
    .return-top-icon{
        @extend %pa;
        @extend %t50;
        @extend %l50;
        margin-top: j(-10);
        margin-left: j(-10);
        width: j(20);
        height: j(20);
    }
</style>
