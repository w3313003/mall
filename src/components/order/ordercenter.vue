<template>
    <div class='order-wrap'>
         <div class='title'>
            我的订单    
                <svg class="icon fenlei" aria-hidden="true" @click='back'>
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
        </div> 
        <div class='nav'>
            <div v-for='(item,index) in navList' :key="index"
                :class='{"active":currentIndex == index}' 
                :data-index='index' 
                @click="navToggle">
                {{item}}
            </div>
        </div>
        <div class='contents'>
            <swiper class='swiper' ref='swiper' :options="swiperOption" :not-next-tick="notNextTick" >
                <swiper-slide>
                    <div ref="scroll1" class='scroll'>
                        <div v-if="currentOrder && currentOrder.length > 0">
                            <div class='order-item' v-for='(item,index) in currentOrder' :key="index" @click='getDetail(item)'>
                                <div class='header'> 
                                    <div class='icon-wrap'>  
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-shangjia"></use>
                                        </svg>
                                    </div> 
                                    <div class='seller-name'>
                                        {{item.shopName}}
                                    </div>
                                    <div class='type'>
                                        <span v-if='item.state == 1'>等待买家付款</span>
                                        <span v-if='item.state == 2'>待发货</span>
                                        <span v-if='item.state == 3'>待收货</span>
                                        <span v-if='item.state == 4'>待评价</span>
                                        <span v-if='item.state == 5'>已完成</span>
                                        <span v-if="item.state == 6">已取消</span>
                                    </div>
                                </div>
                                <div class="content-wrap" v-for='(items,i) in item.orderGoods' :key="i">
                                    <div class="content">
                                        <img :src="items.goodsImg" alt="">
                                        <div class='gooddisc'>
                                            <div class="t">
                                                {{items.goodsName}}
                                            </div>
                                            <div class="m">
                                                <div>
                                                    {{items.specName}}
                                                </div>
                                               
                                            </div>
                                            <div class="b">
                                                <span>￥{{Number(items.goodsPrice).toFixed(2)}}</span>
                                                <span>X{{items.goodsNum}}</span>
                                            </div>
                                            <div class="c">
                                                 <div v-if="item.state == 4" class="btn" @click.stop="goToComment(item,items)"> 
                                                    去评价
                                                </div>
                                                <div class="btn" v-if="item.payState == 2" @click.stop="returns(item,items,false)">
                                                    退款
                                                </div>
                                                <div class="btn" v-if="item.state == 5" @click.stop="returns(item,items,true)">
                                                    换货
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='t-price'>
                                    <div  class='t'>
                                        <span>商品总价</span>
                                        <span>￥{{item.goodsPriceSum}}</span>
                                    </div>
                                    <div class='m'>
                                        <span>运费</span>
                                        <span>￥{{item.freight}}</span>
                                    </div>
                                    <div  class='b'>
                                        <span>订单总价</span>
                                        <span>￥{{item.goodsPriceSum * 1 + item.freight * 1}}</span>
                                    </div>
                                </div>
                                <div class='b-price'>
                                    <span>实付款</span>
                                    <span>￥{{+item.payPrice}}</span>
                                </div>
                                <div class='control' v-show="item.state !== '6'">
                                    <div class='cancel'  @click.stop='cancelOrder(item)'  v-if='item.state == 1'>
                                        取消订单
                                    </div>
                                    <div class='pay' @click.stop="pay(item)" v-if='item.state == 1'>
                                        付款
                                    </div>
                                    <div class='express' v-if='item.state == 3' @click.stop='expressD(item)'>
                                        查看物流
                                    </div>
                                    <div class='tips' @click.stop='tip'  v-if='item.state == 2'>
                                        提醒发货
                                    </div>
                                    <div class='tips' @click.stop='confirmGoods(item)'  v-if='item.state == 3'>
                                        确认收货
                                    </div>
                                    
                                </div>
                            </div>
                            <div style="height: 2.4rem"></div>
                        </div>
                        <div class="empty" v-else>
                            <div class='empty-content'>
                                <img src='../../assets/img/empty.gif'/> 
                                <p class='desc'> 
                                    暂无订单
                                </p>
                                <div class='btn' @click='goIndex'>
                                    去逛逛
                                </div> 
                            </div> 
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class='scroll' ref='scroll2'>
                    <div v-if='watingPayList && watingPayList.length > 0'>
                        <div class='order-item' v-for='(item,index) in watingPayList' :key="index" @click='getDetail(item)'>
                                <div class='header'> 
                                    <div class='icon-wrap'>  
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-shangjia"></use>
                                        </svg>
                                    </div> 
                                    <div class='seller-name'>
                                        {{item.shopName}}
                                    </div>
                                    <div class='type'>
                                        <span v-if='item.state == 1'>等待买家付款</span>
                                        <span v-if='item.state == 2'>待发货</span>
                                        <span v-if='item.state == 3'>待收货</span>
                                        <span v-if='item.state == 4'>待评价</span>
                                        <span v-if='item.state == 5'>已完成</span>
                                        <span v-if="item.state == 6">已取消</span>
                                    </div>
                                </div>
                                <div class="content-wrap" v-for='(items,i) in item.orderGoods' :key="i">
                                    <div class="content">
                                        <img :src="items.goodsImg" alt="">
                                        <div class='gooddisc'>
                                            <div class="t">
                                                {{items.goodsName}}
                                            </div>
                                            <div class="m">
                                                <div>
                                                    {{items.specName}}
                                                </div>
                                               
                                            </div>
                                            <div class="b">
                                                <span>￥{{Number(items.goodsPrice).toFixed(2)}}</span>
                                                <span>X{{items.goodsNum}}</span>
                                            </div>
                                            <div class="c">
                                                 <div v-if="item.state == 4" class="btn" @click.stop="goToComment(item,items)"> 
                                                    去评价
                                                </div>
                                                <div class="btn" v-if="item.payState == 2" @click.stop="returns(item,items,false)">
                                                    退款
                                                </div>
                                                <div class="btn" v-if="item.state == 5" @click.stop="returns(item,items,true)">
                                                    换货
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='t-price'>
                                    <div  class='t'>
                                        <span>商品总价</span>
                                        <span>￥{{item.goodsPriceSum}}</span>
                                    </div>
                                    <div class='m'>
                                        <span>运费</span>
                                        <span>￥{{item.freight}}</span>
                                    </div>
                                    <div  class='b'>
                                        <span>订单总价</span>
                                        <span>￥{{item.goodsPriceSum * 1 + item.freight * 1}}</span>
                                    </div>
                                </div>
                                <div class='b-price'>
                                    <span>实付款</span>
                                    <span>￥{{+item.payPrice}}</span>
                                </div>
                                <div class='control' v-show="item.state !== '6'">
                                    <div class='cancel'  @click.stop='cancelOrder(item)'  v-if='item.state == 1'>
                                        取消订单
                                    </div>
                                    <div class='pay' @click.stop="pay(item)" v-if='item.state == 1'>
                                        付款
                                    </div>
                                    <div class='express' v-if='item.state == 3' @click.stop='expressD(item)'>
                                        查看物流
                                    </div>
                                    <div class='tips'  @click.stop='tip'  v-if='item.state == 2'>
                                        提醒发货
                                    </div>
                                    <div class='tips' @click.stop='confirmGoods(item)'  v-if='item.state == 3'>
                                        确认收货
                                    </div>
                                    
                                </div>
                        </div>
                        <div style="height: 2.4rem"></div>
                    </div>
                    <div class="empty" v-else>
                        <div class='empty-content'>
                            <img src='../../assets/img/empty.gif'/> 
                            <p class='desc'> 
                                暂无订单
                            </p>
                            <div class='btn' @click='goIndex'>
                                去逛逛
                            </div> 
                        </div> 
                    </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class='scroll' ref='scroll3'>
                        <div v-if='watingShipment && watingShipment.length > 0'>
                            <div class='order-item' v-for='(item,index) in watingShipment' :key="index" @click='getDetail(item)'>
                                <div class='header'> 
                                    <div class='icon-wrap'>  
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-shangjia"></use>
                                        </svg>
                                    </div> 
                                    <div class='seller-name'>
                                        {{item.shopName}}
                                    </div>
                                    <div class='type'>
                                        <span v-if='item.state == 1'>等待买家付款</span>
                                        <span v-if='item.state == 2'>待发货</span>
                                        <span v-if='item.state == 3'>待收货</span>
                                        <span v-if='item.state == 4'>待评价</span>
                                        <span v-if='item.state == 5'>已完成</span>
                                        <span v-if="item.state == 6">已取消</span>
                                    </div>
                                </div>
                                <div class="content-wrap" v-for='(items,i) in item.orderGoods' :key="i">
                                    <div class="content">
                                        <img :src="items.goodsImg" alt="">
                                        <div class='gooddisc'>
                                            <div class="t">
                                                {{items.goodsName}}
                                            </div>
                                            <div class="m">
                                                <div>
                                                    {{items.specName}}
                                                </div>
                                               
                                            </div>
                                            <div class="b">
                                                <span>￥{{Number(items.goodsPrice).toFixed(2)}}</span>
                                                <span>X{{items.goodsNum}}</span>
                                            </div>
                                            <div class="c">
                                                 <div v-if="item.state == 4" class="btn" @click.stop="goToComment(item,items)"> 
                                                    去评价
                                                </div>
                                                <div class="btn" v-if="item.payState == 2" @click.stop="returns(item,items,false)">
                                                    退款
                                                </div>
                                                <div class="btn" v-if="item.state == 5" @click.stop="returns(item,items,true)">
                                                    换货
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='t-price'>
                                    <div  class='t'>
                                        <span>商品总价</span>
                                        <span>￥{{item.goodsPriceSum}}</span>
                                    </div>
                                    <div class='m'>
                                        <span>运费</span>
                                        <span>￥{{item.freight}}</span>
                                    </div>
                                    <div  class='b'>
                                        <span>订单总价</span>
                                        <span>￥{{item.goodsPriceSum * 1 + item.freight * 1}}</span>
                                    </div>
                                </div>
                                <div class='b-price'>
                                    <span>实付款</span>
                                    <span>￥{{+item.payPrice}}</span>
                                </div>
                                <div class='control' v-show="item.state !== '6'">
                                    <div class='cancel'  @click.stop='cancelOrder(item)'  v-if='item.state == 1'>
                                        取消订单
                                    </div>
                                    <div class='pay' @click.stop="pay(item)" v-if='item.state == 1'>
                                        付款
                                    </div>
                                    <div class='express' v-if='item.state == 3' @click.stop='expressD(item)'>
                                        查看物流
                                    </div>
                                    <div class='tips'   @click.stop='tip'  v-if='item.state == 2'>
                                        提醒发货
                                    </div>
                                    <div class='tips' @click.stop='confirmGoods(item)'  v-if='item.state == 3'>
                                        确认收货
                                    </div>
                                    
                                </div>
                            </div>
                            <div style="height: 2.4rem"></div>
                        </div>
                        <div class="empty" v-else>
                            <div class='empty-content'>
                                <img src='../../assets/img/empty.gif'/> 
                                <p class='desc'> 
                                    暂无订单
                                </p>
                                <div class='btn' @click='goIndex'>
                                    去逛逛
                                </div> 
                            </div> 
                        </div>
                    </div>  
                </swiper-slide>
                <swiper-slide>
                    <div ref='scroll4' class='scroll'>
                        <div v-if='watingExpress && watingExpress.length > 0'>
                            <div class='order-item' v-for='(item,index) in watingExpress' :key="index" @click='getDetail(item)'>
                                <div class='header'> 
                                    <div class='icon-wrap'>  
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-shangjia"></use>
                                        </svg>
                                    </div> 
                                    <div class='seller-name'>
                                        {{item.shopName}}
                                    </div>
                                    <div class='type'>
                                        <span v-if='item.state == 1'>等待买家付款</span>
                                        <span v-if='item.state == 2'>待发货</span>
                                        <span v-if='item.state == 3'>待收货</span>
                                        <span v-if='item.state == 4'>待评价</span>
                                        <span v-if='item.state == 5'>已完成</span>
                                        <span v-if="item.state == 6">已取消</span>
                                    </div>
                                </div>
                                <div class="content-wrap" v-for='(items,i) in item.orderGoods' :key="i">
                                    <div class="content">
                                        <img :src="items.goodsImg" alt="">
                                        <div class='gooddisc'>
                                            <div class="t">
                                                {{items.goodsName}}
                                            </div>
                                            <div class="m">
                                                <div>
                                                    {{items.specName}}
                                                </div>
                                               
                                            </div>
                                            <div class="b">
                                                <span>￥{{Number(items.goodsPrice).toFixed(2)}}</span>
                                                <span>X{{items.goodsNum}}</span>
                                            </div>
                                            <div class="c">
                                                 <div v-if="item.state == 4" class="btn" @click.stop="goToComment(item,items)"> 
                                                    去评价
                                                </div>
                                                <div class="btn" v-if="item.payState == 2" @click.stop="returns(item,items,false)">
                                                    退款
                                                </div>
                                                <div class="btn" v-if="item.state == 5" @click.stop="returns(item,items,true)">
                                                    换货
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='t-price'>
                                    <div  class='t'>
                                        <span>商品总价</span>
                                        <span>￥{{item.goodsPriceSum}}</span>
                                    </div>
                                    <div class='m'>
                                        <span>运费</span>
                                        <span>￥{{item.freight}}</span>
                                    </div>
                                    <div  class='b'>
                                        <span>订单总价</span>
                                        <span>￥{{item.goodsPriceSum * 1 + item.freight * 1}}</span>
                                    </div>
                                </div>
                                <div class='b-price'>
                                    <span>实付款</span>
                                    <span>￥{{+item.payPrice}}</span>
                                </div>
                                <div class='control' v-show="item.state !== '6'">
                                    <div class='cancel'  @click.stop='cancelOrder(item)'  v-if='item.state == 1'>
                                        取消订单
                                    </div>
                                    <div class='pay' @click.stop="pay(item)" v-if='item.state == 1'>
                                        付款
                                    </div>
                                    <div class='express' v-if='item.state == 3' @click.stop='expressD(item)'>
                                        查看物流
                                    </div>
                                    <div class='tips'   @click.stop='tip' v-if='item.state == 2'>
                                        提醒发货
                                    </div>
                                    <div class='tips' @click.stop='confirmGoods(item)'  v-if='item.state == 3'>
                                        确认收货
                                    </div>
                                    
                                </div>
                            </div>
                            <div style="height: 2.4rem"></div>
                        </div>
                        <div class="empty" v-else>
                            <div class='empty-content'>
                                <img src='../../assets/img/empty.gif'/> 
                                <p class='desc'> 
                                    暂无订单
                                </p>
                                <div class='btn' @click='goIndex'>
                                    去逛逛
                                </div> 
                            </div> 
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div ref='scroll5' class='scroll'>
                        <div v-if='watingComment && watingComment.length > 0'>
                            <div class='order-item' v-for='(item,index) in watingComment' :key="index" @click='getDetail(item)'>
                                <div class='header'> 
                                    <div class='icon-wrap'>  
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-shangjia"></use>
                                        </svg>
                                    </div> 
                                    <div class='seller-name'>
                                        {{item.shopName}}
                                    </div>
                                    <div class='type'>
                                        <span v-if='item.state == 1'>等待买家付款</span>
                                        <span v-if='item.state == 2'>待发货</span>
                                        <span v-if='item.state == 3'>待收货</span>
                                        <span v-if='item.state == 4'>待评价</span>
                                        <span v-if='item.state == 5'>已完成</span>
                                        <span v-if="item.state == 6">已取消</span>
                                    </div>
                                </div>
                                <div class="content-wrap" v-for='(items,i) in item.orderGoods' :key="i">
                                    <div class="content">
                                        <img :src="items.goodsImg" alt="">
                                        <div class='gooddisc'>
                                            <div class="t">
                                                {{items.goodsName}}
                                            </div>
                                            <div class="m">
                                                <div>
                                                    {{items.specName}}
                                                </div>
                                               
                                            </div>
                                            <div class="b">
                                                <span>￥{{Number(items.goodsPrice).toFixed(2)}}</span>
                                                <span>X{{items.goodsNum}}</span>
                                            </div>
                                            <div class="c">
                                                 <div v-if="item.state == 4" class="btn" @click.stop="goToComment(item,items)"> 
                                                    去评价
                                                </div>
                                                <div class="btn" v-if="item.payState == 2" @click.stop="returns(item,items,false)">
                                                    退款
                                                </div>
                                                <div class="btn" v-if="item.state == 5" @click.stop="returns(item,items,true)">
                                                    换货
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='t-price'>
                                    <div  class='t'>
                                        <span>商品总价</span>
                                        <span>￥{{item.goodsPriceSum}}</span>
                                    </div>
                                    <div class='m'>
                                        <span>运费</span>
                                        <span>￥{{item.freight}}</span>
                                    </div>
                                    <div  class='b'>
                                        <span>订单总价</span>
                                        <span>￥{{item.goodsPriceSum * 1 + item.freight * 1}}</span>
                                    </div>
                                </div>
                                <div class='b-price'>
                                    <span>实付款</span>
                                    <span>￥{{+item.payPrice}}</span>
                                </div>
                                <div class='control' v-show="item.state !== '6'">
                                    <div class='cancel'  @click.stop='cancelOrder(item)'  v-if='item.state == 1'>
                                        取消订单
                                    </div>
                                    <div class='pay' @click.stop="pay(item)" v-if='item.state == 1'>
                                        付款
                                    </div>
                                    <div class='express' v-if='item.state == 3' @click.stop='expressD(item)'>
                                        查看物流
                                    </div>
                                    <div class='tips'   @click.stop='tip'  v-if='item.state == 2'>
                                        提醒发货
                                    </div>
                                    <div class='tips' @click.stop='confirmGoods(item)'  v-if='item.state == 3'>
                                        确认收货
                                    </div>
                                    
                                </div>
                            </div>
                            <div style="height: 2.4rem"></div>
                        </div>
                        <div class="empty" v-else>
                            <div class='empty-content'>
                                <img src='../../assets/img/empty.gif'/> 
                                <p class='desc'> 
                                    暂无订单
                                </p>
                                <div class='btn' @click='goIndex'>
                                    去逛逛
                                </div> 
                            </div> 
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <comment 
            v-if='commenting' 
            :goodsInfo='currentGoods'
            :orderId='currentOrders.id'
            @close='commentClose'>
        </comment>
        <success
            v-if='success'
            :consignee='currentItem.consignee'
            :totalMoney='currentItem.payPrice'
            :address='currentItem.address'
        >
        </success>
        <transition name="Return">
            <Return 
                v-if='returning'
                :orderInfo='currentReturnGoods'
                :isExchange='isExchange'
                :orderId='currentOrderId'
                @close='returningClose'
            >
            </Return>
        </transition>
            <Express v-if="expressShow"
            :expressInfo='currentExpressInfo'
            :orderId='currentExpressOrderId'
            @back='expressBack'
            >

            </Express>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import scroll from 'common/scroll'
