<template>
    <div class='order-wrap'>
         <div class='title'>
            我的订单    
                <svg class="icon fenlei" aria-hidden="true" @click='back'>
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
        </div> 
        <div class='nav'>
            <div :class='{"active": currentIndex == 0}'  data-index='0'    @click='navToggle'>全部</div>
            <div :class='{"active": currentIndex == 1}'  data-index='1'    @click='navToggle'>待付款</div>
            <div :class='{"active": currentIndex == 2}'  data-index='2'    @click='navToggle'>待发货</div>
            <div :class='{"active": currentIndex == 3}'  data-index='3'    @click='navToggle'>待收货</div>
            <div :class='{"active": currentIndex == 4}'  data-index='4'    @click='navToggle'>待评价</div> 
        </div>
        <div class='content'>
            <swiper class='swiper' ref='swiper':options="swiperOption" :not-next-tick="notNextTick" >
                <swiper-slide>
                    <scroll :data='orderList' class='scroll'>
                        <div>
                            <div class='order-item' v-for='(item,index) in currentOrder' :key="index" @click='getDetail(item)'>
                                <div class='header'> 
                                    <div class='icon-wrap'>  
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-shangjia"></use>
                                        </svg>
                                    </div> 
                                    <div class='seller-name'>
                                        {{item.sellername}}
                                    </div>
                                    <div class='type'>
                                        <span v-if='item.type == 1'>等待买家付款</span>
                                        <span v-if='item.type == 2'>待发货</span>
                                        <span v-if='item.type == 3'>待评价</span>
                                        <span v-if='item.type == 4'>待收货</span>
                                    </div>
                                </div>
                                <div class="content">
                                    <img src="../.././assets/img/good-item.png" alt="">
                                    <div class='gooddisc'>
                                        <div class="t">
                                            {{item.good.title}}
                                        </div>
                                        <div class="m">
                                            {{item.good.color}}
                                        </div>
                                        <div class="b">
                                            <span>￥{{item.good.price}}</span>
                                            <span>X{{item.good.count}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class='t-price'>
                                    <div  class='t'>
                                        <span>商品总价</span>
                                        <span>￥{{item.good.price * item.good.count}}</span>
                                    </div>
                                    <div  class='m'>
                                        <span>运费</span>
                                        <span>￥{{item.good.expressFee}}</span>
                                    </div>
                                    <div  class='b'>
                                        <span>订单总价</span>
                                        <span>￥{{item.good.price * item.good.count + item.good.expressFee}}</span>
                                    </div>
                                </div>
                                <div class='b-price'>
                                    <span>实付款</span>
                                    <span>￥{{item.good.price * item.good.count + item.good.expressFee}}</span>
                                </div>
                                <div class='control'>
                                    <div class='cancel' v-if='item.type == 1'>
                                        取消订单
                                    </div>
                                    <div class='pay' v-if='item.type == 1'>
                                        付款
                                    </div>
                                    <div class='express' v-if='item.type == 4'>
                                        查看物流
                                    </div>
                                    <div class='comment' v-if='item.type == 3'>
                                        评价
                                    </div>
                                    <div class='tips'  v-if='item.type == 2'>
                                        提醒发货
                                    </div>
                                </div>
                            </div>
                        </div>
                    </scroll>
                </swiper-slide>
                <swiper-slide>
                    <scroll class='scroll' :data='orderList'>
                    <div>
                        <div class='order-item' v-for='(item,index) in pendingPayList' :key="index">
                                <div class='header'> 
                                    <div class='icon-wrap'>  
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-shangjia"></use>
                                        </svg>
                                    </div> 
                                    <div class='seller-name'>
                                        {{item.sellername}}
                                    </div>
                                    <div class='type'>
                                        <span v-if='item.type == 1'>等待买家付款</span>
                                        <span v-if='item.type == 2'>待发货</span>
                                        <span v-if='item.type == 3'>待评价</span>
                                        <span v-if='item.type == 4'>待收货</span>
                                    </div>
                                </div>
                                <div class="content">
                                    <img src="../.././assets/img/good-item.png" alt="">
                                    <div class='gooddisc'>
                                        <div class="t">
                                            {{item.good.title}}
                                        </div>
                                        <div class="m">
                                            {{item.good.color}}
                                        </div>
                                        <div class="b">
                                            <span>￥{{item.good.price}}</span>
                                            <span>X{{item.good.count}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class='t-price'>
                                    <div  class='t'>
                                        <span>商品总价</span>
                                        <span>￥{{item.good.price * item.good.count}}</span>
                                    </div>
                                    <div  class='m'>
                                        <span>运费</span>
                                        <span>￥{{item.good.expressFee}}</span>
                                    </div>
                                    <div  class='b'>
                                        <span>订单总价</span>
                                        <span>￥{{item.good.price * item.good.count + item.good.expressFee}}</span>
                                    </div>
                                </div>
                                <div class='b-price'>
                                    <span>实付款</span>
                                    <span>￥{{item.good.price * item.good.count + item.good.expressFee}}</span>
                                </div>
                                <div class='control'>
                                    <div class='cancel' v-if='item.type == 1'>
                                        取消订单
                                    </div>
                                    <div class='pay' v-if='item.type == 1'>
                                        付款
                                    </div>
                                    <div class='express' v-if='item.type == 4'>
                                        查看物流
                                    </div>
                                    <div class='comment' v-if='item.type == 3'>
                                        评价
                                    </div>
                                    <div class='tips'  v-if='item.type == 2'>
                                        提醒发货
                                    </div>
                                </div>
                            </div>
                        </div>
                    </scroll>
                </swiper-slide>
                <swiper-slide>
                    <scroll class='scroll' :data='watingShipment'>
                        <div>
                            <div class='order-item' v-for='(item,index) in watingShipment' :key="index">
                                <div class='header'> 
                                    <div class='icon-wrap'>  
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-shangjia"></use>
                                        </svg>
                                    </div> 
                                    <div class='seller-name'>
                                        {{item.sellername}}
                                    </div>
                                    <div class='type'>
                                        <span v-if='item.type == 1'>等待买家付款</span>
                                        <span v-if='item.type == 2'>待发货</span>
                                        <span v-if='item.type == 3'>待评价</span>
                                        <span v-if='item.type == 4'>待收货</span>
                                    </div>
                                </div>
                                <div class="content">
                                    <img src="../.././assets/img/good-item.png" alt="">
                                    <div class='gooddisc'>
                                        <div class="t">
                                            {{item.good.title}}
                                        </div>
                                        <div class="m">
                                            {{item.good.color}}
                                        </div>
                                        <div class="b">
                                            <span>￥{{item.good.price}}</span>
                                            <span>X{{item.good.count}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class='t-price'>
                                    <div  class='t'>
                                        <span>商品总价</span>
                                        <span>￥{{item.good.price * item.good.count}}</span>
                                    </div>
                                    <div  class='m'>
                                        <span>运费</span>
                                        <span>￥{{item.good.expressFee}}</span>
                                    </div>
                                    <div  class='b'>
                                        <span>订单总价</span>
                                        <span>￥{{item.good.price * item.good.count + item.good.expressFee}}</span>
                                    </div>
                                </div>
                                <div class='b-price'>
                                    <span>实付款</span>
                                    <span>￥{{item.good.price * item.good.count + item.good.expressFee}}</span>
                                </div>
                                <div class='control'>
                                    <div class='cancel' v-if='item.type == 1'>
                                        取消订单
                                    </div>
                                    <div class='pay' v-if='item.type == 1'>
                                        付款
                                    </div>
                                    <div class='express' v-if='item.type == 4'>
                                        查看物流
                                    </div>
                                    <div class='comment' v-if='item.type == 3'>
                                        评价
                                    </div>
                                    <div class='tips'  v-if='item.type == 2'>
                                        提醒发货
                                    </div>
                                </div>
                            </div>
                        </div>
                    </scroll>  
                </swiper-slide>
                <swiper-slide>
                    <scroll :data='watingExpress' class='scroll'>
                        <div>
                            <div class='order-item' v-for='(item,index) in watingExpress' :key="index">
                                <div class='header'> 
                                    <div class='icon-wrap'>  
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-shangjia"></use>
                                        </svg>
                                    </div> 
                                    <div class='seller-name'>
                                        {{item.sellername}}
                                    </div>
                                    <div class='type'>
                                        <span v-if='item.type == 1'>等待买家付款</span>
                                        <span v-if='item.type == 2'>待发货</span>
                                        <span v-if='item.type == 3'>待评价</span>
                                        <span v-if='item.type == 4'>待收货</span>
                                    </div>
                                </div>
                                <div class="content">
                                    <img src="../.././assets/img/good-item.png" alt="">
                                    <div class='gooddisc'>
                                        <div class="t">
                                            {{item.good.title}}
                                        </div>
                                        <div class="m">
                                            {{item.good.color}}
                                        </div>
                                        <div class="b">
                                            <span>￥{{item.good.price}}</span>
                                            <span>X{{item.good.count}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class='t-price'>
                                    <div  class='t'>
                                        <span>商品总价</span>
                                        <span>￥{{item.good.price * item.good.count}}</span>
                                    </div>
                                    <div  class='m'>
                                        <span>运费</span>
                                        <span>￥{{item.good.expressFee}}</span>
                                    </div>
                                    <div  class='b'>
                                        <span>订单总价</span>
                                        <span>￥{{item.good.price * item.good.count + item.good.expressFee}}</span>
                                    </div>
                                </div>
                                <div class='b-price'>
                                    <span>实付款</span>
                                    <span>￥{{item.good.price * item.good.count + item.good.expressFee}}</span>
                                </div>
                                <div class='control'>
                                    <div class='cancel' v-if='item.type == 1'>
                                        取消订单
                                    </div>
                                    <div class='pay' v-if='item.type == 1'>
                                        付款
                                    </div>
                                    <div class='express' v-if='item.type == 4'>
                                        查看物流
                                    </div>
                                    <div class='comment' v-if='item.type == 3'>
                                        评价
                                    </div>
                                    <div class='tips'  v-if='item.type == 2'>
                                        提醒发货
                                    </div>
                                </div>
                            </div>
                        </div>
                    </scroll>
                </swiper-slide>
                <swiper-slide>
                    <scroll :data='watingComment' class='scroll'>
                        <div>
                            <div class='order-item' v-for='(item,index) in watingComment' :key="index">
                                <div class='header'> 
                                    <div class='icon-wrap'>  
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-shangjia"></use>
                                        </svg>
                                    </div> 
                                    <div class='seller-name'>
                                        {{item.sellername}}
                                    </div>
                                    <div class='type'>
                                        <span v-if='item.type == 1'>等待买家付款</span>
                                        <span v-if='item.type == 2'>待发货</span>
                                        <span v-if='item.type == 3'>待评价</span>
                                        <span v-if='item.type == 4'>待收货</span>
                                    </div>
                                </div>
                                <div class="content">
                                    <img src="../.././assets/img/good-item.png" alt="">
                                    <div class='gooddisc'>
                                        <div class="t">
                                            {{item.good.title}}
                                        </div>
                                        <div class="m">
                                            {{item.good.color}}
                                        </div>
                                        <div class="b">
                                            <span>￥{{item.good.price}}</span>
                                            <span>X{{item.good.count}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class='t-price'>
                                    <div  class='t'>
                                        <span>商品总价</span>
                                        <span>￥{{item.good.price * item.good.count}}</span>
                                    </div>
                                    <div  class='m'>
                                        <span>运费</span>
                                        <span>￥{{item.good.expressFee}}</span>
                                    </div>
                                    <div  class='b'>
                                        <span>订单总价</span>
                                        <span>￥{{item.good.price * item.good.count + item.good.expressFee}}</span>
                                    </div>
                                </div>
                                <div class='b-price'>
                                    <span>实付款</span>
                                    <span>￥{{item.good.price * item.good.count + item.good.expressFee}}</span>
                                </div>
                                <div class='control'>
                                    <div class='cancel' v-if='item.type == 1'>
                                        取消订单
                                    </div>
                                    <div class='pay' v-if='item.type == 1'>
                                        付款
                                    </div>
                                    <div class='express' v-if='item.type == 4'>
                                        查看物流
                                    </div>
                                    <div class='comment' v-if='item.type == 3'>
                                        评价
                                    </div>
                                    <div class='tips'  v-if='item.type == 2'>
                                        提醒发货
                                    </div>
                                </div>
                            </div>
                        </div>
                    </scroll>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import scroll from 'common/scroll'
import { orderList } from 'common/util'

export default {
    created(){
        this.orderList = orderList;
        this.currentOrder = JSON.parse(JSON.stringify(this.orderList));
    },
    activated(){
        console.log(this.$route.params.index);
        let index = 0;
        if(!this.$route.params.index){
            index = 0
        } else {
            index = this.$route.params.index;
        };
        this.currentIndex = index;  
        this.$refs.swiper.swiper.slideTo(index)
    },
    methods:{
        back(){
            this.$router.back();
        },
        navToggle(e){
            const index = e.currentTarget.dataset.index;
            this.currentIndex = index;
            this.$refs.swiper.swiper.slideTo(index)
        },
        getDetail(item){
            this.$router.push({
                path:`/order/${item.id}`,   
            })
        }
    },
    components:{
        swiper, 
        swiperSlide,
        scroll
    },
    computed:{
        pendingPayList(){
            let _arr = JSON.parse(JSON.stringify(this.orderList));
            return _arr.filter(v => {
               return  v.type == 1;
            });
        },
        watingShipment(){
            let _arr = JSON.parse(JSON.stringify(this.orderList));
            return _arr.filter(v => {
                return v.type == 2
            });
        },
        watingExpress(){
            let _arr = JSON.parse(JSON.stringify(this.orderList));
            return _arr.filter(v => {
                return v.type == 4
            });
        },
        watingComment(){
            let _arr = JSON.parse(JSON.stringify(this.orderList));
            return _arr.filter(v => {
                return v.type == 3
            });
        }

    },
    data(){
        return {
            orderList:[],
            currentIndex:0,
            swiperOption:{
                paginationClickable: true,
                onSlideChangeEnd:s => {
                    this.currentIndex = s.activeIndex;
                }
            },
            notNextTick:true
        }
    }
};
</script>

<style lang="stylus" scoped>
.order-wrap
    width 100%
    height 100vh
    position fixed
    background #e7e7e7
    z-index 1000
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
        height 1.2rem
        background-color #fff
        display flex
        justify-content space-around
        font-size .4rem
        border-bottom 0.0267rem solid #e7e7e7
        & > div
            height 100%
            display flex
            align-items center
            &.active
                color #fc7aa5
                border-bottom 0.0133rem solid #fc7aa5
    .content
        flex 1
        overflow hidden
        .swiper
            height 100%
            overflow hidden
            .scroll
                height 100%
                overflow hidden
                .order-item
                    background #ffffff
                    .header
                        display flex
                        box-sizing border-box
                        padding .2rem
                        align-items center
                        font-size .35rem
                        .icon-wrap
                            .icon
                                font-size .5rem
                        .seller-name
                            flex 1
                            padding-left .2rem
                        .type
                            font-size .3rem
                            color #fc7aa5
                    .content
                        background #e7e7e7
                        box-sizing border-box
                        padding .2rem
                        display flex
                        img
                            width 1.9333rem
                            height 1.9333rem
                        .gooddisc
                            flex 1
                            padding-left .2rem
                            display flex
                            flex-direction column
                            justify-content space-between
                            font-size .35rem
                            .b
                                display flex
                                justify-content space-between
                    .t-price
                        box-sizing border-box
                        padding .2rem
                        border-bottom 0.0133rem solid #e7e7e7
                        & > div
                            display flex
                            justify-content space-between
                            margin .1rem 0
                            color #666
                        .b
                            font-size .4rem
                            color #000
                    .b-price    
                        box-sizing border-box
                        padding .2rem
                        display flex
                        justify-content space-between
                        font-size .4rem
                        height 1.2rem
                        align-items center
                        border-bottom 0.0133rem solid #e7e7e7
                    .control
                        height 1.2rem
                        box-sizing border-box
                        padding .2rem
                        display flex
                        justify-content flex-end
                        & > div
                            height 100%
                            display flex
                            align-items center
                            padding 0 .2rem
                            font-size .35rem
                            border-radius 0.1333rem
                            margin 0 .2rem
                            &.cancel,&.express
                                color #a4a4a4
                                background #e8e8e8
                            &.pay,&.tips,&.comment
                                color #fff
                                background #fc7ba6
</style>
