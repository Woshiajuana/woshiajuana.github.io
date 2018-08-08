<template>
    <div>
        <!--主体内容视图-->
        <transition :name="animateName">
            <keep-alive>
                <router-view class="view-main"></router-view>
            </keep-alive>
        </transition>
        <!--/主体内容视图-->
        <!--导航条-->
        <nav-bar></nav-bar>
        <!--/导航条-->
    </div>
</template>
<script>
    import NavBar from '../../components/nav-bar.vue'
    export default {
        name: 'index',
        computed: {
            animateName () {
                return this.$store.state.animate_name;
            }
        },
        components: {
            NavBar
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .view-main{
        @extend %pa;
        @extend %r0;
        @extend %t0;
        @extend %l0;
        bottom: j(50);
    }
</style>
