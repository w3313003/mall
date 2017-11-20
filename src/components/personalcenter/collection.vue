<template>
    <div class='clo-warp'>
        <div class="title">
            <div class='l'>
                 <svg class="icon fenlei" aria-hidden="true" @click='back'>
                        <use xlink:href="#icon-jiantou"></use>
                </svg>
            </div>
            <div class='m'>
                收藏
            </div>
            <div class='r' @click='editing = true;'>
                编辑
            </div>
        </div>
        <div class='nav'>
            <div :class='{"active":currentIndex == 0}' data-index='0' @click='navToggle'>商品</div>
            <div :class='{"active":currentIndex == 1}' data-index='1' @click='navToggle'>商家</div>
        </div>
        <div class='content'>
            <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                <swiper-slide>
                    <div class='item'>
                        <div class='radio' v-if='editing'>
                            <img v-if='true' src='../.././assets/img/radio.png'>
                            <img v-else src='../.././assets/img/hradio.png'>                 
                        </div>
                        <img src="../.././assets/img/good-item.png" alt="">
                        <div class='text'>
                            <p class='titles'>
                                31233333333333333333333333333333333333333333333
                            </p>
                            <div class='info'>
                                <div>
                                    ￥
                                    <span>300.00</span>
                                </div>
                                <div>
                                    已售500
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                     <div class='item'>
                        <div class='radio' v-if='editing'>
                            <img v-if='true' src='../.././assets/img/radio.png'>
                            <img v-else src='../.././assets/img/hradio.png'>                 
                        </div>
                        <img src="../.././assets/img/good-item.png" alt="">
                        <div class='text'>
                            <p class='titles'>
                                31233333333333333333333333333333333333333333333
                            </p>
                            <div class='info'>
                                <div>
                                    ￥
                                    <span>300.00</span>
                                </div>
                                <div>
                                    已售500
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>   
        <div class='bottom'>
            <div class='l'>
                <div class='img-wrap'>
                    <img v-if='true' src='../.././assets/img/radio.png'>
                    <img v-else src='../.././assets/img/hradio.png'>   
                </div>
                <div>
                    全选
                </div>
            </div>
            <div class='cancle'>
                取消
            </div>
            <div class='delete'>
                删除
            </div>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    components:{
        swiper, 
        swiperSlide
    },
    data(){
        return {
            editing : false,
            notNextTick:true,
            currentIndex:0,
            swiperOption:{
                paginationClickable: true,
                onSlideChangeEnd:s => {
                    this.currentIndex = s.activeIndex;
                }
            }
        }
    },
    methods:{
        navToggle(e){
            const index = e.currentTarget.dataset.index;
            this.currentIndex = index;
            this.$refs.mySwiper.swiper.slideTo(index)
        },
        back(){
            this.$router.back();
        }
    }
}
</script>

<style lang="stylus" scoped>
.clo-warp
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
    .nav    
        height 1.0667rem
        display flex
        background #fff
        border-bottom 0.0133rem solid #e7e7e7
        align-items center
        justify-content space-around
        div
            text-align center
            height 1.0667rem
            line-height 1.0667rem
            font-size 0.4rem
            &.active
                color #fc7ba6
                border-bottom 1px solid #fc7ba6
    .bottom
        height 1.3333rem
        display flex
        background #fff
        .l
            flex 1
            display flex
            align-items center
            padding-left 0.4rem
            .img-wrap
                width 0.6rem
                height 0.6rem
                overflow hidden
                img
                    width 100%
                    height 100%
            div:last-child
                font-size .35rem
                margin-left .2rem
        .cancle,.delete
            flex 0 0 190px
            display flex
            align-items center
            justify-content space-around
            font-size .35rem
        .cancle
            background #f6f6f6
            color #666
        .delete
            background #fc7aa5
            color #fff
    .content
        background #fff
        flex 1
        overflow scroll
        background #e7e7e7
        .item
            display flex
            box-sizing border-box
            width 100%
            padding 0.2rem
            background #fff
            overflow hidden
            margin-bottom 0.1333rem
            & > img
                display block
                flex 0 0 2rem
                height 2rem
            .radio
                width 1.5333rem
                display flex
                align-items center
                justify-content center
                img
                    width 0.6rem
                    height 0.6rem
            .text
                flex 1
                box-sizing border-box
                padding-left 0.2rem
                display flex
                flex-direction column
                justify-content space-between
                .titles 
                    width 6.4rem
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                    font-size 0.4rem
                .info
                    display flex
                    justify-content space-between
                    div
                        font-size 0.3333rem
                        &:first-child
                            color #f74c18
                            span
                                font-size .4rem
                        &:last-child
                            display flex
                            align-items flex-end

</style>
