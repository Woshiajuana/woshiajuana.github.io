<template>
    <div class="search-view">
        <div class="search-header">
            <a :href="$route.params.key_words ? '#/search' : '#/'" class="search-header-return"></a>
            <input type="text" @keyup.enter="searchHandle" v-model="search_input" placeholder="请输入文章名" class="search-input">
            <svg v-show="search_input" @click="searchCloseHandle" class="search-input-close">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close-icon"></use>
            </svg>
        </div>
        <div class="search-inner">
            <transition
                name="custom-classes-transition"
                enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOut">
                <router-view class="search-con"></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    import HeaderWrap from '../../components/header-wrap.vue'
    import types from '../../store/mutation-types'
    import Tool from '../../assets/lib/Tool'
    import DEFAULT_CONFIG from '../../assets/lib/DEFAULT_CONFIG'
    export default {
        name: 'search',
        data (){
            return {
                search_input: this.$route.params.key_words || ''
            }
        },
        methods: {
            /**搜索关闭按钮点击事件*/
            searchCloseHandle () {
                this.search_input = '';
            },
            /**搜索事件*/
            searchHandle () {
                this.search_input = this.search_input.trim();
                if (!this.search_input) return;
                this.$store.commit(types.SET_KEY_WORDS,this.search_input);
                this.$router.push('/search/result/' + this.search_input);
                var history_key_words_arr = Tool.dataToLocalStorageOperate.achieve(DEFAULT_CONFIG.HISTORY_KEY_WORDS) || [];
                history_key_words_arr.push(this.search_input);
                Tool.dataToLocalStorageOperate.save(DEFAULT_CONFIG.HISTORY_KEY_WORDS,history_key_words_arr);
            }
        },
        components: {
            HeaderWrap
        }
    }
</script>
<style lang="scss">
    @import '../../assets/scss/define';
    .search-header{
        @extend %pr;
        @extend %df;
        height: j(35);
        padding: j(10);
    }
    .search-header-return{
        @extend %pr;
        @extend %cp;
        width: j(35);
        height: j(35);
        &:after{
            @extend %pa;
            @extend %t50;
            @include tfr(-135deg);
            left: j(14);
            width: j(12);
            height: j(12);
            margin-top: j(-6);
            content: '';
            border-top: 2px solid #999;
            border-right: 2px solid #999;
        }

    }
    .search-input{
        @extend %df1;
        @include br(j(35));
        font-size: j(14);
        height: j(35);
        border: none;
        padding: 0 j(30) 0 j(16);
        background-color: #f2f2f2;
    }
    .search-input-close{
        @extend %pa;
        @extend %t50;
        right: j(20);
        margin-top: j(-8);
        width: j(16);
        height: j(16);
        fill: #666;
    }
    .search-inner{
        @extend %pa;
        @extend %l0;
        @extend %r0;
        @extend %b0;
        top: j(55);
    }
    .search-con{
        @extend %pa;
        @extend %l0;
        @extend %t0;
        @extend %r0;
    }
</style>
