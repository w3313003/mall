<template>
<div class='hyh'>
    <div class='nav'>
        <div :class='{"active":male == true}'  data-id='1'   @click='male = true'>男生</div>
        <div :class='{"active":male == false}'  data-id='2' @click='male = false'>女生</div>
    </div>
    <div class='content'>
            <swiper class='item male' v-show='male' :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                <swiper-slide v-for='(item,index) in maleList' :key="index">
                    <div class='btn'>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-aixin"></use>
                        </svg>
                        点赞
                    </div>
                    <img v-lazy="item.imgMain" alt="">
                    <div class='title'>
                        <div class='t'>{{item.name}}</div>
                        <div class='b'>
                            ￥<span>{{item.sellingPrice}}</span><span>{{item.marketPrice}}</span>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <swiper class='item fmale' v-if='!male' :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                <swiper-slide v-for='(item,index) in fmaleList' :key="index">
                    <div class='btn'>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-aixin"></use>
                        </svg>
                        点赞
                    </div>
                    <img v-lazy="item.imgMain" alt="">
                    <div class='title'>
                        <div class='t'>{{item.name}}</div>
                        <div class='b'>
                            ￥<span>{{item.sellingPrice}}</span><span>{{item.marketPrice}}</span>
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
        swiperSlide,
    },
    created(){
        this.axios.get('/api/activity/getActivityList?hyhType=1').then(res => {

            this.maleList = res.data.obj;
            console.log(this.maleList)
        });
        this.axios.get('/api/activity/getActivityList?hyhType=2').then(res => {

            this.fmaleList = res.data.obj;
            console.log(this.fmaleList)
        });
    },
    data(){
        return {
            male:true,
            maleList:[],
            fmaleList:[],
            notNextTick: true,
            swiperOption:{
                paginationClickable: true,
            },
            currentIndex:0
        }
    },
    methods:{
    }
}
</script>

<style lang="stylus" scoped>
.hyh
    position fixed
    width 100vw
    height 100vh
    top 0
    left 0
    z-index 999
    background #fff
    display flex
    flex-direction column
    .nav
        height 1.0667rem
        display flex
        justify-content space-around
        & > div
            display flex
            align-items center
            font-size .4rem
            justify-content center
            &.active
                border-bottom 0.0267rem solid #fc7aa5
                color #fc7aa5
    .content
        flex 1
        overflow hidden
        .item
            position relative 
            height 100%
            img 
                width 100%
                height 100%
            .btn
                width 2.2rem
                height 0.9333rem
                position absolute
                right 0
                top 0.4rem
                background rgba(255,255,255,.7)
                display flex
                align-items center
                justify-content center
                font-size .35rem
                border-top-left-radius: 0.4667rem;
                border-bottom-left-radius:0.4667rem;
                .icon 
                    font-size .5rem
                    color #666
            .title
                position absolute
                bottom 0
                width 100%
                height 2.2667rem
                background rgba(255,255,255,.5)
                display flex
                flex-direction column
                justify-content space-around
                box-sizing border-box
                padding .35rem 0
                .t
                    width 90%
                    margin 0 auto
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    font-size .4rem
                    letter-spacing 0.0267rem
                    text-align center
                .b
                    text-align center
                    color #ef260e
                    span:first-child
                        font-size .4rem
                    span:last-child
                        color #666
                        text-decoration line-through
                        margin-left 0.2rem

</style>
