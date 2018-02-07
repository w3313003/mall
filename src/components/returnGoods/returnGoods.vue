<template>
    <div class='return-wrap'>
        <div class='title'>
            退换货
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class="nav">
            <div>
                <div :class='{"active":currentIndex == 0}' data-index='0' @click='toggleNav'>换货</div>
                <div :class='{"active":currentIndex == 1}' data-index='1' @click='toggleNav'>退货</div>
            </div>
        </div>
        <div class="content">
            <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                <swiper-slide>
                    <div class='order-item' v-for="(item,index) in exchangeList" :key="index">
                        <div class='header'>
                            <div class='icon-wrap'>  
                                <svg class="icon fenlei" aria-hidden="true">
                                    <use xlink:href="#icon-shangjia"></use>
                                </svg>
                            </div> 
                            <div class='seller-name'>
                                {{item.shopName}}
                            </div>
                        </div>
                        <div class="gooddetail">
                            <img :src="item.goodsImg" alt="">
                            <div class='info'>
                                <div class="t">
                                    {{item.goodsName}}
                                </div>
                                <div class="m">
                                    {{item.specName}}
                                </div>
                                <div class="b">
                                    <span>￥{{Number(item.goodsPrice).toFixed(2)}}</span>
                                    <span>X{{item.goodsNum}}</span>
                                </div>
                            </div>
                        </div>
                        <div class='state'>
                            <div v-if="item.backState == 1">
                                审核中
                            </div>
                            <div v-if='item.backState == 2'>
                                换货中
                            </div>
                            <div v-if='item.backState == 3'>
                                不通过
                            </div>
                            <div v-if='item.backState == 4'>
                                已完成
                            </div>
                            <div v-if='item.backState == 5'>
                                退款中
                            </div>
                            <div class='btn' @click="toDetail(item)">
                                查看详情
                            </div>
                        </div>
                    </div>  
                </swiper-slide>
                <swiper-slide>
                    <div class='order-item' v-for="(item,index) in returnsList" :key="index">
                        <div class='header'>
                            <div class='icon-wrap'>  
                                <svg class="icon fenlei" aria-hidden="true">
                                    <use xlink:href="#icon-shangjia"></use>
                                </svg>
                            </div> 
                            <div class='seller-name'>
                                {{item.shopName}}
                            </div>
                        </div>
                        <div class="gooddetail">
                            <img :src="item.goodsImg" alt="">
                            <div class='info'>
                                <div class="t">
                                    {{item.goodsName}}
                                </div>
                                <div class="m">
                                    {{item.specName}}
                                </div>
                                <div class="b">
                                    <span>￥{{Number(item.goodsPrice).toFixed(2)}}</span>
                                    <span>X{{item.goodsNum}}</span>
                                </div>
                            </div>
                        </div>
                        <div class='state'>
                            <div v-if="item.backState == 1">
                                审核中
                            </div>
                            <div v-if='item.backState == 2'>
                                换货中
                            </div>
                            <div v-if='item.backState == 3'>
                                不通过
                            </div>
                            <div v-if='item.backState == 4'>
                                已完成
                            </div>
                            <div v-if='item.backState == 5'>
                                退款中
                            </div>
                            <div class='btn' @click="toDetail(item)">
                                查看详情
                            </div>
                        </div>
                    </div> 
                </swiper-slide>
            </swiper>
        </div>
        <detail v-if='show'></detail>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import detail from './returnDetail'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));


export default {
    components:{
        swiper,
        swiperSlide,
        detail
    },
    data(){
        return { 
            show: false,
            currentIndex: 0,
            notNextTick: true,
            swiperOption: {
                paginationClickable: true,
                onSlideChangeEnd:s => {
                    this.currentIndex = s.activeIndex;
                }
            },
            returnsList: [],
            exchangeList: []
        }
    },
    activated() {   
        this.axios.get(`/api/wsc/user/getBackList?state=1&userId=${userInfo.userid}`).then(res => {
            this.exchangeList = res.data.obj
        });
        this.axios.get(`/api/wsc/user/getBackList?state=2&userId=${userInfo.userid}`).then(res => {
            this.returnsList = res.data.obj
        });
    },
    methods:{
        toggleNav(e){
            const index = e.currentTarget.dataset.index;
            this.currentIndex = index;
            this.$refs.mySwiper.swiper.slideTo(index)
        },
        back(){
            this.$router.back();
        },
        toDetail(item){
            this.$router.push({
                path: `/returnDetail/${item.id}`,
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.return-wrap
    position fixed
    top 0
    left 0
    width 100%
    height 100vh
    z-index 999
    display flex 
    flex-direction column
    background #e7e7e7
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
        height 110px
        display flex
        align-items center
        justify-content center
        & > div
            width 5.3333rem
            height 0.8rem
            border 0.0267rem solid #fc7aa5
            border-radius 0.4rem
            display flex
            overflow hidden
            & > div
                flex 1
                display flex
                align-items center
                justify-content center
                font-size .35rem
                background #fff
                color #fc7aa5
                &.active
                    background #fc7aa5
                    color #fff
    .content
        flex 1
        overflow scroll
        .order-item
            background #fff
            margin-bottom 0.1333rem
            .header
                display flex
                box-sizing border-box
                padding .35rem .2rem
                font-size .4rem
                align-items center
                .icon 
                    font-size .5rem
                .seller-name
                    margin-left .3rem
            .gooddetail
                display flex
                box-sizing border-box
                padding .15rem .2rem
                font-size .35rem
                background #e7e7e7
                img
                    display block
                    flex 0 0 1.9333rem
                    height 1.9333rem
                .info
                    flex 1
                    padding-left .2rem
                    display flex
                    flex-direction column
                    justify-content space-between
                    .b
                        display flex 
                        justify-content space-between
                    .m
                        color #666
            .state
                display flex
                justify-content space-between
                padding .2rem
                box-sizing border-box
                font-size .35rem
                align-items center
                color #fc7aa5
                .btn
                    width 2.2667rem
                    height 0.8rem
                    line-height 0.8rem
                    color #fff
                    background #fc7aa5
                    border-radius 0.1333rem
                    text-align center
</style>
