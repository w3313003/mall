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
                        <span>收货人:{{orderMsg.memberName}}</span>
                        <span>{{orderMsg.memberPhone}}</span>    
                    </div>
                    <div>
                        收货地址:{{orderMsg.memberAddress}}
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
                                {{orderMsg.title}}
                            </span>   
                            </div>
                        <div class='type'>
                            {{orderMsg.stateName}}
                        </div> 
                    </div>
                    <div v-for='(item,index) in orderMsg.orderGoods' :key="index" class="gooditem">
                        <div class='goodinfo'>
                            <img src="../.././assets/img/goodimg.png" alt="" />
                            <div class='text'>
                                <div class='g-title'>
                                    {{item.goodsName}}
                                </div>
                                <div class='g-type'>
                                    颜色颜色颜色颜色颜色
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
                        <div class='f'>￥0.00</div>
                        <div>￥66.66</div>
                    </div>
                </div>
                <div class="item">
                    <div>
                        优惠券
                    </div>
                    <div style="color:#fc7aa5">
                        -{{orderMsg.redpacketMoney}}元
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
                        {{orderMsg.memberMessage}}
                    </div>
                </div>
            </div>
        </div>
        <div class='bottom'>
            <div class='control'>
                <div class='cancel'>
                    取消订单
                </div>
                <div class='pay'>
                    付款
                </div>
                <div class='express'>
                    查看物流
                </div>
                <div class='comment' @click='goTocomment = true'>
                    评价
                </div>
                <div class='tips'>
                    提醒
                </div>
                <div class='tips' @click='gotorefund = true'>
                    退款
                </div>
            </div>
        </div>
        <returngoods v-if='gotorefund'></returngoods>
        <comment v-if='goTocomment' @close='close'></comment>
    </div>
</template>

<script>
import comment from './comment'
import returngoods from './return'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))


export default {
    created(){
        const id = this.$route.params.id;
        console.log(id);
        let params = new URLSearchParams();
            params.append('memberCode',userInfo.userid);
        this.axios.post('/api/order/getOrderList',params).then(res => {
            if(res.data.code !== 'success') throw new Error('error');
            this.orderMsg = res.data.obj.filter(v => {
                return v.id === id;
            })[0];
            this.$set(this.orderMsg,'title',this.orderMsg.orderGoods[0].shopName)
            console.log(this.orderMsg)
        });
    },
    methods:{
        back(){
            this.$router.back();
        },
        close(){
            this.goTocomment = false;
        }
    },
    data(){
        return {
            goTocomment:false,
            gotorefund:false,
            orderMsg:{}
        }
    },
    components:{
        comment,
        returngoods
    }
}
</script>

<style lang="stylus" scoped>
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
