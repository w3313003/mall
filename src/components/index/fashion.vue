<template>
   <div class='f-wrap'>
        <div class='title'>
            时尚穿搭    
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>  
        <div class='item'>
            <div class='header'>
                <img src="../.././assets/img/avatar.png" alt="">
                <div class='nickname'>壳斗马蒂</div>
                <div class='time'>20分钟前</div>
            </div>
            <div class='banner'>
                <img src="../.././assets/img/f_banner.png" alt="">
            </div>
            <div class='heading'>这里有一个标题</div>
            <div class='control'>
                <div>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-dianzan"></use>
                    </svg>
                    点赞
                </div>
                <div>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-fenxiang-copy"></use>
                    </svg>
                    分享
                </div>
            </div>
        </div>
        <div class='item'>
            <div class='header'>
                <img src="../.././assets/img/avatar.png" alt="">
                <div class='nickname'>壳斗马蒂</div>
                <div class='time'>20分钟前</div>
            </div>
            <div class='banner'>
                <img src="../.././assets/img/f_banner.png" alt="">
            </div>
            <div class='heading'>这里有一个标题</div>
            <div class='control'>
                <div>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-dianzan"></use>
                    </svg>
                    点赞
                </div>
                <div>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-fenxiang-copy"></use>
                    </svg>
                    分享
                </div>
            </div>
        </div>
   </div>
</template>

<script>
export default {
    methods:{
        back(){
            this.$router.back()
        }
    }
}
</script>

<style lang="stylus" scoped>
.f-wrap
    width 100%
    height 90vh
    background #e7e7e7
    overflow scroll
    .title
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        background #fff
        color #fc7aa5
        text-align center
        font-size 0.4rem
        position relative
        border-bottom 0.0133rem solid #e7e7e7
        .icon
            width 0.5333rem
            height 0.5333rem
            position absolute
            left 0.3rem
            top 50%
            transform translateY(-50%) rotate(180deg)
            font-size 0.4rem
    .item
        box-sizing border-box
        padding 0.3333rem
        background #fff
        margin-top 0.1333rem
        .header
            display flex
            height 0.9333rem
            font-size 0.3333rem
            img
                width 0.9333rem
                height 0.9333rem
            .nickname
                flex 1
                display flex
                align-items center
                margin-left 0.2rem
            .time
                display flex
                align-items center
                color #777
        .banner
            width 100%
            height 4.6667rem
            margin 0.2rem 0
            img 
                width 100%
                height 100%
        .heading
            font-weight 500 
            font-size 0.4rem
            height 0.8rem
            line-height 0.8rem
        .control
            display flex
            div
                width 1.6rem
                display flex
                align-items center
                font-size 0.3333rem
                color #777
                .icon 
                    font-size 0.5rem
                    margin-right 0.1333rem
        &:first-child
            margin 0

</style>
