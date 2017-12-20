<template>
    <div class="share-wrap">
        <div class="title">
            砍价分享
        </div>
        <scroll class="scroll" ref="scroll">
            <div>
                <img src="../../assets/img/goodimg.png" alt="" class="img">
                <div class="desc">
                    <div class="title">
                        标题标题便偷偷标题标题便偷偷标题标题便偷偷标题标题便偷偷标题标题便偷偷
                    </div>
                    <div class="info">
                        <span class="price">
                            <i>￥</i>300.00
                        </span>
                        <span class="tips">
                            [10人帮砍，立减100元]
                        </span>
                    </div> 
                    <div class="count">
                        <span>3</span>人帮砍
                    </div>
                    <div class="btn">
                        帮砍一刀
                    </div>
                </div>
                <div class="friend">
                    <div class="title">
                        帮砍好友
                    </div>
                    <div class="content">
                        <div class="item">
                            <img src="../../assets/img/avatar.png" alt="">
                            <div class="nickName">name</div>
                            <div class="price">-￥5.00</div>
                        </div>
                        <div class="item">
                            <img src="../../assets/img/avatar.png" alt="">
                            <div class="nickName">name</div>
                            <div class="price">-￥5.00</div>
                        </div>
                        <div class="item">
                            <img src="../../assets/img/avatar.png" alt="">
                            <div class="nickName">name</div>
                            <div class="price">-￥5.00</div>
                        </div>
                        <div class="item">
                            <img src="../../assets/img/avatar.png" alt="">
                            <div class="nickName">name</div>
                            <div class="price">-￥5.00</div>
                        </div>
                    </div> 
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import scroll from 'common/scroll'

export default {
    components:{
        scroll
    },


}
</script>

<style lang="stylus" scoped>
.share-wrap
    position fixed
    top 0
    width 100%
    height 100vh
    left 0
    z-index 999
    background #e7e7e7
    display flex
    flex-direction column
    & > .title
        height 1.2rem
        line-height 1.2rem
        text-align center
        color #ffffff
        background #fc7aa5
        font-size .4rem
        letter-spacing 0.0533rem
    .scroll
        flex 1
        overflow hidden
        .img
            display block
            height 9.3333rem
            width 100%
        .desc
            background #ffffff
            box-sizing border-box
            padding 0.2667rem
            .title
                font-size .35rem
                line-height .45rem
            .info
                display flex
                justify-content space-between
                align-self center
                margin 0.2667rem 0
                .price
                    color #ef2b2a
                    font-size .4rem
                    i 
                        font-size .3rem
                .tips
                    color #ff8989
                    font-size .3rem
            .count 
                text-align center
                font-size .3rem
                span 
                    color #ef2b2a
            .btn 
                height 1.0667rem
                color #ffffff
                font-size .4rem
                line-height 1.0667rem
                text-align center
                width 80%
                margin 0.2667rem auto
                background #fc7aa5
                border-radius 0.1333rem
                letter-spacing 0.04rem
    .friend
        background #ffffff
        box-sizing border-box
        padding 0.2667rem
        margin-top 0.1333rem
        .title
            font-size .4rem
            padding-bottom 0.2667rem
        .content
            .item
                display flex
                justify-content space-between
                align-items center
                padding 0.2667rem 0
                border-top  0.0133rem solid #e7e7e7
                img 
                    flex 0 0 1.0667rem
                    height 1.0667rem
                    border-radius 50%
                .nickName
                    flex 1
                    font-size .4rem
                    padding-left 0.5667rem
                .price
                    font-size .4rem
                    color #f24646
</style>
