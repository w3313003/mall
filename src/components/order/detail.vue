<template>
    <div class='confirm-wrap'>
        <div class='title'>
            订单详情
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class='confirm-content'>
            <div class='address'>
                <div class='l'>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-icon-yxj-address"></use>
                    </svg>
                </div>
                <div class="m">
                    <div>
                        <span>收货人:{{orderMsg.consignee}}</span>
                        <span>{{orderMsg.phoneNum}}</span>    
                    </div>
                    <div>
                        收货地址:{{orderMsg.address}}
                    </div>
                </div>
            </div>
            <div class='detail'>
                <div class='header'>
                    <div class='sellername'>
                        <div>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-shangjia"></use>
                            </svg>
                            <span>
                                {{orderMsg.shopName}}
                            </span>   
                            </div>
                        <div class='type'>
                            {{orderMsg.stateName}}
                        </div> 
                    </div>
                    <div v-for='(item,index) in orderMsg.orderGoods' :key="index" class="gooditem">
                        <div class='goodinfo'>
                            <img :src="item.goodsImg" alt="" />
                            <div class='text'>
                                <div class='g-title'>
                                    {{item.goodsName}}
                                </div>
                                <div class='g-type'>
                                    <div>
                                        123
                                    </div>
                                    <div v-if='orderMsg.state == 4' class="btn" @click.stop="goToComment(item,items)"> 
                                        去评价
                                    </div>
                                </div>
                                <div class='g-price'>
                                    <div>￥{{item.goodsPrice}}</div>
                                    <div>X {{item.goodsNum}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="price">
                    <div class='l'>
                        <div class='f'>运费(快递)</div>
                        <div>订单总价</div>
                    </div>
                    <div class="r">
                        <div class='f'>￥{{orderMsg.freight}}</div>
                        <div>￥{{orderMsg.payPrice - orderMsg.freight}}</div>
                    </div>
                </div>
                <div class="item">
                    <div>
                        优惠券
                    </div>
                    <div style="color:#fc7aa5" v-if="orderMsg.redpacketId">
                        -{{orderMsg.redpacketMoney}}元
                    </div>  
                    <div v-else>
                        未使用优惠券
                    </div>
                </div>
                <div class="item">
                    <div>
                        实付款
                    </div>
                    <div class='price'>
                        ￥{{orderMsg.payPrice}}
                    </div>
                </div>
                <div class="item">
                    <div>
                        买家留言
                    </div>
                    <div class='input-wrap'>
                        <span v-if="orderMsg.memberMessage != ''">{{orderMsg.memberMessage}}</span>
                        <span v-else>无留言</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class='bottom'>
            <div class='control'>
                <div class='cancel' v-if="orderMsg.state == 1">
                    取消订单
                </div>
                <div class='pay'  v-if="orderMsg.state == 1" @click.stop="pay">
                    付款
                </div>
                <div class='express'  v-if="orderMsg.state == 3">
                    查看物流
                </div>
                <div class='tips' v-if='orderMsg.state == 2'>
                    提醒
                </div>
                <div class='tips' v-if="orderMsg.payState == 2"  @click='gotorefund = true'>
                    退款
                </div>
            </div>
        </div> -->
        <returngoods v-if='gotorefund'></returngoods>
        <comment 
        v-if='goTocomment' 
        @close='goTocomment = false'>
        </comment>
        <success v-if='success'
            :consignee='orderMsg.consignee'
            :address='orderMsg.address'
            :totalMoney='orderMsg.payPrice'>
        </success>
    </div>
</template>

<script>
import comment from './comment';
import returngoods from './return';
import wx from 'weixin-js-sdk';
import { APPID } from 'common/util';
import success from 'common/success'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));


export default {
    activated() { 
        this.success = false;
        const id = this.$route.params.id;
        let params = new URLSearchParams();
            params.append('orderId',id);
            this.axios.post('/api/order/getOrder',params).then(res => {
                this.orderMsg = res.data;
            })
    },
    methods:{
        back(){
            this.$router.back();
        },
        goToComment() {

        },
        pay() {
            let data = new URLSearchParams();
                data.append("userId", userInfo.userid);
                data.append("orderIds", this.$route.params.id);
                data.append("money", this.orderMsg.payPrice);
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
                        this.axios.post("/api/order/paySuccess".param).then(res => {
                            this.success = true;
                        });
                      },
                      cancel: () => {
                        
                      }
                    });
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
        }
    },
    data(){
        return {
            goTocomment: false,
            gotorefund: false,
            orderMsg: {},
            success: false
        }
    },
    components:{
        comment,
        returngoods,
        success
    }
}
</script>

<style lang="stylus" scoped>
.g-type
    display flex
    justify-content space-between
    .btn
        padding .1rem
        background #fc7ba6
        color #fff
        border-radius 0.1333rem


.confirm-wrap
    width 100%
    height 100vh
    position fixed
    z-index 999
    background-color #e7e7e7
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
    .confirm-content
        flex 1
        overflow scroll
        .address
            margin-top 0.1333rem
            background #fff
            display flex
            box-sizing border-box
            padding 0.3333rem
            align-items center
            font-size 0.4rem
            color #666
            .m
                flex 1
                box-sizing border-box
                padding 0 .2rem 
                div:first-child
                    display flex
                    justify-content space-between
                    margin-bottom 0.1333rem
            .l,.r
                .icon
                    font-size 0.5rem
        .detail
            margin-top 0.1333rem
            background #Fff
            .header
                .sellername
                    box-sizing border-box
                    padding 0.2667rem
                    font-size 0.4rem
                    display flex
                    justify-content space-between
                    height 1.2rem
                    align-items center
                    div:first-child
                        .icon 
                            font-size .45rem
                    .type
                        font-size 0.3333rem
                        color #fc7ba6
                .goodinfo
                    background #f5f5f5
                    box-sizing border-box
                    display flex
                    padding .1rem 0.3333rem
                    img 
                        width 1.92rem
                        height 1.92rem
                        display block
                    .text
                        flex 1
                        padding-left 0.2rem
                        font-size 0.3333rem
                        display flex 
                        flex-direction column
                        justify-content space-between
                        .g-price    
                            display flex
                            justify-content space-between   

            .price
                display flex
                box-sizing border-box
                justify-content space-between
                height 1.3333rem
                align-items center
                padding 0 .2667rem  
                border-bottom 0.0133rem solid #e7e7e7
                div
                    font-size .333rem  
                    .f
                        color #666  
                        text-align right
                        &:last-child
                            text-align right
                .l,.r
                    height 100%
                    display flex
                    flex-direction column
                    justify-content space-around
            .item
                height 1.2rem
                border-bottom 0.0133rem solid #e7e7e7
                box-sizing border-box
                padding .2667rem
                font-size 0.4rem
                display flex
                justify-content space-between
                align-items center
                .icon
                    font-size .4rem
                    color #666
                .price
                    color #fc7ba5
                .input-wrap
                    flex 1
                    overflow hidden
                    text-align right 
                    text-overflow ellipsis
                    white-space nowrap
                    word-wrap none
    .bottom
        height 1.3333rem
        display flex
        background-color #fff
        font-size .4rem
        .control
            height 1.2rem
            box-sizing border-box
            padding .2rem
            display flex
            justify-content flex-end
            width 100%
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

.gooditem
    margin-bottom 0.1333rem
    &:last-child
        margin-bottom 0
        word-break none
</style>
