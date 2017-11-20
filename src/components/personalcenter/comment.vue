<template>
    <div class='comm-warp'>
        <div class="title">
            <div class='l'>
                 <svg class="icon" aria-hidden="true" @click='back'>
                        <use xlink:href="#icon-jiantou"></use>
                </svg>
            </div>
            <div class='m'>
                我的评价
            </div>
            <div class='r'>
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bianji1"></use>
                </svg>
            </div>
        </div>
        <div class='content'>
            <div class='item'>
                <div class='header'>
                    <div class="nickname">
                        666
                    </div>
                    <div class="time">217.6.3</div>   
                </div>
                <div class='text'>
                    评价，p9ngj评价，p9ngj评价，p9ngj评价，p9ngj评价，p9ngj评价，p9ngj评价，p9ngj评价，p9ngj评价，p9ngj评价，p9ngj
                </div>
                <div class='goodinfo'>
                    <img src="../.././assets/img/goodimg.png" alt="">
                    <div class='gooddisc'>
                        <div class='t'>
                            是的萨达十大啥家乎季后赛的哈市大胜靠德大路口的
                        </div>
                        <div class='m'>
                            颜色自由组合  尺码打啊
                        </div>
                        <div class='b'>
                            <div class='price'>
                                $666
                            </div>
                            <div class='count'>
                                X1
                            </div>
                        </div>
                    </div>
                </div>
                <div class='seller-comm'>
                    <div class='t'>
                        <span>[掌柜回复]</span> <span>2017.6.6</span>
                    </div>
                    <div class='seller-content'>
                        回复回复回复回复回复回复回复回复
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>

<style lang="stylus" scoped>
.comm-warp
    width 100%
    height 100vh
    position fixed
    top 0
    left 0
    z-index 999
    display flex
    flex-direction column
    .title
        height 1.2rem
        display flex
        background #fc7aa5
        color #fff
        font-size 0.4rem
        align-items center
        box-sizing border-box
        padding 0 0.4rem
        .icon 
            font-size .5rem
        .m
            flex 1
            text-align center
        .l
            font-size 0.4rem
            transform rotate(180deg)
    .content
        flex 1
        overflow scroll
        background #e7e7e7
        .item
            background #Fff
            font-size .35rem
            margin-bottom 10px
            .header
                display flex
                justify-content space-between
                box-sizing border-box
                padding 0.2rem 0.3333rem
                .nickname
                    font-size .4rem
                .time
                    font-size .3rem
                    color #666
            .text
                box-sizing border-box
                padding 0.2rem 0.3333rem
            .goodinfo
                display flex
                box-sizing border-box
                padding 0.2rem 0.3333rem
                background #f5f5f5
                & > img 
                    width 1.9333rem
                    height 1.9333rem
                    display block
                .gooddisc
                    flex 1
                    padding-left .2rem
                    display flex
                    flex-direction column
                    justify-content space-around
                    .t
                        width 6.6667rem
                        white-space nowrap
                        overflow hidden
                        letter-spacing 2px
                        text-overflow ellipsis
                    .b
                        display flex
                        justify-content space-between
            .seller-comm
                box-sizing border-box
                padding 0.2rem 0.3333rem
                .t
                    display flex
                    justify-content space-between
                    margin-bottom 0.2667rem
                    span:last-child
                        color #666
                        font-size .3rem
</style>
