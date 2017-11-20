<template>
    <div class='classify-wrap'>
        <transition name='searchList'>
            <div class='search-block' v-show='searing'>
            </div>  
        </transition>
        <scroll class='scroll'>
            <div>
                <div class='search-wrap'>
                    <div class='search-input'>
                        <div class='s-svg'>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-sousuo"></use>
                            </svg>
                        </div>
                        <div class='input-wrap'>
                            <input type='text' placeholder='搜索' @focus="open">
                        </div>
                    </div> 
                    <div class='msg'>
                         <div v-if='searing' @click='searing = false'>
                            取消
                        </div>
                        <svg class="icon" aria-hidden="true"  v-else>
                            <use xlink:href="#icon-pingjia"></use>
                        </svg>
                    </div>
                </div>
                <div class='content'>
                    <div class='male'>
                        <div class='title'>
                            男装分类
                        </div>
                        <div class='disc'>
                            <div class="item" v-for='i in 6' :key="i">
                                <div class='img-wrap'>
                                    <img src="../.././assets/img/good-item.png" alt="">
                                </div>
                                <div class='text'>
                                    <p>男装上衣</p>
                                    <div>夏季新品买一送一</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='fmale'>
                        <div class="title">
                            女装分类
                        </div>
                        <div class="disc">
                            <div class="item" v-for='i in 6' :key="i">
                                <div class='img-wrap'>
                                    <img src="../.././assets/img/good-item.png" alt="">
                                </div>
                                <div class='text'>
                                    <p>男装上衣</p>
                                    <div>夏季新品买一送一</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import scroll from "common/scroll";
export default {
    data() {
        return {
            searing:false,
        };
    },
    components: {
      scroll
    },
    methods:{
        open(){
            this.searing = true;
        }
    }
};
</script>

<style lang="stylus" scoped>
.classify-wrap
    height 90vh
    width:100%
    display flex
    flex-direction column
    .scroll
        flex 1
        height 100%
        overflow hidden
        background #e7e7e7
.search-block
    width 100%
    height 100%
    background #fff
    position fixed
    top 0.93rem
    left 0
    z-index 999
    border 1px solid #666

.search-wrap
    height 0.93rem
    overflow hidden
    background-color #fff

.content
    .male,.fmale
        background #fff
        margin-top 0.1333rem
        .title
            height 1.2rem
            line-height 1.2rem
            font-size 0.4rem
            position relative
            padding-left 0.2rem
            border-bottom 0.0133rem solid #e7e7e7
            &:before
                content:''
                height 0.4rem
                width 0.0667rem
                background #fc7aa5
                position absolute
                left 0
                top 50%
                transform translateY(-50%)
        .disc
            display flex
            flex-wrap wrap
            box-sizing border-box
            padding 0.2667rem
            justify-content space-between
            .item
                width 2.9333rem
                margin-bottom 0.1333rem
                .img-wrap
                    width 100%
                    height 2.9333rem
                    overflow hidden
                    img 
                        width 100%
                        height 100%
                .text
                    margin-top 0.1333rem
                    text-align center
                    p
                        font-size 0.4rem
                        margin 0.0667rem
                    div
                        font-size 0.3333rem

.msg
    position fixed
    height 0.6667rem
    z-index 99
    top 0.1333rem
    right 3%
    width 6%
    display flex
    align-items center
    justify-content center
    font-size 0.3rem
    svg 
        font-size 0.4rem
        color #666
        font-weight 700
        
.search-input
    position fixed
    background #e7e7e7
    height 0.6667rem
    width 85%
    top 0.1333rem
    left 5%
    z-index 99
    border 1px solid #e7e7e7
    border-radius 0.333rem
    display flex
    font-size 0.4rem
    overflow hidden
    .input-wrap
        flex 1
        input
            width 100%
            height 100%
            font-size 0.4rem
            background #e7e7e7
    .s-svg
        text-align center
        flex 0 0 0.8rem
        line-height 0.6667rem
        .icon 
            color #666

</style>
