<template>
    <div class="search-label-wrap">
        <section class="search-label-section" v-if="history_key_words_arr">
            <h2 class="search-label-title">
                历史搜索
                <svg class="search-label-delete" @click="deleteHistoryHandle">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete-icon"></use>
                </svg>
            </h2>
            <a v-for="(item,index) in history_key_words_arr" :key="index" class="search-label-link" :href="'#/search/result/' + item">{{item}}</a>
        </section>
        <section class="search-label-section">
            <h2 class="search-label-title">热门搜索</h2>
            <a class="search-label-link" href="#/search/result/javascript">javascript</a>
            <a class="search-label-link" href="#/search/result/vue">vue.js</a>
            <a class="search-label-link" href="#/search/result/angular">angular</a>
            <a class="search-label-link" href="#/search/result/node">node.js</a>
            <a class="search-label-link" href="#/search/result/css">css</a>
            <a class="search-label-link" href="#/search/result/jquery">jquery</a>
        </section>
    </div>
</template>
<script>
    import Tool from '../../../assets/lib/Tool'
    import DEFAULT_CONFIG from '../../../assets/lib/DEFAULT_CONFIG'
    export default {
        name: 'search-index',
        data () {
            return {
                history_key_words_arr: ''
            }
        },
        created () {
            this.history_key_words_arr = Tool.dataToLocalStorageOperate.achieve(DEFAULT_CONFIG.HISTORY_KEY_WORDS);
        },
        methods: {
            /**删除历史搜索记录*/
            deleteHistoryHandle () {
                Tool.dataToLocalStorageOperate.remove(DEFAULT_CONFIG.HISTORY_KEY_WORDS);
                this.history_key_words_arr = Tool.dataToLocalStorageOperate.achieve(DEFAULT_CONFIG.HISTORY_KEY_WORDS);
            }
        }
    }
</script>
<style lang="scss">
    @import "../../../assets/scss/define";
    .search-label-wrap{
        padding: 0 j(12);
    }
    .search-label-section{
        @extend %clearfix;
        margin-top: j(20);
        &:first-child{
            margin-top: 0;
        }
    }
    .search-label-title{
        @extend %pr;
        @extend %fwb;
        @extend %c6;
        font-size: j(16);
        height: j(35);
        line-height: j(35);
    }
    .search-label-delete{
        @extend %pa;
        @extend %t50;
        @extend %r0;
        fill: #999;
        margin-top: j(-8);
        width: j(16);
        height: j(16);

    }
    .search-label-link{
        @extend %fl;
        @extend %c6;
        font-size: j(14);
        padding: j(5);
        background-color: #f2f2f2;
        margin: 0 j(12) j(12) 0;
    }

</style>
