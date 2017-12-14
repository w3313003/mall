<template>
    <div class='classify-wrap'>
        <div class='search-wrap'>
                    <div class='search-input'>
                            <div class='s-svg'>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-sousuo"></use>
                                </svg>
                            </div>
                            <div class='input-wrap'>
                                <input type='text' placeholder='搜索' @click='isSearching = true'>
                            </div>
                            </div> 

                            <div class='msg'  v-show='isSearching'>
                                 <div @click='isSearching = false'>
                                    取消
                                </div>
                            </div>
                            <div v-if='!isSearching' style='font-size:.5rem;color:#666'>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-pingjia"></use>
                                </svg>
                            </div>
                    </div> 
                <transition name='searchList'>
                    <div class='search-block' v-show='isSearching'>
                        <div class='near'>
                            <div class='title'>
                                最近搜索
                            </div>
                            <div class='itemwrap'>
                                <div class="item">
                                    第一个
                                </div>
                                <div class="item">
                                    第一个
                                </div>
                                <div class="item">
                                    第一个
                                </div>
                            </div>
                        </div>
                        <div class='history'>
                            <div class='title'>
                                热门搜索
                            </div>
                            <div class='itemwrap'>
                                <div class="item">
                                    第一个
                                </div>
                                <div class="item">
                                    第一个
                                </div>
                                <div class="item">
                                    第一个
                                </div>
                            </div>
                        </div>
                    </div>  
                </transition>
        <scroll class='scroll' ref='scroll'>
            <div>
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
    created(){
        this.axios.get('/api/waresClass/getWaresClassList?sexType=0').then(res => {
            console.log(res.data.obj)
        })
        this.axios.get('/api/waresClass/getWaresClassList?sexType=1').then(res => {
            console.log(res.data.obj)
        })
    },
    activated(){
        this.$refs.scroll.refresh()
    },
    data() {
        return {
            isSearching:false
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
    position absolute
    top 0.93rem
    left 0
    z-index 999
    border 1px solid #666
    box-sizing border-box
    padding 0.2667rem 0.3333rem
    .near   
        .title
            font-size .35rem
            color #989898
        .itemwrap
            margin 0.2667rem 0
            display flex
            flex-wrap wrap
            .item 
                height 0.6667rem
                box-sizing border-box
                line-height 0.6667rem
                border 0.0133rem solid #555
                border-radius 0.3333rem
                padding 0 .2rem
                margin-right  .3rem
    .history
        .title
            font-size .35rem
            color #989898
        .itemwrap
            margin 0.2667rem 0
            display flex
            flex-wrap wrap
            .item 
                height 0.6667rem
                box-sizing border-box
                line-height 0.6667rem
                border 0.0133rem solid #555
                border-radius 0.3333rem
                padding 0 .2rem
                margin-right  .3rem  

.search-wrap
    height 0.93rem
    overflow hidden
    background-color rgba(0,0,0,.1)
    display flex
    box-sizing border-box
    padding  0 .3rem
    align-items center
    justify-content space-around

.fmale
    margin-top 0.1333rem

.content
    .male,.fmale
        background #fff
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
    height 0.8rem
    z-index 99
    top 0.1333rem
    right 3%
    flex 0 0 1.5333rem
    display flex
    align-items center
    justify-content center
    font-size 0.34rem
    color #fff
    border-radius 0.1333rem
    background #fc7aa5
.search-input
    height 0.6667rem
    flex 1
    top 0.1333rem
    left 5%
    background #fff
    z-index 99
    border 1px solid #e7e7e7
    border-radius 0.333rem
    display flex
    font-size 0.4rem
    overflow hidden
    margin-right 15px
    .input-wrap
        flex 1
        input
            width 100%
            height 100%
            font-size 0.4rem
    .s-svg
        text-align center
        flex 0 0 0.8rem
        line-height 0.6667rem
        .icon 
            color #666


.searchList-enter-active, .searchList-leave-active {
        transition: all .3s
}
.searchList-enter, .searchList-leave-to{
    transform :translate3d(0,100%,0)
}
</style>
