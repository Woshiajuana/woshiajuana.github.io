<template>
    <svg slot="icon" class="logo-bg">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo-icon"></use>
    </svg>
</template>
<script>
    export default {
        name: 'logo-bg'
    }
</script>
<style lang="scss">
    @import '../assets/scss/define';
    .logo-bg{
        @extend %pf;
        @extend %t0;
        @extend %l0;
        @extend %w100;
        top: j(60);
        height: j(120);
        fill: $mc;
        animation: logo-bg-fade-in .5s;
    }
    @keyframes logo-bg-fade-in {
        0%{
            opacity: 0;
        }
        99%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
</style>
