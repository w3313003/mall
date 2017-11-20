<template>
    <div class='act-warp'>
        <div class="title">
            我的活动
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class='nav'>
            <div :class='{"active":currentIndex == 0}' data-index='0' @click='navToggle'>发起</div>
            <div :class='{"active":currentIndex == 1}' data-index='1' @click='navToggle'>参与</div>
        </div>
        <div class='content'>
        <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
            <swiper-slide>
                <div class='item'>
                    <img src="../.././assets/img/good-item.png" alt="">
                    <div class='text'>
                        <p class='titles'>
                            31233333333333333333333333333333333333333333333
                        </p>
                        <p class='tips'>
                            [10人帮看，立减100元]
                        </p>
                        <div class='progress'>
                            <div class='innerprogress'></div>
                        </div>
                        <div class='price'>
                            <div class="oldp">
                                300
                            </div>
                            <div class="newp">
                                900
                            </div>       
                        </div>
                        <div class='btn'>
                            <div class='continue'>
                                继续砍价
                            </div>
                            <div class='pay'>
                                直接购买
                            </div>
                        </div>
                    </div>
                </div>
                <div class='item'>
                    <img src="../.././assets/img/good-item.png" alt="">
                    <div class='text'>
                        <p class='titles'>
                            31233333333333333333333333333333333333333333333
                        </p>
                        <p class='tips'>
                            [10人帮看，立减100元]
                        </p>
                        <div class='progress'>
                            <div class='innerprogress'></div>
                        </div>
                        <div class='price'>
                            <div class="oldp">
                                300
                            </div>
                            <div class="newp">
                                900
                            </div>       
                        </div>
                        <div class='btn'>
                            <div class='continue'>
                                继续砍价
                            </div>
                            <div class='pay'>
                                直接购买
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class='item'>
                    <img src="../.././assets/img/good-item.png" alt="">
                    <div class='text'>
                        <p class='titles'>
                            31233333333333333333333333333333333333333333333
                        </p>
                        <p class='tips'>
                            [10人帮看，立减100元]
                        </p>
                        <div class='progress'>
                            <div class='innerprogress'></div>
                        </div>
                        <div class='price'>
                            <div class="oldp">
                                300
                            </div>
                            <div class="newp">
                                900
                            </div>       
                        </div>
                        <div class='btn'>
                            <div class='continue'>
                                继续砍价
                            </div>
                            <div class='pay'>
                                直接购买
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            </swiper>
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
        back(){
            this.$router.back();
        },
        navToggle(e){
            const index = e.currentTarget.dataset.index;
            this.currentIndex = index;
            this.$refs.mySwiper.swiper.slideTo(index)
        }
    }
}
</script>

<style lang="stylus" scoped>
.act-warp
    width 100%
    height 100vh
    position fixed
    top 0
    left 0
    z-index 999
    display flex
    flex-direction column
    .title
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        color #fff
        background #fc7aa5
        text-align center
        font-size 0.4rem
        position relative
        .icon
            width 0.5333rem
            height 0.5333rem
            position absolute
            left 0.3rem
            top 50%
            transform translateY(-50%) rotate(180deg)
            font-size 0.4rem
    .nav    
        height 1.3333rem
        display flex
        background #fff
        border-bottom 0.0133rem solid #e7e7e7
        align-items center
        justify-content space-around
        div
            text-align center
            height 100%
            line-height 1.3333rem
            font-size 0.4rem
            &.active
                color #fc7ba6
                border-bottom 1px solid #fc7ba6
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
            img
                display block
                flex 0 0 2.6667rem
                height 2.6667rem
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
                .tips
                    color #fc7aa5
                    font-size 0.3333rem
                .price
                    display flex
                    justify-content space-between
                .progress
                    width 100%
                    height 0.2rem
                    background #e7e7e7
                    border-radius 0.1rem
                    overflow hidden
                    .innerprogress
                        width 60%
                        background yellow
                        height 100%
                .btn
                    display flex
                    justify-content space-around
                    div 
                        width 2.6667rem
                        border-radius 0.3333rem
                        text-align center
                        line-height 0.6667rem
                        color #fff
                        font-size .4rem
                        height 0.6667rem
                        background-color #fc7aa5
                        

</style>