import comment from './comment'
import { APPID } from 'common/util'
import wx from 'weixin-js-sdk'
import success from 'common/success';
import { Toast } from 'mint-ui'
import Return from './return'
import Express from './express'

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
export default {
    created(){
        
    },
    async activated(){
        this.success = false;
        this.commenting = false;
        this.returning = false;
        this._getOrderList();
        let index = 0;
        if(!this.$route.params.index){
            index = 0
        } else {
            index = this.$route.params.index;
        };
        this.currentIndex = index;  
        this.$refs.swiper.swiper.slideTo(index);
        await this._getWxConfig();
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
                path:`/order/${item.id}` 
            })
        },
        expressD(item) {
            let data = new URLSearchParams();
                data.append('id',item.id)
            this.axios.post('/api/order/orderLogistics',data).then(res => {
                console.log(JSON.parse(res.data.obj));
                this.currentExpressInfo = JSON.parse(res.data.obj);
                this.currentExpressOrderId = item.id;
                this.expressShow = true;
            })
        },
        confirmGoods(item) {
            let data = new URLSearchParams();
                data.append('id',item.id);
            this.axios.post('/api/order/confirmReceipt',data).then(res => {
                console.log(res.data)
                if(res.data.code === '200') {
                    Toast('收货成功');
                    setTimeout(() => {
                        this._getOrderList();
                    },1000)
                }
            })
        },
        expressBack() {
            this._getOrderList();
            this.expressShow = false;
        },
        commentClose() {
            this._getOrderList();
            this.commenting = false;
        },
        returningClose() {
            this._getOrderList();
            this.returning = false;
        },
        goToComment(item,items){
            this.currentOrders = item;
            this.currentGoods = items;
            this.commenting = true;
        },
        cancelOrder(item){
            console.log(item.id);
            let data = new URLSearchParams();
                data.append('id',item.id);
            this.axios.post('/api/order/cancelOrder',data).then(res => {
                if(res.data.code === '200') {
                    Toast('订单取消成功');
                    setTimeout(() => {
                        this._getOrderList();
                    },1000)
                }
            });
        },
        returns(item,items,flag) {
            this.currentOrderId = item.id;
            let data = new URLSearchParams();
                data.append('id',items.id);
            this.axios.post('/api/wsc/user/getOrderGoodsDetail',data).then(res => {
                this.currentReturnGoods = res.data.obj;
                this.returning = true;
                this.isExchange = flag;
            })
        },
        
        pay(item) {
            this.currentItem = item;
            let obj = {
                money: item.payPrice,
                addressId: item.addressId,
                userId: userInfo.userid,
                orderList:[{
                    shopId: item.shopId,
                    shopName: item.shopName,
                    payPrice: item.payPrice,
                    freight: item.freight,
                    orderGoods: item.orderGoods
                }]
            };
                let data = new URLSearchParams();
                    data.append("userId", userInfo.userid);
                    data.append("orderIds", item.id);
                    data.append("money", item.payPrice);
                    data.append("url", location.href);
                    this.axios.post("/api/order/payOrder", data).then(res => {
                        alert("开始支付");
                        wx.chooseWXPay({
                          timestamp: res.data.obj.timestamp,
                          nonceStr: res.data.obj.nonce,
                          package: res.data.obj.packageName,
                          signType: res.data.obj.signType,
                          paySign: res.data.obj.signature,
                          success: () => {
                                var param = new URLSearchParams();
                                param.append("payId", res.data.obj.payId);
                                alert("支付成功");
                                this.axios.post("/api/order/paySuccess", param).then(res => {
                                    this.success = true
                                });
                          },
                          cancel: () => {
                            var param = new URLSearchParams();
                                param.append("payId", res.data.obj.payId);
                                alert("取消");
                            }
                        });
                    });
        },
        tip() {
            Toast('提醒成功')
        },
        goIndex() {
            this.$router.push('/index')
        },
        _scrollRefresh(){
            // let arr = Object.values(this.$refs);
            // arr.splice(-1,1);
            // for(let i of arr){
            //     i.refresh();
            // }
        },
        _getOrderList() {
            let params = new URLSearchParams();
            params.append('memberCode',userInfo.userid);
            this.axios.post('/api/order/getOrderList',params).then(res => {
                if(res.data.code !== 'success') throw new Error('error');
                this.orderList = res.data.obj.filter(v => {
                     return v.orderGoods;
                });
            this.currentOrder = this.orderList
            });
        },
        _getWxConfig() {
            let configUrl = location.href.split('#'),
                userId = userInfo.userId;
            let params = new URLSearchParams();
                params.append('url',configUrl);
                params.append('userId',userId);
            return this.axios.post(`/api/wsc/user/getJsSdk`,params).then(res => {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: APPID, // 必填，公众号的唯一标识
                    timestamp: res.data.obj.timestamp , // 必填，生成签名的时间戳
                    nonceStr: res.data.obj.nonce, // 必填，生成签名的随机串
                    signature: res.data.obj.signature,// 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    success(){
                        alert('confsig:ok')
                    },
                    error(){
                        alert('config:error')
                    }
                });
               wx.ready(() => {
                   console.log("i'm ready")
               });
            });
        },
    },
    components:{
        swiper, 
        swiperSlide,
        scroll,
        comment,
        success,
        Return,
        Express
    },
    computed:{
        watingPayList(){
            let _arr = JSON.parse(JSON.stringify(this.orderList));
            return _arr.filter(v => {
               return  v.state === '1';
            });
        },
        watingShipment(){
            let _arr = JSON.parse(JSON.stringify(this.orderList));
            return _arr.filter(v => {
                return v.state === '2'
            });
        },
        watingExpress(){
            let _arr = JSON.parse(JSON.stringify(this.orderList));
            return _arr.filter(v => {
                return v.state === '3'
            });
        },
        watingComment(){
            let _arr = JSON.parse(JSON.stringify(this.orderList));
            return _arr.filter(v => {
                return v.state === '4'
            });
        }
    },
    data(){
        return {
            orderList:[],
            currentIndex:0,
            swiperOption:{
                paginationClickable: true,
                onSlideChangeEnd: s => {
                    this.currentIndex = s.activeIndex;
                    this._scrollRefresh();
                }
            },
            notNextTick:true,
            currentOrder:[],
            navList:['全部','待付款','待发货','待收货','待评价'],
            orderIds:'',
            currentGoods:{},
            currentOrders:{},
            currentOrderId:'',
            commenting:false,
            success: false,
            returning: false,
            isExchange:false,
            expressShow:false,
            currentExpressInfo:{},
            currentExpressOrderId: 0
        }
    }
};
</script>

