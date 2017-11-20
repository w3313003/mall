<template>
    <div class='rd-wrap'>
        <div class='title'>
            <div class='l'>
                 <svg class="icon fenlei" aria-hidden="true" @click='back'>
                        <use xlink:href="#icon-jiantou"></use>
                </svg>
            </div>
            <div class='m'>
                详情
            </div>
            <div class='r'>
                发布
            </div>
        </div>
        <div class='middle'>
            <div class="banner">
                    <img src="../.././assets/img/banner.png" alt="">
            </div>
            <div class="content">   
                <div class='c-title'>标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
                <div class='disc'>
                    <div class='headers'>
                        <img src="../.././assets/img/avatar.png" alt="">
                        <div class='nickname'>壳斗马蒂</div>
                        <div class='time'>20分钟前</div>
                    </div>
                </div>
                <div class='page'>
                    描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
                </div>
                <div class='hidden-btn'>
                    查看更多
                    <div>
                        <svg class="icon fenlei" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class='page'></div>
            </div> 
             <div class='d-rating-block'>
                    <div class='d-r-title'>
                        评价
                    </div>
                    <block></block>
                </div>
            <div class='about-wrap'>
                <div class='about-title'>
                    相关话题
                </div>
                <div class='about-item'>
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
                            9999
                        </div>
                        <div>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-duihuakuang"></use>
                            </svg>
                            989
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">

        </div>
    </div>
</template>

<script>
import block from './sofratingblock'

export default {
    components:{
        block
    },
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>

<style lang="stylus" scoped>
.about-wrap
    background #ffffff
    margin-top 0.1333rem
    .about-title
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
    .about-item
        box-sizing border-box
        padding 0.3333rem
        background #fff
        margin-bottom 0.1333rem
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

.d-rating-block
    background #fff
    margin-top 0.1333rem;
    .d-r-title
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

.headers
    display flex
    height 0.9333rem
    font-size 0.3333rem
    margin 0.3rem 0
    img
        width 0.9333rem
        height 0.9333rem
    .nickname
        flex 1
        display flex
        align-items center
        margin-left 0.2rem
        color #000
        font-size 0.3333rem
    .time
        display flex
        align-items center
        color #777
        font-size 0.3333rem

.rd-wrap
    width 100%
    height 100vh
    position fixed
    z-index 999
    top 0 
    left 0
    background #fff
    display flex
    flex-direction column
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
    .middle
        flex 1
        overflow scroll
        background #e7e7e7
        .banner
                width 100%
                img 
                    width 100%
        .content
            background #fff
            flex 1
            box-sizing border-box
            padding 0.1rem 0.2rem 0rem
            .c-title
                font-size 0.3333rem
                line-height 0.45rem
                margin 0.1rem 0
            .page
                font-size 0.3rem
                line-height .35rem
                word-break break-all
            .hidden-btn
                text-align center
                font-size 0.3rem
                margin 0.1333rem 0 0
                color #666
                .icon
                    transform rotate(90deg)
                    font-size 0.4rem
            
    .bottom
        height 1.3333rem
        border-top 0.0133rem solid #666
</style>
