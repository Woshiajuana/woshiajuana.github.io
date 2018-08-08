<template>
    <svg class="with-out">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#text-icon"></use>
    </svg>
</template>
<script>
    export default {
        name: 'with-out'
    }
</script>
<style lang="scss">
    @import '../assets/scss/define';
    .with-out{
        @extend %w100;
        top: j(60);
        height: j(60);
        fill: $mc;
    }
</style>