<style lang="stylus" scoped>
.Return-enter-active,.Return-leave-actice
    transition all .5s
.Return-enter,.Return-leave-to
    transform translate3d(100%,0,0)



.order-wrap
    width 100%
    height 100vh
    position fixed
    background #e7e7e7
    z-index 1000
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
    .contents
        height 100%
        overflow scroll
        padding-bottom 2.4rem
        -webkit-overflow-scrolling: touch;
        .swiper
            height 100%
            overflow hidden
            .scroll
                height 100%
                overflow scroll
                .order-item
                    background #ffffff
                    margin-bottom .1rem
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
                            .m
                                display flex
                                justify-content space-between
                                .btn
                                    padding .1rem
                                    background #fc7ba6
                                    color #fff
                                    border-radius 0.1333rem
                            .b
                                display flex
                                justify-content space-between
                            .c  
                                display flex
                                justify-content flex-end
                                .btn
                                    padding .1rem
                                    background #fc7ba6
                                    color #fff
                                    border-radius 0.1333rem
                                    margin-left 0.4rem
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

.content-wrap
    margin-bottom 0.0667rem
    &:last-child
        margin-bottom 0


.empty
    width 100%
    height 8rem
    background #e7e7e7
    position relative
    .empty-content
        position absolute
        width 3.8rem
        left 50%
        top 50%
        text-align center
        transform translate(-50%,-50%)
        img
            width 100%
            height 2.5rem
        .desc
            color #989898
            font-size .35rem
            margin .2rem 0
        .btn
            width 75%
            font-size .35rem
            text-align center
            display inline-block
            padding .15rem 0
            background #fc7aa5
            color #fff
            border-radius 0.625rem

</style>
