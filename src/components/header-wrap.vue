<template>
    <header class="header-wrap">
        <a href="javascript:;" @click="headerReturnHandle" class="header-return"></a>
        <h1 v-if="!is_h2" class="header-title">{{ header_title }}</h1>
        <h2 v-else class="header-title">{{ header_title }}</h2>
    </header>
</template>
<script>
    export default {
        name: 'header',
        props: [ 'header_title', 'is_left_click', 'is_h2'],
        methods: {
            headerReturnHandle () {
                this.$emit('headerLeftClick');
                !this.is_left_click && (window.history.go(-1));
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/scss/define';
    $header_height: j(46);
    .header-wrap{
        @extend %pr;
        height: $header_height;
        line-height: $header_height;
        background-color: $mc;
    }
    .header-title{
        @extend %tac;
        @extend %cfff;
        @extend %fwn;
        font-size: j(18);
    }
    .header-return{
        @extend %pa;
        @extend %t0;
        @extend %l0;
        @extend %cp;
        width: $header_height;
        height: $header_height;
        &:after{
            @extend %pa;
            @extend %t50;
            @include tfr(-135deg);
            left: j(16);
            width: j(12);
            height: j(12);
            margin-top: j(-6);
            content: '';
            border-top: 2px solid #fff;
            border-right: 2px solid #fff;
        }
    }
</style>
