<template>
    <div class="null-img">
        <img src="../assets/img/search-null.png" class="search-null-img">
        <p class="search-null-prompt">毛都冒得一根~~~</p>
    </div>
</template>
<script>
    export default {
        name: 'null-img'
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .null-img{
        @extend %oh;
    }
    .search-null-img{
        @extend %db;
        @extend %ma;
        margin-top: j(80);
        width: j(161);
        height: j(148);
    }
    .search-null-prompt{
        @extend %tac;
        @extend %c6;
        font-size: j(16);
        margin-top: j(80);
    }
</style>
